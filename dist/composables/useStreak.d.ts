import { type Ref, type ComputedRef } from 'vue';
import type { StorageAdapter } from '../types';
export interface UseStreakReturn {
    currentStreak: Ref<number>;
    longestStreak: Ref<number>;
    lastVisitDate: Ref<string | null>;
    isActive: ComputedRef<boolean>;
    recordVisit: () => void;
}
export declare function useStreak(options: {
    storage: StorageAdapter;
    storageKey?: string;
    gracePeriodHours?: number;
}): UseStreakReturn;
