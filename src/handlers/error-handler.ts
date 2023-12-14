import { Elysia } from 'elysia';

interface ErrorMapping {
 [key: string]: { status: number; message: string };
}

const errorMapping: ErrorMapping = {
 'AUTHENTICATION_ERROR': { status: 401, message: 'Authentication error' },
 'AUTHORIZATION_ERROR': { status: 403, message: 'Authorization error' },
 'INVARIANT_ERROR': { status: 400, message: 'Invariant error' },
 'NOT_FOUND': { status: 404, message: 'Not found' },
 'INTERNAL_SERVER_ERROR': { status: 500, message: 'Something went wrong!' },
};

export const errorHandler = (app: Elysia) => {
 app.onError(({ code, error, set }) => {
   const { status, message } = errorMapping[code] || { status: 500, message: 'Unknown error' };
   set.status = status;
   return { status: 'error', message };
 });
};

export class AuthenticationError extends Error {
 constructor(public message: string) {
   super(message);
 }
}

export class AuthorizationError extends Error {
 constructor(public message: string) {
   super(message);
 }
}

export class InvariantError extends Error {
 constructor(public message: string) {
   super(message);
 }
}

export class ValidationError extends Error {
  constructor(public message: string) {
    super(message);
  }
 }
 