export type OdooSession = {
  cookie: string;
  uid: number;
  login: string;
  createdAt: number;
};

const sessions = new Map<string, OdooSession>();

export function setOdooSession(userId: string, session: OdooSession) {
  sessions.set(userId, session);
}

export function getOdooSession(userId: string) {
  return sessions.get(userId);
}

export function deleteOdooSession(userId: string) {
  sessions.delete(userId);
}

/** Resolve Odoo session from JWT claims (serverless) or in-memory store (local dev). */
export function resolveOdooSession(payload: {
  sub: string;
  email: string;
  odooCookie?: string;
  odooUid?: number;
}): OdooSession | null {
  if (payload.odooCookie && payload.odooUid) {
    return {
      cookie: payload.odooCookie,
      uid: payload.odooUid,
      login: payload.email,
      createdAt: Date.now(),
    };
  }

  return getOdooSession(payload.sub) ?? null;
}
