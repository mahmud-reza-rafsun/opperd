import { ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateRequest = (schema: ZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({ body: req.body, params: req.params, query: req.query });
            next();
        } catch (error) {
            next(error);
        }
    };
};
