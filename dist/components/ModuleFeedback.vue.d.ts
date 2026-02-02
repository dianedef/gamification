import type { DifficultyOption, EngagementOption, ModuleFeedbackCounts } from '../types';
type __VLS_Props = {
    moduleId: string;
    initialCounts?: Partial<ModuleFeedbackCounts>;
    storagePrefix?: string;
    class?: string;
};
declare function isDifficultySelected(key: DifficultyOption): boolean;
declare function isEngagementSelected(key: EngagementOption): boolean;
declare var __VLS_1: {
    counts: ModuleFeedbackCounts;
    userSelections: import("..").ModuleFeedbackSelections;
    hasVoted: boolean;
    totalResponses: number;
    selectDifficulty: (option: DifficultyOption) => void;
    selectEngagement: (option: EngagementOption) => void;
    clearDifficulty: () => void;
    clearEngagement: () => void;
    clearAll: () => void;
    difficultyOptions: import("../utils/feedback").DifficultyOptionConfig[];
    engagementOptions: import("../utils/feedback").EngagementOptionConfig[];
    isDifficultySelected: typeof isDifficultySelected;
    isEngagementSelected: typeof isEngagementSelected;
}, __VLS_3: {
    total: number;
}, __VLS_5: {
    dimension: string;
}, __VLS_7: {
    option: import("../utils/feedback").DifficultyOptionConfig;
    count: number;
    isSelected: boolean;
    onClick: () => void;
}, __VLS_9: {
    dimension: string;
}, __VLS_11: {
    option: import("../utils/feedback").EngagementOptionConfig;
    count: number;
    isSelected: boolean;
    onClick: () => void;
};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
} & {
    header?: (props: typeof __VLS_3) => any;
} & {
    'dimension-label'?: (props: typeof __VLS_5) => any;
} & {
    'difficulty-option'?: (props: typeof __VLS_7) => any;
} & {
    'dimension-label'?: (props: typeof __VLS_9) => any;
} & {
    'engagement-option'?: (props: typeof __VLS_11) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
