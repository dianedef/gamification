import { ref as D, computed as B, watch as q, defineComponent as T, openBlock as C, createElementBlock as R, normalizeClass as j, renderSlot as h, createElementVNode as y, normalizeStyle as K, toDisplayString as k, createCommentVNode as P, Fragment as N, renderList as V, onUnmounted as Q, createBlock as X, Transition as Z, withCtx as _, unref as r, createTextVNode as W } from "vue";
function U(e) {
  const a = (n) => `${e}_${n}`;
  return {
    get(n) {
      if (typeof window > "u") return null;
      try {
        const s = localStorage.getItem(a(n));
        return s ? JSON.parse(s) : null;
      } catch {
        return null;
      }
    },
    set(n, s) {
      if (!(typeof window > "u"))
        try {
          localStorage.setItem(a(n), JSON.stringify(s));
        } catch {
        }
    },
    remove(n) {
      typeof window > "u" || localStorage.removeItem(a(n));
    },
    clear() {
      if (typeof window > "u") return;
      const n = [];
      for (let s = 0; s < localStorage.length; s++) {
        const l = localStorage.key(s);
        l != null && l.startsWith(e + "_") && n.push(l);
      }
      n.forEach((s) => localStorage.removeItem(s));
    }
  };
}
let F = null;
async function x() {
  if (F) return F;
  try {
    return F = (await import("./confetti.module-CZUVFyXe.js")).default, F;
  } catch {
    return null;
  }
}
async function Ne(e) {
  const a = await x();
  a && await a({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    ...e
  });
}
async function Ve(e) {
  const a = await x();
  if (!a) return;
  let n = { x: 0.5, y: 0.5 };
  if (e) {
    const s = e.getBoundingClientRect();
    n = {
      x: (s.left + s.width / 2) / window.innerWidth,
      y: (s.top + s.height / 2) / window.innerHeight
    };
  }
  await a({
    particleCount: 60,
    spread: 55,
    origin: n,
    colors: ["#FFD700", "#FF6347", "#32CD32", "#9370DB", "#FF69B4"]
  });
}
const L = [
  { type: "upvote", emoji: "👍", label: "Upvote" },
  { type: "funny", emoji: "😂", label: "Funny" },
  { type: "love", emoji: "❤️", label: "Love" },
  { type: "surprised", emoji: "😮", label: "Surprised" },
  { type: "angry", emoji: "😠", label: "Angry" },
  { type: "sad", emoji: "😢", label: "Sad" }
], z = [
  { key: "easy", emoji: "😌", label: "Easy" },
  { key: "justRight", emoji: "👌", label: "Just Right" },
  { key: "hard", emoji: "🤯", label: "Hard" }
], H = [
  { key: "boring", emoji: "😴", label: "Boring" },
  { key: "interesting", emoji: "🤔", label: "Interesting" },
  { key: "fascinating", emoji: "🤩", label: "Fascinating" }
];
function ee(e) {
  const { storage: a, storageKey: n = "reads" } = e, s = D(a.get(n) ?? []), l = B(() => s.value.map((o) => o.slug)), i = B(() => s.value.length), g = B(() => {
    const o = {};
    for (const t of s.value) {
      const b = t.category ?? "_uncategorized";
      o[b] || (o[b] = []), o[b].push(t.slug);
    }
    return o;
  });
  function d() {
    a.set(n, s.value);
  }
  function m(o, t) {
    s.value.some((b) => b.slug === o) || (s.value.push({
      slug: o,
      category: t,
      date: (/* @__PURE__ */ new Date()).toISOString()
    }), d());
  }
  function f(o) {
    return s.value.some((t) => t.slug === o);
  }
  return {
    articlesRead: l,
    totalRead: i,
    readByCategory: g,
    markAsRead: m,
    isRead: f
  };
}
function te(e) {
  return e.toISOString().split("T")[0];
}
function ae(e, a) {
  const n = /* @__PURE__ */ new Date(e + "T00:00:00"), s = /* @__PURE__ */ new Date(a + "T00:00:00");
  return Math.round(Math.abs(s.getTime() - n.getTime()) / (1e3 * 60 * 60 * 24));
}
function ne(e) {
  const { storage: a, storageKey: n = "streak", gracePeriodHours: s = 36 } = e, l = a.get(n), i = D((l == null ? void 0 : l.current) ?? 0), g = D((l == null ? void 0 : l.longest) ?? 0), d = D((l == null ? void 0 : l.lastVisitDate) ?? null), m = B(() => {
    if (!d.value) return !1;
    const t = /* @__PURE__ */ new Date(), b = /* @__PURE__ */ new Date(d.value + "T00:00:00");
    return (t.getTime() - b.getTime()) / (1e3 * 60 * 60) < s;
  });
  function f() {
    a.set(n, {
      current: i.value,
      longest: g.value,
      lastVisitDate: d.value
    });
  }
  function o() {
    const t = te(/* @__PURE__ */ new Date());
    if (d.value !== t) {
      if (!d.value)
        i.value = 1;
      else {
        const b = ae(d.value, t);
        if (b === 1)
          i.value++;
        else {
          const v = /* @__PURE__ */ new Date(d.value + "T00:00:00");
          ((/* @__PURE__ */ new Date()).getTime() - v.getTime()) / (1e3 * 60 * 60) <= s && b <= 2 ? i.value++ : i.value = 1;
        }
      }
      i.value > g.value && (g.value = i.value), d.value = t, f();
    }
  }
  return {
    currentStreak: i,
    longestStreak: g,
    lastVisitDate: d,
    isActive: m,
    recordVisit: o
  };
}
function se(e) {
  const { badges: a, storage: n, storageKey: s = "badges_earned" } = e, l = D(n.get(s) ?? []), i = D([]), g = B(
    () => a.filter((t) => l.value.includes(t.id))
  ), d = B(
    () => a.filter((t) => !l.value.includes(t.id) && !t.secret)
  ), m = B(() => {
    const t = a.filter((v) => !v.secret).length;
    if (t === 0) return 0;
    const b = g.value.filter((v) => !v.secret).length;
    return Math.round(b / t * 100);
  });
  function f() {
    n.set(s, l.value);
  }
  function o(t) {
    const b = [];
    for (const v of a)
      if (!l.value.includes(v.id))
        try {
          v.condition(t) && (l.value.push(v.id), b.push(v));
        } catch {
        }
    b.length > 0 && (i.value = b, f());
  }
  return {
    earned: g,
    unearned: d,
    newlyEarned: i,
    progress: m,
    checkAll: o
  };
}
function le(e) {
  const { categories: a, getArticlesRead: n } = e, s = B(() => {
    const i = n(), g = {};
    for (const [d, m] of Object.entries(a)) {
      const f = m.length, o = m.filter((t) => i.includes(t)).length;
      g[d] = {
        read: o,
        total: f,
        percent: f > 0 ? Math.round(o / f * 100) : 0
      };
    }
    return g;
  }), l = B(() => {
    const i = new Set(Object.values(a).flat()), g = n(), d = i.size, m = [...i].filter((f) => g.includes(f)).length;
    return {
      read: m,
      total: d,
      percent: d > 0 ? Math.round(m / d * 100) : 0
    };
  });
  return { byCategory: s, overall: l };
}
function Me(e) {
  const {
    badges: a,
    categories: n,
    storagePrefix: s = "gamification",
    gracePeriodHours: l = 36,
    onBadgeEarned: i
  } = e, g = U(s), d = ee({ storage: g, storageKey: "reads" }), m = ne({ storage: g, storageKey: "streak", gracePeriodHours: l }), f = se({ badges: a, storage: g, storageKey: "badges_earned" }), o = le({
    categories: n,
    getArticlesRead: () => d.articlesRead.value
  });
  function t() {
    return {
      articlesRead: d.articlesRead.value,
      readByCategory: d.readByCategory.value,
      currentStreak: m.currentStreak.value,
      longestStreak: m.longestStreak.value,
      totalRead: d.totalRead.value
    };
  }
  function b(v, S) {
    d.markAsRead(v, S), m.recordVisit(), f.checkAll(t());
  }
  return i && q(
    () => f.newlyEarned.value,
    (v) => {
      for (const S of v)
        i(S);
    }
  ), f.checkAll(t()), {
    reader: d,
    streak: m,
    badges: f,
    progress: o,
    markAsRead: b
  };
}
const ie = {
  upvote: 0,
  funny: 0,
  love: 0,
  surprised: 0,
  angry: 0,
  sad: 0
};
function re(e) {
  const { itemId: a, storagePrefix: n = "gamification", initialCounts: s = {} } = e, l = U(n), i = `reactions:${a}:user`, g = `reactions:${a}:counts`, d = l.get(i), m = l.get(g) ?? {}, f = { ...ie, ...s };
  for (const $ of Object.keys(m))
    f[$] = (f[$] ?? 0) + (m[$] ?? 0);
  const o = D(f), t = D(d), b = B(() => t.value !== null), v = B(
    () => Object.values(o.value).reduce(($, A) => $ + A, 0)
  );
  function S() {
    t.value === null ? l.remove(i) : l.set(i, t.value);
  }
  function c($) {
    const E = { ...l.get(g) ?? {} };
    for (const u of Object.keys($))
      E[u] = (E[u] ?? 0) + ($[u] ?? 0);
    l.set(g, E);
  }
  function I($) {
    const A = t.value;
    A === $ ? (o.value[$]--, t.value = null, c({ [$]: -1 })) : (A !== null && (o.value[A]--, c({ [A]: -1 })), o.value[$]++, t.value = $, c({ [$]: 1 })), S();
  }
  function M() {
    if (t.value !== null) {
      const $ = t.value;
      o.value[$]--, c({ [$]: -1 }), t.value = null, S();
    }
  }
  return {
    counts: o,
    userReaction: t,
    hasVoted: b,
    totalResponses: v,
    react: I,
    clearReaction: M
  };
}
const J = {
  difficulty: { easy: 0, justRight: 0, hard: 0 },
  engagement: { boring: 0, interesting: 0, fascinating: 0 }
}, oe = {
  difficulty: null,
  engagement: null
};
function ce(e) {
  const { moduleId: a, storagePrefix: n = "gamification", initialCounts: s = {} } = e, l = U(n), i = `feedback:${a}:user`, g = `feedback:${a}:counts`, d = l.get(i), m = l.get(g) ?? {}, f = {
    difficulty: {
      ...J.difficulty,
      ...s.difficulty
    },
    engagement: {
      ...J.engagement,
      ...s.engagement
    }
  };
  if (m.difficulty)
    for (const u of Object.keys(m.difficulty))
      f.difficulty[u] = (f.difficulty[u] ?? 0) + (m.difficulty[u] ?? 0);
  if (m.engagement)
    for (const u of Object.keys(m.engagement))
      f.engagement[u] = (f.engagement[u] ?? 0) + (m.engagement[u] ?? 0);
  const o = D(f), t = D(
    d ?? { ...oe }
  ), b = B(
    () => t.value.difficulty !== null || t.value.engagement !== null
  ), v = B(() => {
    const u = Object.values(o.value.difficulty).reduce(
      (O, p) => O + p,
      0
    ), w = Object.values(o.value.engagement).reduce(
      (O, p) => O + p,
      0
    );
    return Math.max(u, w);
  });
  function S() {
    t.value.difficulty === null && t.value.engagement === null ? l.remove(i) : l.set(i, t.value);
  }
  function c(u, w, O) {
    var G;
    const p = l.get(g) ?? {}, Y = {
      ...p,
      [u]: {
        ...p[u] ?? {},
        [w]: (((G = p[u]) == null ? void 0 : G[w]) ?? 0) + O
      }
    };
    l.set(g, Y);
  }
  function I(u) {
    const w = t.value.difficulty;
    w === u ? (o.value.difficulty[u]--, t.value.difficulty = null, c("difficulty", u, -1)) : (w !== null && (o.value.difficulty[w]--, c("difficulty", w, -1)), o.value.difficulty[u]++, t.value.difficulty = u, c("difficulty", u, 1)), S();
  }
  function M(u) {
    const w = t.value.engagement;
    w === u ? (o.value.engagement[u]--, t.value.engagement = null, c("engagement", u, -1)) : (w !== null && (o.value.engagement[w]--, c("engagement", w, -1)), o.value.engagement[u]++, t.value.engagement = u, c("engagement", u, 1)), S();
  }
  function $() {
    const u = t.value.difficulty;
    u !== null && (o.value.difficulty[u]--, c("difficulty", u, -1), t.value.difficulty = null, S());
  }
  function A() {
    const u = t.value.engagement;
    u !== null && (o.value.engagement[u]--, c("engagement", u, -1), t.value.engagement = null, S());
  }
  function E() {
    $(), A();
  }
  return {
    counts: o,
    userSelections: t,
    hasVoted: b,
    totalResponses: v,
    selectDifficulty: I,
    selectEngagement: M,
    clearDifficulty: $,
    clearEngagement: A,
    clearAll: E
  };
}
const ue = ["aria-label"], de = { class: "badge-name" }, ge = {
  key: 0,
  class: "badge-description"
}, Ke = /* @__PURE__ */ T({
  __name: "BadgeCard",
  props: {
    badge: {},
    earned: { type: Boolean },
    class: {}
  },
  emits: ["click"],
  setup(e) {
    return (a, n) => (C(), R("div", {
      class: j([a.$props.class, e.earned ? "badge-earned" : "badge-locked"]),
      role: "listitem",
      "aria-label": e.earned ? e.badge.name : `${e.badge.name} (verrouillé)`,
      onClick: n[0] || (n[0] = (s) => a.$emit("click", e.badge))
    }, [
      h(a.$slots, "default", {
        badge: e.badge,
        earned: e.earned
      }, () => [
        h(a.$slots, "icon", {
          badge: e.badge,
          earned: e.earned
        }, () => [
          y("span", {
            class: "badge-icon",
            style: K({ opacity: e.earned ? 1 : 0.3 })
          }, k(e.badge.icon), 5)
        ]),
        y("span", de, k(e.badge.name), 1),
        e.earned ? (C(), R("span", ge, k(e.badge.description), 1)) : h(a.$slots, "locked", {
          key: 1,
          badge: e.badge
        }, () => [
          n[1] || (n[1] = y("span", { class: "badge-locked-text" }, "???", -1))
        ])
      ])
    ], 10, ue));
  }
}), fe = ["aria-label"], Ue = /* @__PURE__ */ T({
  __name: "BadgeGrid",
  props: {
    badges: {},
    earnedIds: {},
    columns: {},
    class: {}
  },
  setup(e) {
    return (a, n) => (C(), R("div", {
      class: j(a.$props.class),
      role: "list",
      "aria-label": `Badges : ${e.earnedIds.length} sur ${e.badges.length} débloqués`
    }, [
      e.badges.length === 0 ? h(a.$slots, "empty", { key: 0 }, () => [
        n[0] || (n[0] = y("p", null, "Aucun badge disponible.", -1))
      ]) : P("", !0),
      (C(!0), R(N, null, V(e.badges, (s) => h(a.$slots, "badge", {
        key: s.id,
        badge: s,
        earned: e.earnedIds.includes(s.id)
      }, () => [
        y("div", null, k(s.icon) + " " + k(s.name), 1)
      ])), 128))
    ], 10, fe));
  }
}), me = ["aria-label"], Ge = /* @__PURE__ */ T({
  __name: "StreakCounter",
  props: {
    current: {},
    longest: {},
    isActive: { type: Boolean },
    class: {}
  },
  setup(e) {
    return (a, n) => (C(), R("div", {
      class: j(a.$props.class),
      role: "status",
      "aria-label": `Série : ${e.current} jour${e.current > 1 ? "s" : ""}`
    }, [
      h(a.$slots, "default", {
        current: e.current,
        longest: e.longest,
        isActive: e.isActive
      }, () => [
        h(a.$slots, "icon", { isActive: e.isActive }, () => [
          y("span", {
            style: K({ opacity: e.isActive ? 1 : 0.4 })
          }, "🔥", 4)
        ]),
        h(a.$slots, "label", {
          current: e.current,
          longest: e.longest
        }, () => [
          y("span", null, k(e.current) + " jour" + k(e.current > 1 ? "s" : ""), 1)
        ])
      ])
    ], 10, me));
  }
}), ye = ["aria-valuenow", "aria-valuemax"], ve = { key: 0 }, Le = /* @__PURE__ */ T({
  __name: "ProgressBar",
  props: {
    value: {},
    max: {},
    label: {},
    class: {},
    barClass: {}
  },
  setup(e) {
    const a = e, n = B(
      () => a.max > 0 ? Math.round(a.value / a.max * 100) : 0
    );
    return (s, l) => (C(), R("div", {
      class: j(s.$props.class),
      role: "progressbar",
      "aria-valuenow": e.value,
      "aria-valuemin": 0,
      "aria-valuemax": e.max
    }, [
      h(s.$slots, "default", {
        value: e.value,
        max: e.max,
        percent: n.value,
        label: e.label
      }, () => [
        h(s.$slots, "label", {
          label: e.label,
          percent: n.value
        }, () => [
          e.label ? (C(), R("span", ve, k(e.label) + " — " + k(n.value) + "%", 1)) : P("", !0)
        ]),
        y("div", {
          class: j(e.barClass),
          style: K({ width: `${n.value}%` })
        }, null, 6)
      ])
    ], 10, ye));
  }
}), ze = /* @__PURE__ */ T({
  __name: "AchievementToast",
  props: {
    badge: {},
    duration: {},
    class: {}
  },
  setup(e) {
    const a = e, n = D(!1);
    let s = null;
    function l() {
      s && (clearTimeout(s), s = null);
    }
    return q(
      () => a.badge,
      (i) => {
        i && (n.value = !0, l(), s = setTimeout(() => {
          n.value = !1;
        }, a.duration ?? 4e3));
      }
    ), Q(l), (i, g) => (C(), X(Z, { name: "toast" }, {
      default: _(() => [
        n.value && e.badge ? (C(), R("div", {
          key: 0,
          class: j(i.$props.class),
          role: "alert",
          "aria-live": "polite"
        }, [
          h(i.$slots, "default", {
            badge: e.badge,
            dismiss: () => n.value = !1
          }, () => [
            y("span", null, k(e.badge.icon), 1),
            y("span", null, "Badge débloqué : " + k(e.badge.name), 1)
          ])
        ], 2)) : P("", !0)
      ]),
      _: 3
    }));
  }
}), He = /* @__PURE__ */ T({
  __name: "GamificationDashboard",
  props: {
    currentStreak: {},
    longestStreak: {},
    isStreakActive: { type: Boolean },
    earnedBadges: {},
    unearnedBadges: {},
    earnedIds: {},
    allBadges: {},
    badgeProgress: {},
    progressByCategory: {},
    overallProgress: {},
    class: {}
  },
  setup(e) {
    return (a, n) => (C(), R("div", {
      class: j(a.$props.class)
    }, [
      h(a.$slots, "header", {}, () => [
        n[0] || (n[0] = y("h2", null, "Progression", -1))
      ]),
      h(a.$slots, "streak", {
        current: e.currentStreak,
        longest: e.longestStreak,
        isActive: e.isStreakActive
      }, () => [
        y("div", null, "🔥 " + k(e.currentStreak) + " jour" + k(e.currentStreak > 1 ? "s" : "") + " de suite", 1)
      ]),
      h(a.$slots, "badges", {
        earned: e.earnedBadges,
        unearned: e.unearnedBadges,
        earnedIds: e.earnedIds,
        allBadges: e.allBadges,
        progress: e.badgeProgress
      }, () => [
        y("div", null, k(e.earnedBadges.length) + " / " + k(e.allBadges.length) + " badges", 1)
      ]),
      h(a.$slots, "progress", {
        byCategory: e.progressByCategory,
        overall: e.overallProgress
      }, () => [
        y("div", null, k(e.overallProgress.percent) + "% complété", 1)
      ]),
      h(a.$slots, "footer")
    ], 2));
  }
}), be = {
  key: 0,
  "aria-live": "polite",
  class: "reaction-header"
}, ke = { class: "reaction-buttons" }, he = ["aria-pressed", "aria-label", "onClick"], $e = { class: "reaction-emoji" }, Se = { class: "reaction-count" }, Je = /* @__PURE__ */ T({
  __name: "ReactionBar",
  props: {
    itemId: {},
    initialCounts: {},
    storagePrefix: {},
    class: {}
  },
  setup(e) {
    const a = e, { counts: n, userReaction: s, hasVoted: l, totalResponses: i, react: g, clearReaction: d } = re({
      itemId: a.itemId,
      storagePrefix: a.storagePrefix,
      initialCounts: a.initialCounts
    });
    function m(f) {
      return s.value === f;
    }
    return (f, o) => (C(), R("div", {
      class: j(f.$props.class),
      role: "group",
      "aria-label": "Reactions"
    }, [
      h(f.$slots, "default", {
        counts: r(n),
        userReaction: r(s),
        hasVoted: r(l),
        totalResponses: r(i),
        react: r(g),
        clearReaction: r(d),
        reactions: r(L),
        isSelected: m
      }, () => [
        r(l) ? (C(), R("div", be, [
          h(f.$slots, "header", { total: r(i) }, () => [
            W(k(r(i)) + " Response" + k(r(i) === 1 ? "" : "s"), 1)
          ])
        ])) : P("", !0),
        y("div", ke, [
          (C(!0), R(N, null, V(r(L), (t) => h(f.$slots, "reaction", {
            key: t.type,
            type: t.type,
            emoji: t.emoji,
            label: t.label,
            count: r(n)[t.type],
            isSelected: m(t.type),
            onClick: () => r(g)(t.type)
          }, () => [
            y("button", {
              type: "button",
              "aria-pressed": m(t.type),
              "aria-label": `${t.label} (${r(n)[t.type]})`,
              class: j(["reaction-button", { "reaction-selected": m(t.type) }]),
              onClick: (b) => r(g)(t.type)
            }, [
              y("span", $e, k(t.emoji), 1),
              y("span", Se, k(r(n)[t.type]), 1)
            ], 10, he)
          ])), 128))
        ])
      ])
    ], 2));
  }
}), Ce = {
  key: 0,
  "aria-live": "polite",
  class: "feedback-header"
}, Re = { class: "feedback-dimension" }, we = { class: "feedback-options" }, Be = ["aria-pressed", "aria-label", "onClick"], je = { class: "feedback-emoji" }, De = { class: "feedback-label" }, Ae = { class: "feedback-count" }, Te = { class: "feedback-dimension" }, pe = { class: "feedback-options" }, Ie = ["aria-pressed", "aria-label", "onClick"], Ee = { class: "feedback-emoji" }, Oe = { class: "feedback-label" }, Pe = { class: "feedback-count" }, qe = /* @__PURE__ */ T({
  __name: "ModuleFeedback",
  props: {
    moduleId: {},
    initialCounts: {},
    storagePrefix: {},
    class: {}
  },
  setup(e) {
    const a = e, {
      counts: n,
      userSelections: s,
      hasVoted: l,
      totalResponses: i,
      selectDifficulty: g,
      selectEngagement: d,
      clearDifficulty: m,
      clearEngagement: f,
      clearAll: o
    } = ce({
      moduleId: a.moduleId,
      storagePrefix: a.storagePrefix,
      initialCounts: a.initialCounts
    });
    function t(v) {
      return s.value.difficulty === v;
    }
    function b(v) {
      return s.value.engagement === v;
    }
    return (v, S) => (C(), R("div", {
      class: j(v.$props.class),
      role: "group",
      "aria-label": "Module Feedback"
    }, [
      h(v.$slots, "default", {
        counts: r(n),
        userSelections: r(s),
        hasVoted: r(l),
        totalResponses: r(i),
        selectDifficulty: r(g),
        selectEngagement: r(d),
        clearDifficulty: r(m),
        clearEngagement: r(f),
        clearAll: r(o),
        difficultyOptions: r(z),
        engagementOptions: r(H),
        isDifficultySelected: t,
        isEngagementSelected: b
      }, () => [
        r(l) ? (C(), R("div", Ce, [
          h(v.$slots, "header", { total: r(i) }, () => [
            W(k(r(i)) + " Response" + k(r(i) === 1 ? "" : "s"), 1)
          ])
        ])) : P("", !0),
        y("div", Re, [
          h(v.$slots, "dimension-label", { dimension: "difficulty" }, () => [
            S[0] || (S[0] = y("span", { class: "feedback-dimension-label" }, "Difficulty:", -1))
          ]),
          y("div", we, [
            (C(!0), R(N, null, V(r(z), (c) => h(v.$slots, "difficulty-option", {
              key: c.key,
              option: c,
              count: r(n).difficulty[c.key],
              isSelected: t(c.key),
              onClick: () => r(g)(c.key)
            }, () => [
              y("button", {
                type: "button",
                "aria-pressed": t(c.key),
                "aria-label": `${c.label} (${r(n).difficulty[c.key]})`,
                class: j(["feedback-button", { "feedback-selected": t(c.key) }]),
                onClick: (I) => r(g)(c.key)
              }, [
                y("span", je, k(c.emoji), 1),
                y("span", De, k(c.label), 1),
                y("span", Ae, k(r(n).difficulty[c.key]), 1)
              ], 10, Be)
            ])), 128))
          ])
        ]),
        y("div", Te, [
          h(v.$slots, "dimension-label", { dimension: "engagement" }, () => [
            S[1] || (S[1] = y("span", { class: "feedback-dimension-label" }, "Engagement:", -1))
          ]),
          y("div", pe, [
            (C(!0), R(N, null, V(r(H), (c) => h(v.$slots, "engagement-option", {
              key: c.key,
              option: c,
              count: r(n).engagement[c.key],
              isSelected: b(c.key),
              onClick: () => r(d)(c.key)
            }, () => [
              y("button", {
                type: "button",
                "aria-pressed": b(c.key),
                "aria-label": `${c.label} (${r(n).engagement[c.key]})`,
                class: j(["feedback-button", { "feedback-selected": b(c.key) }]),
                onClick: (I) => r(d)(c.key)
              }, [
                y("span", Ee, k(c.emoji), 1),
                y("span", Oe, k(c.label), 1),
                y("span", Pe, k(r(n).engagement[c.key]), 1)
              ], 10, Ie)
            ])), 128))
          ])
        ])
      ])
    ], 2));
  }
});
export {
  ze as AchievementToast,
  Ke as BadgeCard,
  Ue as BadgeGrid,
  z as DIFFICULTY_OPTIONS,
  H as ENGAGEMENT_OPTIONS,
  He as GamificationDashboard,
  qe as ModuleFeedback,
  Le as ProgressBar,
  L as REACTIONS,
  Je as ReactionBar,
  Ge as StreakCounter,
  U as createStorage,
  Ve as fireBadgeConfetti,
  Ne as fireConfetti,
  se as useBadges,
  Me as useGamification,
  ce as useModuleFeedback,
  le as useProgress,
  re as useReactions,
  ee as useReadTracker,
  ne as useStreak
};
