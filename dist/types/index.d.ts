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
export type ReactionType = 'upvote' | 'funny' | 'love' | 'surprised' | 'angry' | 'sad';
export type FeedbackDimension = 'difficulty' | 'engagement';
export type DifficultyOption = 'easy' | 'justRight' | 'hard';
export type EngagementOption = 'boring' | 'interesting' | 'fascinating';
export interface ModuleFeedbackCounts {
    difficulty: {
        easy: number;
        justRight: number;
        hard: number;
    };
    engagement: {
        boring: number;
        interesting: number;
        fascinating: number;
    };
}
export interface ModuleFeedbackSelections {
    difficulty: DifficultyOption | null;
    engagement: EngagementOption | null;
}
export interface FeedbackOptionConfig {
    key: DifficultyOption | EngagementOption;
    emoji: string;
    label: string;
}
export interface ReactionCounts {
    upvote: number;
    funny: number;
    love: number;
    surprised: number;
    angry: number;
    sad: number;
}
export interface ReactionConfig {
    type: ReactionType;
    emoji: string;
    label: string;
}
