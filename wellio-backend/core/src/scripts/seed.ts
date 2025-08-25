#!/usr/bin/env ts-node
import "dotenv/config";
import { getRepo } from "../data/repo";
import { buildMemorySeed } from "../seed/memorySeed";

async function main() {
  const mode = (process.env.CORE_DATA_MODE || "memory").toLowerCase();
  console.log(`[seed] mode=${mode}`);

  const repo = await getRepo();
  await repo.clearAll();

  const data = buildMemorySeed();
  await repo.seed({
    coaches: [data.coach],
    clients: data.clients,
    sessions: data.sessions,
    conversations: data.conversations,
    messages: data.messages,
    insights: data.insights
  });

  console.log("[seed] done");
}

main().catch((err) => {
  console.error("[seed] error", err);
  process.exit(1);
});
