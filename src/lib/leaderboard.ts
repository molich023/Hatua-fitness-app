import { db } from "@/db";
import { users } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function getTopRunners() {
  const topUsers = await db
    .select({
      id: users.id,
      name: users.name,
      points: users.points,
      plan: users.plan,
    })
    .from(users)
    .orderBy(desc(users.points))
    .limit(10);

  return topUsers;
}

