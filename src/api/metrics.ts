import express from "express";
import { Request, Response, NextFunction } from "express";
import { config } from "../config.js";

export function handlerMetrics (req: Request, res: Response, next: NextFunction) {
	const metricsHTML = `<html><body><h1>Welcome, Chirpy Admin</h1><p>Chirpy has been visited ${config.fileserverHits} times!</p></body></html>`
	res.set({
                'Content-Type': 'text/html; charset=utf-8'});
	res.send(metricsHTML);
	next();
}

export function handlerReset (req: Request, res: Response, next: NextFunction) {
	config.fileserverHits = 0;
	res.status(200).send();
	next();
} 
