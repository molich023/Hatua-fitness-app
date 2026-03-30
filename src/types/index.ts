export type UserTier = 'Basic' | 'Pro' | 'Platinum';

export interface HatuaUser {
  id: string;
  name: string;
  points: number;
  tier: UserTier;
  avatarUrl: string;
}

export interface ActivityLog {
  id: string;
  date: string;
  distance: number;
  points: number;
}
