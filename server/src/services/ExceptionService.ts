import { NextFunction, Request, Response } from 'express';

export function exceptionHandler(
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  if (res.headersSent) return next();
  console.error(error);
  res.status(500).send({
    error: error.message,
  });
}

export function notFoundHandler(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  if (res.headersSent) return next();
  res.status(404).send({
    error: 'Not Found',
  });
}
