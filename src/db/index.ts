import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

type Db = ReturnType<typeof drizzle<typeof schema>>;

let cached: Db | undefined;

function getDb(): Db {
  if (!cached) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not set');
    }
    const sql = neon(process.env.DATABASE_URL);
    cached = drizzle(sql, { schema });
  }
  return cached;
}

export const db: Db = new Proxy({} as Db, {
  get(_, prop) {
    const real = getDb() as unknown as Record<string | symbol, unknown>;
    const value = real[prop as string];
    return typeof value === 'function'
      ? (value as (...args: unknown[]) => unknown).bind(real)
      : value;
  },
});
