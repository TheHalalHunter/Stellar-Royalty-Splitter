// Minimal Express app for testing — no DB init, no listen
import express from "express";
import { initializeRouter } from "../src/routes/initialize.js";
import { distributeRouter } from "../src/routes/distribute.js";
import { collaboratorsRouter } from "../src/routes/collaborators.js";
import { simulateRouter } from "../src/routes/simulate.js";
import { metricsRouter } from "../src/routes/metrics.js";
import { schedulesRouter, batchRouter } from "../src/routes/schedules.js";
import { identityRouter } from "../src/routes/identity.js";
import { backupRouter } from "../src/routes/backup.js";

const app = express();
app.use(express.json({ limit: "10kb" }));

app.use("/api/v1/initialize", initializeRouter);
app.use("/api/v1/distribute", distributeRouter);
app.use("/api/v1/collaborators", collaboratorsRouter);
app.use("/api/v1/simulate", simulateRouter);
app.use("/api/v1/schedules", schedulesRouter);
app.use("/api/v1/batch", batchRouter);
app.use("/api/v1/identity", identityRouter);
app.use("/api/v1/backup", backupRouter);
app.use("/metrics", metricsRouter);

app.use((err, _req, res, _next) => {
  if (err.type === "entity.too.large") {
    return res.status(413).json({ error: "Payload too large" });
  }
  res.status(500).json({ error: err.message ?? "Internal server error" });
});

export default app;
