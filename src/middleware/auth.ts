import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

import { env } from '../config/env.js';
import { resolveOdooSession, setOdooSession } from '../services/odoo-session.store.js';
import { AuthRequest } from '../types/auth.js';

type JwtPayload = {
  sub: string;
  email: string;
  name: string;
  odooCookie?: string;
  odooUid?: number;
};

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const header = req.headers.authorization;

  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required.' });
  }

  const token = header.slice(7);

  try {
    const payload = jwt.verify(token, env.jwtSecret) as JwtPayload;
    const odooSession = resolveOdooSession(payload);

    if (!odooSession) {
      return res.status(401).json({ message: 'Session expired. Please log in again.' });
    }

    setOdooSession(payload.sub, odooSession);

    req.user = {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
    };
    req.odooSession = odooSession;

    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
}
