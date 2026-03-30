import { db } from './neon-db';
import { users } from './schema';
import { desc, eq, and } from 'drizzle-orm';

/**
 * Fetches the Top 10 "Simba" runners based on total points.
 */
export async function getSimbaLeaderboard() {
  try {
    const leaderboard = await db
      .select({
        id: users.id,
        name: users.displayName,
        points: users.totalPoints,
        distance: users.totalDistanceKm,
        tier: users.currentTier,
      })
      .from(users)
      .where(eq(users.currentTier, 'Simba')) // Only Simbas
      .orderBy(desc(users.totalPoints))      // Most points first
      .limit(10);                           // Top 10 only

    return leaderboard;
  } catch (error) {
    console.error("Leaderboard Fetch Error:", error);
    return [];
  }
}
