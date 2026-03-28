export const POINT_TO_KSH_RATE = 0.10; // 1 point = 10 cents

export function convertPointsToKsh(points: number): number {
  return points * POINT_TO_KSH_RATE;
}

// Logic for M-Pesa B2C (Business to Customer) Payment
export async function triggerMpesaPayout(userId: string, points: number, phone: number) {
  const amount = convertPointsToKsh(points);
  
  // Security check: Minimum redemption of KSH 50 (500 points)
  if (amount < 50) {
    throw new Error("Kiwango cha chini cha kukomboa ni KSH 50 (Min redemption is KSH 50)");
  }

  // Here you would integrate with Safaricom Daraja API
  // const response = await daraja.b2cPayment({ PhoneNumber: phone, Amount: amount ... });
  return { success: true, transactionId: "OCK" + Math.random().toString(36).toUpperCase().slice(2, 10) };
}
