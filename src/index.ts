import express from "express";
import { middlewareLogResponses, middlewareMetricsInc } from "./api/middleware.js"
import { handlerReadiness } from "./api/readiness.js";
import { handlerMetrics, handlerReset } from "./api/metrics.js"

const app = express();
const PORT = 8080;

app.use("/app", middlewareMetricsInc, middlewareLogResponses, express.static("./src/app"));

app.get("/api/healthz", handlerReadiness);

app.get("/admin/metrics", handlerMetrics);

app.post("/admin/reset", handlerReset);

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});


