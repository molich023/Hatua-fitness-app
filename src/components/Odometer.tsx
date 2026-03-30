
'use client';

import { useState, useEffect, useRef } from 'react';
import { calculateDistance } from '@/lib/odometer'; // The math utility
import { syncUserProgress } from '@/lib/sync-logic'; // The DB sync function

export default function Odometer({ auth0Id }: { auth0Id: string }) {
  const [isTracking, setIsTracking] = useState(false);
  const [distance, setDistance] = useState(0);
  const [lastPos, setLastPos] = useState<GeolocationCoordinates | null>(null);
  const watchId = useRef<number | null>(null);

  // Start Tracking
  const startTracking = () => {
    setIsTracking(true);
    setDistance(0);
    
    if ("geolocation" in navigator) {
      watchId.current = navigator.geolocation.watchPosition(
        (position) => {
          if (lastPos) {
            const move = calculateDistance(
              lastPos.latitude, lastPos.longitude,
              position.coords.latitude, position.coords.longitude
            );
            // Ignore tiny GPS jitters (less than 5 meters)
            if (move > 0.005) {
              setDistance(prev => prev + move);
            }
          }
          setLastPos(position.coords);
        },
        (err) => console.error("GPS Error:", err),
        { enableHighAccuracy: true, distanceFilter: 5 }
      );
    }
  };

  // Stop Tracking & Sync to Neon
  const stopTracking = async () => {
    setIsTracking(false);
    if (watchId.current) navigator.geolocation.clearWatch(watchId.current);
    
    if (distance > 0) {
      console.log(`Syncing ${distance.toFixed(2)}km to HATUA database...`);
      await syncUserProgress(auth0Id, distance);
      alert(`Walk Finished! You earned ${Math.floor(distance * 1)} points.`);
    }
    setDistance(0);
    setLastPos(null);
  };

  return (
    <div className="p-6 bg-savanna text-white rounded-3xl shadow-xl text-center">
      <h2 className="text-xl font-bold mb-2">HATUA ODOMETER</h2>
      <div className="text-5xl font-mono mb-4 text-solar">
        {distance.toFixed(2)} <span className="text-sm">KM</span>
      </div>
      
      {!isTracking ? (
        <button 
          onClick={startTracking}
          className="bg-solar text-earth px-8 py-3 rounded-full font-bold hover:scale-105 transition"
        >
          START WALK
        </button>
      ) : (
        <button 
          onClick={stopTracking}
          className="bg-red-500 text-white px-8 py-3 rounded-full font-bold hover:pulse"
        >
          STOP & SYNC
        </button>
      )}
    </div>
  );
}
