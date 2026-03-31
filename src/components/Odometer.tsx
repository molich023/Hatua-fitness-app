'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { Ruler, Zap, Trophy } from 'lucide-react';

interface OdometerProps {
  user: any;
  lang: 'en' | 'sw';
}

export default function Odometer({ user, lang }: OdometerProps) {
  const [distance, setDistance] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleLogWalk = async () => {
    const distNum = parseFloat(distance);
    
    if (isNaN(distNum) || distNum <= 0) {
      toast.error(lang === 'sw' ? 'Weka nambari halali' : 'Enter a valid distance');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/odometer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ distance: distNum }),
      });

      if (res.ok) {
        const data = await res.json();
        setDistance(''); // Reset input

        // --- LION KING ACHIEVEMENT TRIGGER ---
        if (distNum >= 10) {
          toast.custom((t) => (
            <div className="bg-slate-900 text-white p-6 rounded-[32px] shadow-2xl border-2 border-yellow-500 flex flex-col items-center gap-4 animate-in zoom-in duration-300">
              <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center text-4xl shadow-[0_0_20px_rgba(241,196,15,0.5)]">
                🦁
              </div>
              <div className="text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-500">Achievement Unlocked</p>
                <p className="text-xl font-black italic uppercase">Lion King Status</p>
                <p className="text-xs text-slate-400 mt-1">
                  {lang === 'sw' 
                    ? `Umerekodi ${distNum}km na kupata pointi ${data.pointsEarned}!` 
                    : `You logged ${distNum}km and earned ${data.pointsEarned} points!`}
                </p>
              </div>
              <button 
                onClick={() => toast.dismiss(t)}
                className="bg-white text-slate-900 text-[10px] font-black px-8 py-3 rounded-full uppercase tracking-widest hover:bg-yellow-500 transition-colors"
              >
                {lang === 'sw' ? 'SAFI SANA! 🏃' : 'NICE WORK! 🏃'}
              </button>
            </div>
          ), { duration: 6000 });
        } else {
          toast.success(lang === 'sw' ? 'Hatua imerekodiwa!' : 'Walk recorded!');
        }
      }
    } catch (error) {
      toast.error("Error saving walk");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Ruler className="text-green-600 w-4 h-4" />
        <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest">
          {lang === 'sw' ? 'Rekodi Mazoezi' : 'Log Activity'}
        </h3>
      </div>

      <div className="relative">
        <input 
          type="number" 
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          placeholder="0.00"
          className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-6 text-4xl font-black text-slate-800 focus:border-green-500 focus:outline-none transition-all placeholder:text-slate-200"
        />
        <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-slate-300 text-xl">KM</span>
      </div>

      <button 
        onClick={handleLogWalk}
        disabled={loading}
        className="w-full bg-green-700 text-white font-black py-5 rounded-2xl shadow-lg shadow-green-100 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <Zap className="w-5 h-5 fill-white" />
            <span className="uppercase tracking-widest">
              {lang === 'sw' ? 'WASILISHA' : 'SUBMIT DISTANCE'}
            </span>
          </>
        )}
      </button>

      <p className="text-[10px] text-center font-bold text-slate-400 uppercase tracking-tighter">
        {lang === 'sw' ? 'Kumbuka: 10km = Pointi 10' : 'Note: 10km = 10 Points'}
      </p>
    </div>
  );
}
