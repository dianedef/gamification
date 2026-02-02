import type { DifficultyOption, EngagementOption, FeedbackOptionConfig } from '../types';
export interface DifficultyOptionConfig extends FeedbackOptionConfig {
    key: DifficultyOption;
}
export interface EngagementOptionConfig extends FeedbackOptionConfig {
    key: EngagementOption;
}
export declare const DIFFICULTY_OPTIONS: DifficultyOptionConfig[];
export declare const ENGAGEMENT_OPTIONS: EngagementOptionConfig[];
