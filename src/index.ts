import express from "express";
import { middlewareLogResponses, middlewareMetricsInc } from "./api/middleware.js"
import { handlerReadiness } from "./api/readiness.js";
import { handlerMetrics, handlerReset } from "./api/metrics.js"

const app = express();
const PORT = 8080;

app.use("/app", middlewareMetricsInc, middlewareLogResponses, express.static("./src/app"));

app.get("/healthz", handlerReadiness);

app.get("/metrics", handlerMetrics);

app.get("/reset", handlerReset);

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});


