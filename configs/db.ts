import { drizzle } from 'drizzle-orm/neon-http';
if (!process.env.NEXT_PUBLIC_DATABSE_CONNECTION_STRING) {
  throw new Error('Database connection string is not defined');
}
export const db = drizzle(process.env.NEXT_PUBLIC_DATABSE_CONNECTION_STRING);
