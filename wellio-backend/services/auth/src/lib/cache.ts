import { createClient, RedisClientType } from "redis";

export interface Cache {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, opts?: { ttlSec?: number }): Promise<"OK">;
  del(key: string): Promise<number>;
  disconnect(): Promise<void>;
}

class MemoryCache implements Cache {
  private store = new Map<string, { v: string; exp?: number }>();

  async get(key: string) {
    const it = this.store.get(key);
    if (!it) return null;
    if (it.exp && Date.now() > it.exp) {
      this.store.delete(key);
      return null;
    }
    return it.v;
  }
  async set(key: string, value: string, opts?: { ttlSec?: number }): Promise<"OK"> {
    const exp = opts?.ttlSec ? Date.now() + opts.ttlSec * 1000 : undefined;
    this.store.set(key, { v: value, exp });
    return "OK";
  }
  async del(key: string) {
    const existed = this.store.delete(key);
    return existed ? 1 : 0;
  }
  async disconnect() { /* noop */ }
}

class RedisCache implements Cache {
  private client: any; // Use any to avoid complex Redis types

  private constructor(client: any) {
    this.client = client;
  }

  static async connect(url: string): Promise<RedisCache> {
    const client = createClient({ url });
    client.on("error", (err) => console.error("[redis] error:", err));
    await client.connect();
    console.log("[redis] connected", url);
    return new RedisCache(client);
  }

  async get(key: string) {
    return this.client.get(key);
  }

  async set(key: string, value: string, opts?: { ttlSec?: number }): Promise<"OK"> {
    if (opts?.ttlSec) {
      await this.client.set(key, value, { EX: opts.ttlSec });
    } else {
      await this.client.set(key, value);
    }
    return "OK";
  }

  async del(key: string) {
    return this.client.del(key);
  }

  async disconnect() {
    await this.client.quit();
  }
}

let cacheSingleton: Cache | null = null;

export async function getCache(): Promise<Cache> {
  if (!cacheSingleton) {
    if (process.env.REDIS_DISABLED === "true") {
      cacheSingleton = new MemoryCache();
    } else {
      const url = process.env.REDIS_URL || "redis://localhost:6379";
      cacheSingleton = await RedisCache.connect(url);
    }
  }
  return cacheSingleton;
}

export async function closeCache() {
  if (cacheSingleton) {
    await cacheSingleton.disconnect();
    cacheSingleton = null;
  }
}
