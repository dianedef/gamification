import type { ReactionType, ReactionCounts } from '../types';
type __VLS_Props = {
    itemId: string;
    initialCounts?: Partial<ReactionCounts>;
    storagePrefix?: string;
    class?: string;
};
declare function isSelected(type: ReactionType): boolean;
declare var __VLS_1: {
    counts: ReactionCounts;
    userReaction: ReactionType | null;
    hasVoted: boolean;
    totalResponses: number;
    react: (type: ReactionType) => void;
    clearReaction: () => void;
    reactions: import("..").ReactionConfig[];
    isSelected: typeof isSelected;
}, __VLS_3: {
    total: number;
}, __VLS_5: {
    type: ReactionType;
    emoji: string;
    label: string;
    count: number;
    isSelected: boolean;
    onClick: () => void;
};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
} & {
    header?: (props: typeof __VLS_3) => any;
} & {
    reaction?: (props: typeof __VLS_5) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
