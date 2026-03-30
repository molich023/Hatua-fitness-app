import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import { db } from '@/lib/neon-db';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  const session = await getSession();
  
  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { sub, email, name, picture } = session.user;

  try {
    // 1. Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.auth0Id, sub)).limit(1);

    if (existingUser.length === 0) {
      // 2. First Login: Create the user as a 'Cheetah'
      console.log(`New HATUA runner detected: ${email}. Onboarding...`);
      
      await db.insert(users).values({
        auth0Id: sub,
        email: email,
        displayName: name || email.split('@')[0],
        currentTier: 'Cheetah', // Welcome to the savanna!
        totalPoints: 0,
        totalDistanceKm: 0,
      });
    }

    // 3. Redirect to the dashboard
    return NextResponse.redirect(new URL('/dashboard', process.env.AUTH0_BASE_URL));
    
  } catch (error) {
    console.error("Onboarding Error:", error);
    return NextResponse.json({ error: "Failed to sync user" }, { status: 500 });
  }
}
