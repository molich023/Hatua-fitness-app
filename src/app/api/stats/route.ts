import { auth } from "@/auth";
import { db } from "@/db";
import { activities } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  
  // Security check: Only let logged-in users see their own stats
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // This query asks Neon to SUM the distance and COUNT the rows
    const stats = await db
      .select({
        totalDistance: sql<number>`COALESCE(sum(${activities.distanceKm}), 0)`,
        activityCount: sql<number>`count(${activities.id})`,
      })
      .from(activities)
      .where(eq(activities.userId, session.user.id));

    // Drizzle returns an array, so we take the first item [0]
    return NextResponse.json(stats[0]);
  } catch (error) {
    console.error("Stats API Error:", error);
    return NextResponse.json({ totalDistance: 0, activityCount: 0 });
  }
}
