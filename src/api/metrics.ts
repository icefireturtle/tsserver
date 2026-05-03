import express from "express";
import { Request, Response, NextFunction } from "express";
import { config } from "../config.js";

export function handlerMetrics (req: Request, res: Response, next: NextFunction) {
	res.send(`Hits: ${config.fileserverHits}`);
	next();
}

export function handlerReset (req: Request, res: Response, next: NextFunction) {
	config.fileserverHits = 0;
	res.status(200).send();
	next();
} 
