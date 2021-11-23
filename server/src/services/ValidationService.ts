import { Request } from 'express';
import { ObjectSchema, ArraySchema, ValidationOptions } from 'joi';

const options: ValidationOptions = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
};

function validate(
  name: string,
  params: any,
  schema: ObjectSchema | ArraySchema,
): any {
  const { error, value } = schema.validate(params, options);
  if (error) {
    throw new Error(
      `Validation error in ${name}: ${error.details
        .map((x) => x.message)
        .join(', ')}`,
    );
  }
  return value;
}

export function validateRequest(
  req: Request,
  schema: {
    params?: ObjectSchema;
    query?: ObjectSchema;
    body?: ObjectSchema | ArraySchema;
  },
) {
  if (schema.params) validate('params', req.params, schema.params);
  if (schema.query) validate('query', req.query, schema.query);
  if (schema.body) validate('body', req.body, schema.body);
}

export function getEnumValues(T: any): any[] {
  return Object.keys(T).map((key) => T[key as keyof typeof T]);
}
