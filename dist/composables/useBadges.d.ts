import { type Ref, type ComputedRef } from 'vue';
import type { Badge, GamificationState, StorageAdapter } from '../types';
export interface UseBadgesReturn {
    earned: Ref<Badge[]>;
    unearned: Ref<Badge[]>;
    newlyEarned: Ref<Badge[]>;
    progress: ComputedRef<number>;
    checkAll: (state: GamificationState) => void;
}
export declare function useBadges(options: {
    badges: Badge[];
    storage: StorageAdapter;
    storageKey?: string;
}): UseBadgesReturn;
