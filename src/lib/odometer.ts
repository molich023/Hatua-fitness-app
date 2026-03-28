/**
 * HATUA Odometer Engine
 * Logic: 10km = 10 Points (1km = 1 Point)
 */

export const CONVERSION_RATE = 1; // 1 Point per 1 Kilometre

export function calculatePoints(distanceInMeters: number): number {
  const distanceInKm = distanceInMeters / 1000;
  return Math.floor(distanceInKm * CONVERSION_RATE);
}

// Haversine Formula for Precise Outdoor Distance
export function getDistanceBetweenCoords(
  lat1: number, lon1: number, 
  lat2: number, lon2: number
): number {
  const R = 6371e3; // Earth radius in metres
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in metres
}

// Registration Welcome Bonus Logic
export const NEW_USER_BONUS = 20; // 20 Points for new signups
