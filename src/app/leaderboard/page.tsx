import { getSimbaLeaderboard } from '@/lib/queries';

export default async function LeaderboardPage() {
  const topSimbas = await getSimbaLeaderboard();

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold text-savanna mb-4">🏆 Simba Leaderboard</h1>
      <div className="space-y-2">
        {topSimbas.map((user, index) => (
          <div 
            key={user.id} 
            className="flex justify-between p-3 rounded-lg bg-gray-50 border-l-4 border-solar"
          >
            <div className="flex items-center gap-3">
              <span className="font-bold text-gray-400">#{index + 1}</span>
              <span className="font-semibold text-earth">{user.name || 'Anonymous'}</span>
            </div>
            <div className="text-right">
              <div className="font-bold text-savanna">{user.points} pts</div>
              <div className="text-xs text-gray-500">{user.distance.toFixed(1)} km</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
