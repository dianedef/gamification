import { type ComputedRef } from 'vue';
import type { ProgressEntry } from '../types';
export interface UseProgressReturn {
    byCategory: ComputedRef<Record<string, ProgressEntry>>;
    overall: ComputedRef<ProgressEntry>;
}
export declare function useProgress(options: {
    categories: Record<string, string[]>;
    getArticlesRead: () => string[];
}): UseProgressReturn;
