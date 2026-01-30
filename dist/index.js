import { ref as $, computed as y, watch as T, defineComponent as S, openBlock as h, createElementBlock as k, normalizeClass as w, renderSlot as f, createElementVNode as b, normalizeStyle as D, toDisplayString as v, createCommentVNode as A, Fragment as I, renderList as P, onUnmounted as F, createBlock as K, Transition as M, withCtx as V } from "vue";
function E(e) {
  const t = (a) => `${e}_${a}`;
  return {
    get(a) {
      if (typeof window > "u") return null;
      try {
        const n = localStorage.getItem(t(a));
        return n ? JSON.parse(n) : null;
      } catch {
        return null;
      }
    },
    set(a, n) {
      if (!(typeof window > "u"))
        try {
          localStorage.setItem(t(a), JSON.stringify(n));
        } catch {
        }
    },
    remove(a) {
      typeof window > "u" || localStorage.removeItem(t(a));
    },
    clear() {
      if (typeof window > "u") return;
      const a = [];
      for (let n = 0; n < localStorage.length; n++) {
        const s = localStorage.key(n);
        s != null && s.startsWith(e + "_") && a.push(s);
      }
      a.forEach((n) => localStorage.removeItem(n));
    }
  };
}
let C = null;
async function R() {
  if (C) return C;
  try {
    return C = (await import("./confetti.module-CZUVFyXe.js")).default, C;
  } catch {
    return null;
  }
}
async function x(e) {
  const t = await R();
  t && await t({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    ...e
  });
}
async function p(e) {
  const t = await R();
  if (!t) return;
  let a = { x: 0.5, y: 0.5 };
  if (e) {
    const n = e.getBoundingClientRect();
    a = {
      x: (n.left + n.width / 2) / window.innerWidth,
      y: (n.top + n.height / 2) / window.innerHeight
    };
  }
  await t({
    particleCount: 60,
    spread: 55,
    origin: a,
    colors: ["#FFD700", "#FF6347", "#32CD32", "#9370DB", "#FF69B4"]
  });
}
function O(e) {
  const { storage: t, storageKey: a = "reads" } = e, n = $(t.get(a) ?? []), s = y(() => n.value.map((i) => i.slug)), l = y(() => n.value.length), c = y(() => {
    const i = {};
    for (const r of n.value) {
      const u = r.category ?? "_uncategorized";
      i[u] || (i[u] = []), i[u].push(r.slug);
    }
    return i;
  });
  function o() {
    t.set(a, n.value);
  }
  function d(i, r) {
    n.value.some((u) => u.slug === i) || (n.value.push({
      slug: i,
      category: r,
      date: (/* @__PURE__ */ new Date()).toISOString()
    }), o());
  }
  function g(i) {
    return n.value.some((r) => r.slug === i);
  }
  return {
    articlesRead: s,
    totalRead: l,
    readByCategory: c,
    markAsRead: d,
    isRead: g
  };
}
function j(e) {
  return e.toISOString().split("T")[0];
}
function G(e, t) {
  const a = /* @__PURE__ */ new Date(e + "T00:00:00"), n = /* @__PURE__ */ new Date(t + "T00:00:00");
  return Math.round(Math.abs(n.getTime() - a.getTime()) / (1e3 * 60 * 60 * 24));
}
function N(e) {
  const { storage: t, storageKey: a = "streak", gracePeriodHours: n = 36 } = e, s = t.get(a), l = $((s == null ? void 0 : s.current) ?? 0), c = $((s == null ? void 0 : s.longest) ?? 0), o = $((s == null ? void 0 : s.lastVisitDate) ?? null), d = y(() => {
    if (!o.value) return !1;
    const r = /* @__PURE__ */ new Date(), u = /* @__PURE__ */ new Date(o.value + "T00:00:00");
    return (r.getTime() - u.getTime()) / (1e3 * 60 * 60) < n;
  });
  function g() {
    t.set(a, {
      current: l.value,
      longest: c.value,
      lastVisitDate: o.value
    });
  }
  function i() {
    const r = j(/* @__PURE__ */ new Date());
    if (o.value !== r) {
      if (!o.value)
        l.value = 1;
      else {
        const u = G(o.value, r);
        if (u === 1)
          l.value++;
        else {
          const m = /* @__PURE__ */ new Date(o.value + "T00:00:00");
          ((/* @__PURE__ */ new Date()).getTime() - m.getTime()) / (1e3 * 60 * 60) <= n && u <= 2 ? l.value++ : l.value = 1;
        }
      }
      l.value > c.value && (c.value = l.value), o.value = r, g();
    }
  }
  return {
    currentStreak: l,
    longestStreak: c,
    lastVisitDate: o,
    isActive: d,
    recordVisit: i
  };
}
function z(e) {
  const { badges: t, storage: a, storageKey: n = "badges_earned" } = e, s = $(a.get(n) ?? []), l = $([]), c = y(
    () => t.filter((r) => s.value.includes(r.id))
  ), o = y(
    () => t.filter((r) => !s.value.includes(r.id) && !r.secret)
  ), d = y(() => {
    const r = t.filter((m) => !m.secret).length;
    if (r === 0) return 0;
    const u = c.value.filter((m) => !m.secret).length;
    return Math.round(u / r * 100);
  });
  function g() {
    a.set(n, s.value);
  }
  function i(r) {
    const u = [];
    for (const m of t)
      if (!s.value.includes(m.id))
        try {
          m.condition(r) && (s.value.push(m.id), u.push(m));
        } catch {
        }
    u.length > 0 && (l.value = u, g());
  }
  return {
    earned: c,
    unearned: o,
    newlyEarned: l,
    progress: d,
    checkAll: i
  };
}
function H(e) {
  const { categories: t, getArticlesRead: a } = e, n = y(() => {
    const l = a(), c = {};
    for (const [o, d] of Object.entries(t)) {
      const g = d.length, i = d.filter((r) => l.includes(r)).length;
      c[o] = {
        read: i,
        total: g,
        percent: g > 0 ? Math.round(i / g * 100) : 0
      };
    }
    return c;
  }), s = y(() => {
    const l = new Set(Object.values(t).flat()), c = a(), o = l.size, d = [...l].filter((g) => c.includes(g)).length;
    return {
      read: d,
      total: o,
      percent: o > 0 ? Math.round(d / o * 100) : 0
    };
  });
  return { byCategory: n, overall: s };
}
function _(e) {
  const {
    badges: t,
    categories: a,
    storagePrefix: n = "gamification",
    gracePeriodHours: s = 36,
    onBadgeEarned: l
  } = e, c = E(n), o = O({ storage: c, storageKey: "reads" }), d = N({ storage: c, storageKey: "streak", gracePeriodHours: s }), g = z({ badges: t, storage: c, storageKey: "badges_earned" }), i = H({
    categories: a,
    getArticlesRead: () => o.articlesRead.value
  });
  function r() {
    return {
      articlesRead: o.articlesRead.value,
      readByCategory: o.readByCategory.value,
      currentStreak: d.currentStreak.value,
      longestStreak: d.longestStreak.value,
      totalRead: o.totalRead.value
    };
  }
  function u(m, B) {
    o.markAsRead(m, B), d.recordVisit(), g.checkAll(r());
  }
  return l && T(
    () => g.newlyEarned.value,
    (m) => {
      for (const B of m)
        l(B);
    }
  ), g.checkAll(r()), {
    reader: o,
    streak: d,
    badges: g,
    progress: i,
    markAsRead: u
  };
}
const q = ["aria-label"], J = { class: "badge-name" }, W = {
  key: 0,
  class: "badge-description"
}, ee = /* @__PURE__ */ S({
  __name: "BadgeCard",
  props: {
    badge: {},
    earned: { type: Boolean },
    class: {}
  },
  emits: ["click"],
  setup(e) {
    return (t, a) => (h(), k("div", {
      class: w([t.$props.class, e.earned ? "badge-earned" : "badge-locked"]),
      role: "listitem",
      "aria-label": e.earned ? e.badge.name : `${e.badge.name} (verrouillé)`,
      onClick: a[0] || (a[0] = (n) => t.$emit("click", e.badge))
    }, [
      f(t.$slots, "default", {
        badge: e.badge,
        earned: e.earned
      }, () => [
        f(t.$slots, "icon", {
          badge: e.badge,
          earned: e.earned
        }, () => [
          b("span", {
            class: "badge-icon",
            style: D({ opacity: e.earned ? 1 : 0.3 })
          }, v(e.badge.icon), 5)
        ]),
        b("span", J, v(e.badge.name), 1),
        e.earned ? (h(), k("span", W, v(e.badge.description), 1)) : f(t.$slots, "locked", {
          key: 1,
          badge: e.badge
        }, () => [
          a[1] || (a[1] = b("span", { class: "badge-locked-text" }, "???", -1))
        ])
      ])
    ], 10, q));
  }
}), L = ["aria-label"], te = /* @__PURE__ */ S({
  __name: "BadgeGrid",
  props: {
    badges: {},
    earnedIds: {},
    columns: {},
    class: {}
  },
  setup(e) {
    return (t, a) => (h(), k("div", {
      class: w(t.$props.class),
      role: "list",
      "aria-label": `Badges : ${e.earnedIds.length} sur ${e.badges.length} débloqués`
    }, [
      e.badges.length === 0 ? f(t.$slots, "empty", { key: 0 }, () => [
        a[0] || (a[0] = b("p", null, "Aucun badge disponible.", -1))
      ]) : A("", !0),
      (h(!0), k(I, null, P(e.badges, (n) => f(t.$slots, "badge", {
        key: n.id,
        badge: n,
        earned: e.earnedIds.includes(n.id)
      }, () => [
        b("div", null, v(n.icon) + " " + v(n.name), 1)
      ])), 128))
    ], 10, L));
  }
}), U = ["aria-label"], ae = /* @__PURE__ */ S({
  __name: "StreakCounter",
  props: {
    current: {},
    longest: {},
    isActive: { type: Boolean },
    class: {}
  },
  setup(e) {
    return (t, a) => (h(), k("div", {
      class: w(t.$props.class),
      role: "status",
      "aria-label": `Série : ${e.current} jour${e.current > 1 ? "s" : ""}`
    }, [
      f(t.$slots, "default", {
        current: e.current,
        longest: e.longest,
        isActive: e.isActive
      }, () => [
        f(t.$slots, "icon", { isActive: e.isActive }, () => [
          b("span", {
            style: D({ opacity: e.isActive ? 1 : 0.4 })
          }, "🔥", 4)
        ]),
        f(t.$slots, "label", {
          current: e.current,
          longest: e.longest
        }, () => [
          b("span", null, v(e.current) + " jour" + v(e.current > 1 ? "s" : ""), 1)
        ])
      ])
    ], 10, U));
  }
}), Q = ["aria-valuenow", "aria-valuemax"], X = { key: 0 }, ne = /* @__PURE__ */ S({
  __name: "ProgressBar",
  props: {
    value: {},
    max: {},
    label: {},
    class: {},
    barClass: {}
  },
  setup(e) {
    const t = e, a = y(
      () => t.max > 0 ? Math.round(t.value / t.max * 100) : 0
    );
    return (n, s) => (h(), k("div", {
      class: w(n.$props.class),
      role: "progressbar",
      "aria-valuenow": e.value,
      "aria-valuemin": 0,
      "aria-valuemax": e.max
    }, [
      f(n.$slots, "default", {
        value: e.value,
        max: e.max,
        percent: a.value,
        label: e.label
      }, () => [
        f(n.$slots, "label", {
          label: e.label,
          percent: a.value
        }, () => [
          e.label ? (h(), k("span", X, v(e.label) + " — " + v(a.value) + "%", 1)) : A("", !0)
        ]),
        b("div", {
          class: w(e.barClass),
          style: D({ width: `${a.value}%` })
        }, null, 6)
      ])
    ], 10, Q));
  }
}), se = /* @__PURE__ */ S({
  __name: "AchievementToast",
  props: {
    badge: {},
    duration: {},
    class: {}
  },
  setup(e) {
    const t = e, a = $(!1);
    let n = null;
    function s() {
      n && (clearTimeout(n), n = null);
    }
    return T(
      () => t.badge,
      (l) => {
        l && (a.value = !0, s(), n = setTimeout(() => {
          a.value = !1;
        }, t.duration ?? 4e3));
      }
    ), F(s), (l, c) => (h(), K(M, { name: "toast" }, {
      default: V(() => [
        a.value && e.badge ? (h(), k("div", {
          key: 0,
          class: w(l.$props.class),
          role: "alert",
          "aria-live": "polite"
        }, [
          f(l.$slots, "default", {
            badge: e.badge,
            dismiss: () => a.value = !1
          }, () => [
            b("span", null, v(e.badge.icon), 1),
            b("span", null, "Badge débloqué : " + v(e.badge.name), 1)
          ])
        ], 2)) : A("", !0)
      ]),
      _: 3
    }));
  }
}), re = /* @__PURE__ */ S({
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
    return (t, a) => (h(), k("div", {
      class: w(t.$props.class)
    }, [
      f(t.$slots, "header", {}, () => [
        a[0] || (a[0] = b("h2", null, "Progression", -1))
      ]),
      f(t.$slots, "streak", {
        current: e.currentStreak,
        longest: e.longestStreak,
        isActive: e.isStreakActive
      }, () => [
        b("div", null, "🔥 " + v(e.currentStreak) + " jour" + v(e.currentStreak > 1 ? "s" : "") + " de suite", 1)
      ]),
      f(t.$slots, "badges", {
        earned: e.earnedBadges,
        unearned: e.unearnedBadges,
        earnedIds: e.earnedIds,
        allBadges: e.allBadges,
        progress: e.badgeProgress
      }, () => [
        b("div", null, v(e.earnedBadges.length) + " / " + v(e.allBadges.length) + " badges", 1)
      ]),
      f(t.$slots, "progress", {
        byCategory: e.progressByCategory,
        overall: e.overallProgress
      }, () => [
        b("div", null, v(e.overallProgress.percent) + "% complété", 1)
      ]),
      f(t.$slots, "footer")
    ], 2));
  }
});
export {
  se as AchievementToast,
  ee as BadgeCard,
  te as BadgeGrid,
  re as GamificationDashboard,
  ne as ProgressBar,
  ae as StreakCounter,
  E as createStorage,
  p as fireBadgeConfetti,
  x as fireConfetti,
  z as useBadges,
  _ as useGamification,
  H as useProgress,
  O as useReadTracker,
  N as useStreak
};
