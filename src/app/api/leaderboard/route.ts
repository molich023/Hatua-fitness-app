import { db } from "@/db";
import { users } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // This query grabs the top 10 runners sorted by points
    const topRunners = await db
      .select({
        id: users.id,
        name: users.name,
        points: users.points,
        plan: users.plan,
      })
      .from(users)
      .orderBy(desc(users.points))
      .limit(10);

    return NextResponse.json(topRunners);
  } catch (error) {
    console.error("Leaderboard API Error:", error);
    return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 });
  }
}
