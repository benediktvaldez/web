import { randomBytes } from 'crypto';

const CONFIRM_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export function newToken(): string {
  return randomBytes(24).toString('base64url');
}

export function isConfirmTokenExpired(createdAt: Date | null): boolean {
  if (!createdAt) return true;
  return Date.now() - createdAt.getTime() > CONFIRM_TTL_MS;
}
