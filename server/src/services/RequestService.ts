import { ObjectSchema, ArraySchema } from 'joi';
import { NextFunction } from 'express';
import { validateRequest } from './ValidationService.js';

export function handleRequest(
  route: (req: any, res: any, next: NextFunction) => any,
  schema?: {
      params?: ObjectSchema;
      query?: ObjectSchema;
      body?: ObjectSchema | ArraySchema;
    },
) {
  return async (req: any, res: any, next: NextFunction) => {
    try {
      if (schema) validateRequest(req, schema);
      await route(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}
