import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { phone, amount } = await request.json();
  
  // This is where you call the Safaricom Daraja API
  // You will need your MPESA_CONSUMER_KEY and SECRET from your Netlify Env Vars
  
  console.log(`Triggering KSH ${amount} push to ${phone}`);
  
  return NextResponse.json({ message: "STK Push Sent!" }, { status: 200 });
}
