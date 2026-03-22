<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import {
  getState,
  getLevel,
  getAllProgress,
  updateStreak,
  getSectionProgress,
  getSectionLabels,
  getSectionCounts,
  type ReadingState,
  type LevelInfo,
  type AllProgress,
} from '../lib/reading-tracker';

const expanded = ref(false);
const state = ref<ReadingState | null>(null);
const level = ref<LevelInfo | null>(null);
const progress = ref<AllProgress | null>(null);
const streak = ref({ current: 0, longest: 0 });
const visible = ref(false);

const sectionLabels = getSectionLabels();
const sectionKeys = Object.keys(getSectionCounts());

interface SectionInfo {
  key: string;
  label: string;
  read: number;
  total: number;
  percent: number;
  completed: boolean;
}

const sections = ref<SectionInfo[]>([]);

function refresh() {
  state.value = getState();
  level.value = getLevel();
  progress.value = getAllProgress();
  streak.value = updateStreak();

  sections.value = sectionKeys.map((key) => {
    const sp = getSectionProgress(key);
    return {
      key,
      label: sectionLabels[key] ?? key,
      read: sp.read,
      total: sp.total,
      percent: sp.percent,
      completed: state.value?.sectionsCompleted.includes(key) ?? false,
    };
  });
}

const badgeCount = computed(() => state.value?.sectionsCompleted.length ?? 0);

const xpDisplay = computed(() => {
  const xp = state.value?.totalXP ?? 0;
  return xp >= 1000 ? `${(xp / 1000).toFixed(1)}k` : String(xp);
});

function toggle() {
  expanded.value = !expanded.value;
}

onMounted(() => {
  refresh();
  // Small delay so the bar slides in smoothly
  requestAnimationFrame(() => {
    visible.value = true;
  });

  // Listen for custom events from other components
  window.addEventListener('gamification:article-read', () => refresh());
});
</script>

<template>
  <div
    class="gamification-bar"
    :class="{ 'gamification-bar--visible': visible, 'gamification-bar--expanded': expanded }"
  >
    <!-- Minimized bar -->
    <button class="bar-summary" @click="toggle" :aria-expanded="expanded" aria-label="Afficher les statistiques de lecture">
      <span class="bar-level" v-if="level">
        <span class="bar-level__icon">{{ level.icon }}</span>
        <span class="bar-level__name">{{ level.name }}</span>
      </span>

      <span class="bar-divider"></span>

      <span class="bar-streak" v-if="streak.current > 0" :title="`${streak.current} jour(s) de suite`">
        <svg class="bar-icon" viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
          <path d="M10 2a.75.75 0 01.67.42l1.06 2.15 2.37.34a.75.75 0 01.41 1.28l-1.71 1.67.4 2.36a.75.75 0 01-1.09.79L10 9.77l-2.11 1.11a.75.75 0 01-1.09-.79l.4-2.36L5.5 6.06a.75.75 0 01.41-1.28l2.37-.34L9.33 2.3A.75.75 0 0110 2z"/>
        </svg>
        <span>{{ streak.current }}j</span>
      </span>

      <span class="bar-progress-inline" v-if="progress">
        <span class="bar-progress-inline__track">
          <span class="bar-progress-inline__fill" :style="{ width: progress.percent + '%' }"></span>
        </span>
        <span class="bar-progress-inline__text">{{ progress.read }}/{{ progress.total }}</span>
      </span>

      <span class="bar-badges" v-if="badgeCount > 0">
        <span class="bar-badges__icon">&#127942;</span>
        <span>{{ badgeCount }}</span>
      </span>

      <span class="bar-xp" v-if="state && state.totalXP > 0">
        <span class="bar-xp__value">{{ xpDisplay }} XP</span>
      </span>

      <span class="bar-toggle-icon" :class="{ 'bar-toggle-icon--up': expanded }">
        <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
        </svg>
      </span>
    </button>

    <!-- Expanded panel -->
    <div class="bar-panel" v-if="expanded">
      <div class="panel-header">
        <h3 class="panel-title">Ta progression</h3>
        <button class="panel-close" @click="expanded = false" aria-label="Fermer">
          <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>

      <!-- Level info -->
      <div class="panel-level" v-if="level">
        <div class="panel-level__header">
          <span class="panel-level__icon">{{ level.icon }}</span>
          <div>
            <div class="panel-level__name">Niveau {{ level.level }} &mdash; {{ level.name }}</div>
            <div class="panel-level__next" v-if="level.articlesForNext > 0">
              Encore {{ level.articlesForNext }} article{{ level.articlesForNext > 1 ? 's' : '' }} pour le prochain niveau
            </div>
            <div class="panel-level__max" v-else>
              Niveau maximum atteint !
            </div>
          </div>
        </div>
        <div class="panel-level__bar">
          <div class="panel-level__fill" :style="{ width: (level.progress * 100) + '%' }"></div>
        </div>
      </div>

      <!-- Stats row -->
      <div class="panel-stats">
        <div class="panel-stat">
          <span class="panel-stat__value">{{ progress?.read ?? 0 }}</span>
          <span class="panel-stat__label">Articles lus</span>
        </div>
        <div class="panel-stat">
          <span class="panel-stat__value">{{ streak.current }}</span>
          <span class="panel-stat__label">Jours de suite</span>
        </div>
        <div class="panel-stat">
          <span class="panel-stat__value panel-stat__value--xp">{{ state?.totalXP ?? 0 }}</span>
          <span class="panel-stat__label">XP total</span>
        </div>
        <div class="panel-stat">
          <span class="panel-stat__value">{{ badgeCount }}</span>
          <span class="panel-stat__label">Badges</span>
        </div>
      </div>

      <!-- Sections -->
      <div class="panel-sections">
        <h4 class="panel-sections__title">Sections</h4>
        <div
          v-for="sec in sections"
          :key="sec.key"
          class="panel-section"
          :class="{ 'panel-section--completed': sec.completed }"
        >
          <div class="panel-section__header">
            <span class="panel-section__name">
              <span v-if="sec.completed" class="panel-section__badge">&#127942;</span>
              {{ sec.label }}
            </span>
            <span class="panel-section__count">{{ sec.read }}/{{ sec.total }}</span>
          </div>
          <div class="panel-section__bar">
            <div class="panel-section__fill" :style="{ width: sec.percent + '%' }"></div>
          </div>
        </div>
      </div>

      <!-- Streak details -->
      <div class="panel-streak" v-if="streak.longest > 0">
        <span class="panel-streak__label">Record de visite :</span>
        <span class="panel-streak__value">{{ streak.longest }} jour{{ streak.longest > 1 ? 's' : '' }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gamification-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transform: translateY(100%);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  font-family: var(--font-sans, 'Inter', system-ui, sans-serif);
}

.gamification-bar--visible {
  transform: translateY(0);
}

/* ── Summary bar ─────────────────── */
.bar-summary {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #e2e8f0;
  background: linear-gradient(
    180deg,
    rgba(15, 23, 42, 0.92) 0%,
    rgba(15, 23, 42, 0.97) 100%
  );
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-top: 1px solid rgba(99, 102, 241, 0.25);
  box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  transition: background 0.2s ease;
}

.bar-summary:hover {
  background: linear-gradient(
    180deg,
    rgba(15, 23, 42, 0.95) 0%,
    rgba(30, 27, 75, 0.97) 100%
  );
}

.bar-level {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.bar-level__icon {
  font-size: 1rem;
}

.bar-level__name {
  color: #a5b4fc;
  font-weight: 600;
}

.bar-divider {
  width: 1px;
  height: 16px;
  background: rgba(148, 163, 184, 0.25);
}

.bar-streak {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #fbbf24;
}

.bar-icon {
  flex-shrink: 0;
}

.bar-progress-inline {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  max-width: 200px;
}

.bar-progress-inline__track {
  flex: 1;
  height: 4px;
  background: rgba(148, 163, 184, 0.2);
  border-radius: 9999px;
  overflow: hidden;
}

.bar-progress-inline__fill {
  height: 100%;
  background: linear-gradient(90deg, #818cf8, #06b6d4);
  border-radius: 9999px;
  transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.bar-progress-inline__text {
  font-size: 0.75rem;
  color: #94a3b8;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.bar-badges {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #f59e0b;
}

.bar-badges__icon {
  font-size: 0.875rem;
}

.bar-xp {
  margin-left: auto;
}

.bar-xp__value {
  color: #f59e0b;
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.bar-toggle-icon {
  display: flex;
  align-items: center;
  color: #64748b;
  transition: transform 0.3s ease;
}

.bar-toggle-icon--up {
  transform: rotate(180deg);
}

/* ── Expanded panel ──────────────── */
.bar-panel {
  background: linear-gradient(
    180deg,
    rgba(15, 23, 42, 0.97) 0%,
    rgba(15, 23, 42, 0.99) 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid rgba(99, 102, 241, 0.15);
  padding: 1.25rem 1rem 1rem;
  max-height: 60vh;
  overflow-y: auto;
  animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.panel-title {
  font-size: 0.9375rem;
  font-weight: 700;
  color: #f1f5f9;
  letter-spacing: -0.01em;
}

.panel-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: rgba(148, 163, 184, 0.1);
  border-radius: 6px;
  color: #94a3b8;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}

.panel-close:hover {
  background: rgba(148, 163, 184, 0.2);
  color: #e2e8f0;
}

/* ── Level ───────────────────────── */
.panel-level {
  background: rgba(99, 102, 241, 0.08);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 10px;
  padding: 0.875rem 1rem;
  margin-bottom: 1rem;
}

.panel-level__header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.625rem;
}

.panel-level__icon {
  font-size: 1.5rem;
}

.panel-level__name {
  font-size: 0.875rem;
  font-weight: 700;
  color: #c7d2fe;
}

.panel-level__next {
  font-size: 0.75rem;
  color: #94a3b8;
  margin-top: 0.125rem;
}

.panel-level__max {
  font-size: 0.75rem;
  color: #f59e0b;
  font-weight: 600;
  margin-top: 0.125rem;
}

.panel-level__bar {
  height: 6px;
  background: rgba(148, 163, 184, 0.15);
  border-radius: 9999px;
  overflow: hidden;
}

.panel-level__fill {
  height: 100%;
  background: linear-gradient(90deg, #6366f1, #06b6d4);
  border-radius: 9999px;
  transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 0 8px rgba(99, 102, 241, 0.4);
}

/* ── Stats ────────────────────────── */
.panel-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.panel-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.125rem;
  padding: 0.625rem 0.25rem;
  background: rgba(148, 163, 184, 0.06);
  border-radius: 8px;
  border: 1px solid rgba(148, 163, 184, 0.08);
}

.panel-stat__value {
  font-size: 1.125rem;
  font-weight: 800;
  color: #f1f5f9;
  font-variant-numeric: tabular-nums;
}

.panel-stat__value--xp {
  color: #f59e0b;
}

.panel-stat__label {
  font-size: 0.625rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
  text-align: center;
}

/* ── Sections ─────────────────────── */
.panel-sections {
  margin-bottom: 0.75rem;
}

.panel-sections__title {
  font-size: 0.6875rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.5rem;
}

.panel-section {
  padding: 0.5rem 0;
}

.panel-section + .panel-section {
  border-top: 1px solid rgba(148, 163, 184, 0.06);
}

.panel-section__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.375rem;
}

.panel-section__name {
  font-size: 0.8125rem;
  font-weight: 500;
  color: #cbd5e1;
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.panel-section__badge {
  font-size: 0.875rem;
}

.panel-section--completed .panel-section__name {
  color: #f59e0b;
}

.panel-section__count {
  font-size: 0.75rem;
  color: #64748b;
  font-variant-numeric: tabular-nums;
}

.panel-section__bar {
  height: 3px;
  background: rgba(148, 163, 184, 0.12);
  border-radius: 9999px;
  overflow: hidden;
}

.panel-section__fill {
  height: 100%;
  background: linear-gradient(90deg, #818cf8, #06b6d4);
  border-radius: 9999px;
  transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.panel-section--completed .panel-section__fill {
  background: linear-gradient(90deg, #f59e0b, #fbbf24);
  box-shadow: 0 0 6px rgba(245, 158, 11, 0.4);
}

/* ── Streak footer ───────────────── */
.panel-streak {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
  color: #64748b;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(148, 163, 184, 0.06);
}

.panel-streak__value {
  color: #fbbf24;
  font-weight: 600;
}

/* ── Responsive ──────────────────── */
@media (max-width: 480px) {
  .bar-summary {
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
  }

  .bar-progress-inline {
    max-width: 100px;
  }

  .panel-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
