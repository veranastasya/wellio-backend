FROM node:18-alpine

WORKDIR /app

# Create a simple placeholder service
RUN echo 'const express = require("express"); const app = express(); app.get("/health", (req, res) => res.json({ok: true, service: "Worker Service", timestamp: new Date().toISOString()})); app.listen(7000, () => console.log("Worker Service running on port 7000"));' > index.js

EXPOSE 7000

CMD ["node", "index.js"]
