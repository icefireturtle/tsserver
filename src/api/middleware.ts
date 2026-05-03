import express from "express";
import { Request, Response, NextFunction } from "express";
import { config } from "../config.js"

export function middlewareLogResponses (req: Request, res: Response, next: NextFunction): void {
	res.on("finish", ()=> {
		const url: string = req.url;
		const http_method: string = req.method;
		const status_code: number = res.statusCode;
		if (status_code && status_code > 299) {
			console.log(`[NON-OK] ${http_method} ${url} - Status: ${status_code}`);
		}
	});
	next();
}

export function middlewareMetricsInc (req: Request, res: Response, next: NextFunction) {
	config.fileserverHits++;
	next();
}
