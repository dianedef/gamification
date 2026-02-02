import { type Ref, type ComputedRef } from 'vue';
import type { DifficultyOption, EngagementOption, ModuleFeedbackCounts, ModuleFeedbackSelections } from '../types';
export interface UseModuleFeedbackReturn {
    counts: Ref<ModuleFeedbackCounts>;
    userSelections: Ref<ModuleFeedbackSelections>;
    hasVoted: ComputedRef<boolean>;
    totalResponses: ComputedRef<number>;
    selectDifficulty: (option: DifficultyOption) => void;
    selectEngagement: (option: EngagementOption) => void;
    clearDifficulty: () => void;
    clearEngagement: () => void;
    clearAll: () => void;
}
export interface UseModuleFeedbackOptions {
    moduleId: string;
    storagePrefix?: string;
    initialCounts?: Partial<ModuleFeedbackCounts>;
}
export declare function useModuleFeedback(options: UseModuleFeedbackOptions): UseModuleFeedbackReturn;
