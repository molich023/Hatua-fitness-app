import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// This pulls the DATABASE_URL you set in your Netlify Environment Variables
const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql, { schema });
