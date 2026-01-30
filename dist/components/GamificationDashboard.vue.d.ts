import type { Badge, ProgressEntry } from '../types';
type __VLS_Props = {
    currentStreak: number;
    longestStreak: number;
    isStreakActive: boolean;
    earnedBadges: Badge[];
    unearnedBadges: Badge[];
    earnedIds: string[];
    allBadges: Badge[];
    badgeProgress: number;
    progressByCategory: Record<string, ProgressEntry>;
    overallProgress: ProgressEntry;
    class?: string;
};
declare var __VLS_1: {}, __VLS_3: {
    current: number;
    longest: number;
    isActive: boolean;
}, __VLS_5: {
    earned: Badge[];
    unearned: Badge[];
    earnedIds: string[];
    allBadges: Badge[];
    progress: number;
}, __VLS_7: {
    byCategory: Record<string, ProgressEntry>;
    overall: ProgressEntry;
}, __VLS_9: {};
type __VLS_Slots = {} & {
    header?: (props: typeof __VLS_1) => any;
} & {
    streak?: (props: typeof __VLS_3) => any;
} & {
    badges?: (props: typeof __VLS_5) => any;
} & {
    progress?: (props: typeof __VLS_7) => any;
} & {
    footer?: (props: typeof __VLS_9) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
