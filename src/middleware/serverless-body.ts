import express, { NextFunction, Request, Response } from 'express';

type ServerlessRequest = Request & {
  apiGateway?: {
    event?: {
      body?: string | null;
      isBase64Encoded?: boolean;
      headers?: Record<string, string | undefined>;
    };
  };
};

function readEventBody(event: NonNullable<ServerlessRequest['apiGateway']>['event']) {
  if (!event?.body) {
    return null;
  }

  if (event.isBase64Encoded && typeof event.body === 'string') {
    return Buffer.from(event.body, 'base64').toString('utf8');
  }

  return typeof event.body === 'string' ? event.body : null;
}

/** Parse JSON from the raw Netlify/Lambda event when Express body parsing fails. */
export function serverlessJsonBody(
  req: ServerlessRequest,
  _res: Response,
  next: NextFunction,
) {
  if (req.body && typeof req.body === 'object' && Object.keys(req.body).length > 0) {
    return next();
  }

  const raw = readEventBody(req.apiGateway?.event);
  if (!raw?.trim()) {
    return next();
  }

  try {
    req.body = JSON.parse(raw);
  } catch {
    // Fall through to express.json().
  }

  next();
}

/** JSON parser that also accepts POST bodies without a JSON content-type (Netlify quirk). */
export function jsonBodyParser(req: Request, res: Response, next: NextFunction) {
  if (req.body && typeof req.body === 'object' && Object.keys(req.body).length > 0) {
    return next();
  }

  express.json({
    type: ['application/json', 'application/*+json', 'text/json', '*/*'],
  })(req, res, next);
}
