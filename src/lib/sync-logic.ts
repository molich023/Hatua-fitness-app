import { db } from './neon-db';
import { users } from './schema';
import { eq, sql } from 'drizzle-orm';

/**
 * Updates user points and distance in the database.
 * Rule: 10km = 10 points
 */
export async function syncUserProgress(auth0Id: string, kmWalked: number) {
  const pointsToUpdate = Math.floor(kmWalked * 1); // If 10km = 10 points, then 1km = 1 point.
  
  try {
    const updatedUser = await db.update(users)
      .set({
        totalDistanceKm: sql`${users.totalDistanceKm} + ${kmWalked}`,
        totalPoints: sql`${users.totalPoints} + ${pointsToUpdate}`,
      })
      .where(eq(users.auth0Id, auth0Id))
      .returning();

    return { success: true, data: updatedUser[0] };
  } catch (error) {
    console.error("Sync Error:", error);
    return { success: false, error };
  }
}
