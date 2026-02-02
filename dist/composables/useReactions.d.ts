import { type Ref, type ComputedRef } from 'vue';
import type { ReactionType, ReactionCounts } from '../types';
export interface UseReactionsReturn {
    counts: Ref<ReactionCounts>;
    userReaction: Ref<ReactionType | null>;
    hasVoted: ComputedRef<boolean>;
    totalResponses: ComputedRef<number>;
    react: (type: ReactionType) => void;
    clearReaction: () => void;
}
export interface UseReactionsOptions {
    itemId: string;
    storagePrefix?: string;
    initialCounts?: Partial<ReactionCounts>;
}
export declare function useReactions(options: UseReactionsOptions): UseReactionsReturn;
