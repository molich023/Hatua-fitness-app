import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const payload = await req.json();

  // Check if the event is an 'open'
  if (payload.type === "email.opened") {
    const userEmail = payload.data.to[0];

    // Update the user record in Neon DB to show they are "Engaged"
    await db.update(users)
      .set({ emailOpened: true }) // You'll need to add this column to your schema
      .where(eq(users.email, userEmail));
  }

  return new Response("Webhook Received", { status: 200 });
}
