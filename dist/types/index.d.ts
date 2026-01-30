export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    condition: BadgeCondition;
    category?: string;
    secret?: boolean;
}
export type BadgeCondition = (state: GamificationState) => boolean;
export interface GamificationState {
    articlesRead: string[];
    readByCategory: Record<string, string[]>;
    currentStreak: number;
    longestStreak: number;
    totalRead: number;
}
export interface StreakData {
    current: number;
    longest: number;
    lastVisitDate: string | null;
}
export interface ProgressEntry {
    read: number;
    total: number;
    percent: number;
}
export interface StorageAdapter {
    get<T>(key: string): T | null;
    set<T>(key: string, value: T): void;
    remove(key: string): void;
    clear(): void;
}
export interface ReadTrackerOptions {
    storage: StorageAdapter;
    storageKey?: string;
}
export interface StreakOptions {
    storage: StorageAdapter;
    storageKey?: string;
    gracePeriodHours?: number;
}
export interface BadgesOptions {
    badges: Badge[];
    storage: StorageAdapter;
    storageKey?: string;
}
export interface ProgressOptions {
    categories: Record<string, string[]>;
    articlesRead: string[];
}
export interface GamificationOptions {
    badges: Badge[];
    categories: Record<string, string[]>;
    storagePrefix?: string;
    gracePeriodHours?: number;
    onBadgeEarned?: (badge: Badge) => void;
}
