FROM node:18-alpine

WORKDIR /app

# Create a simple placeholder service
RUN echo 'const express = require("express"); const app = express(); app.get("/health", (req, res) => res.json({ok: true, service: "AI Service", timestamp: new Date().toISOString()})); app.listen(8001, () => console.log("AI Service running on port 8001"));' > index.js

EXPOSE 8001

CMD ["node", "index.js"]
