import { Trophy, Route, Zap } from "lucide-react";

interface StatsProps {
  totalPoints: number;
  totalDistance: number;
  activityCount: number;
}

export default function StatsGrid({ totalPoints, totalDistance, activityCount }: StatsProps) {
  const stats = [
    { 
      label: "Total Points", 
      value: totalPoints.toLocaleString(), 
      icon: Trophy, 
      color: "text-yellow-600", 
      bg: "bg-yellow-100" 
    },
    { 
      label: "Distance (KM)", 
      value: totalDistance.toFixed(1), 
      icon: Route, 
      color: "text-blue-600", 
      bg: "bg-blue-100" 
    },
    { 
      label: "Activities", 
      value: activityCount, 
      icon: Zap, 
      color: "text-orange-600", 
      bg: "bg-orange-100" 
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className={`${stat.bg} p-3 rounded-xl`}>
            <stat.icon className={`${stat.color} w-6 h-6`} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
