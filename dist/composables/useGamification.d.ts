import type { GamificationOptions } from '../types';
import { type UseReadTrackerReturn } from './useReadTracker';
import { type UseStreakReturn } from './useStreak';
import { type UseBadgesReturn } from './useBadges';
import { type UseProgressReturn } from './useProgress';
export interface UseGamificationReturn {
    reader: UseReadTrackerReturn;
    streak: UseStreakReturn;
    badges: UseBadgesReturn;
    progress: UseProgressReturn;
    markAsRead: (slug: string, category?: string) => void;
}
export declare function useGamification(options: GamificationOptions): UseGamificationReturn;
