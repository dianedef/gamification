import { type Ref, type ComputedRef } from 'vue';
import type { StorageAdapter } from '../types';
export interface UseReadTrackerReturn {
    articlesRead: Ref<string[]>;
    totalRead: ComputedRef<number>;
    readByCategory: ComputedRef<Record<string, string[]>>;
    markAsRead: (slug: string, category?: string) => void;
    isRead: (slug: string) => boolean;
}
export declare function useReadTracker(options: {
    storage: StorageAdapter;
    storageKey?: string;
}): UseReadTrackerReturn;
