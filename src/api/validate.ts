import express from "express";
import { Request, Response, NextFunction } from "express";

export async function validateHandler(req: Request, res: Response) {
	type validData = {
		valid: boolean;
	};

	type invalidData = {
		error: string;
	};
	
	let body = "";

	req.on("data", (chunk) => {
		body += chunk;
	});

	req.on("end", () => {
		try {
			const parsedBody = JSON.parse(body);

			if (parsedBody.body.length > 140) {
				
				const respBody: invalidData = {
					error: "Chirp is too long",
				};

				res.header("Content-Type", "application/json");

				const respInvalid = JSON.stringify(respBody);
				
				res.status(400).send(respInvalid);
			};

			const respBody: validData = {
				valid: true,
			};

			res.header("Content-Type", "application/json");

			const respValid = JSON.stringify(respBody);

			res.status(200).send(respValid);

		} catch (error) {

			res.header("Content-Type", "application/json");

			res.status(400).send("Something went wrong");
		}
	});
}
