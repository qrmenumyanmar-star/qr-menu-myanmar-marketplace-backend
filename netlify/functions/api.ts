import serverless from 'serverless-http';

import { createApp } from '../../src/app.js';

const app = createApp();
const serverlessHandler = serverless(app);

type NetlifyEvent = {
  body?: string | null;
  isBase64Encoded?: boolean;
  headers?: Record<string, string | undefined>;
  httpMethod?: string;
  path?: string;
  [key: string]: unknown;
};

function normalizeEvent(event: NetlifyEvent): NetlifyEvent {
  const headers = { ...(event.headers ?? {}) };

  let body = event.body;
  if (body && event.isBase64Encoded && typeof body === 'string') {
    body = Buffer.from(body, 'base64').toString('utf8');
  }

  if (
    body &&
    !headers['content-type'] &&
    !headers['Content-Type']
  ) {
    headers['content-type'] = 'application/json';
  }

  return {
    ...event,
    body,
    headers,
    isBase64Encoded: false,
  };
}

export async function handler(event: NetlifyEvent, context: unknown) {
  return serverlessHandler(normalizeEvent(event), context);
}
