import type { Badge } from '../types';
type __VLS_Props = {
    badge: Badge;
    earned: boolean;
    class?: string;
};
declare var __VLS_1: {
    badge: Badge;
    earned: boolean;
}, __VLS_3: {
    badge: Badge;
    earned: boolean;
}, __VLS_5: {
    badge: Badge;
};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
} & {
    icon?: (props: typeof __VLS_3) => any;
} & {
    locked?: (props: typeof __VLS_5) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (badge: Badge) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onClick?: ((badge: Badge) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
