<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import {
  getState,
  markArticleRead,
  getLevel,
  type MarkResult,
  type LevelInfo,
} from '../lib/reading-tracker';

const props = defineProps<{
  slug?: string;
  title?: string;
  section?: string;
  nextLink?: string;
  nextLabel?: string;
}>();

const showReward = ref(false);
const hasTriggered = ref(false);
const result = ref<MarkResult | null>(null);
const level = ref<LevelInfo | null>(null);
const showConfetti = ref(false);
const xpAnimated = ref(false);

const resolvedSlug = computed(() => {
  if (props.slug) return props.slug.replace(/^\/|\/$/g, '');
  if (typeof window !== 'undefined') return window.location.pathname.replace(/^\/|\/$/g, '');
  return '';
});

const resolvedTitle = computed(() => {
  return props.title || 'cet article';
});

const isLongArticle = computed(() => {
  const longSlugs = [
    'comprendre/neurosciences',
    'comprendre/techniques-avancees',
    'concevoir/etudes-de-cas',
    'creer/implementation',
    'humain/utilisateur-personne',
  ];
  return longSlugs.includes(resolvedSlug.value);
});

const baseXP = computed(() => isLongArticle.value ? 20 : 10);

const alreadyRead = computed(() => {
  const state = getState();
  return state.articlesRead.includes(resolvedSlug.value);
});

function checkCompletion() {
  if (hasTriggered.value) return;

  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (docHeight <= 0) return;

  const percent = scrollTop / docHeight;
  if (percent < 0.85) return;

  hasTriggered.value = true;

  if (alreadyRead.value) {
    // Already read — show a lighter reward
    showReward.value = true;
    result.value = {
      xpGained: 0,
      sectionCompleted: false,
      sectionName: null,
      levelUp: false,
      newLevel: null,
      alreadyRead: true,
    };
    level.value = getLevel();
    return;
  }

  // Mark as read and get result
  const markResult = markArticleRead(resolvedSlug.value, props.section);
  result.value = markResult;
  level.value = getLevel();
  showReward.value = true;

  // Notify other components
  window.dispatchEvent(new CustomEvent('gamification:article-read'));

  // Animate XP after a short delay
  setTimeout(() => {
    xpAnimated.value = true;
  }, 300);

  // Show confetti for section completion or level up
  if (markResult.sectionCompleted || markResult.levelUp) {
    setTimeout(() => {
      showConfetti.value = true;
      setTimeout(() => {
        showConfetti.value = false;
      }, 2500);
    }, 600);
  }
}

onMounted(() => {
  window.addEventListener('scroll', checkCompletion, { passive: true });
  // Check immediately in case already scrolled
  checkCompletion();
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkCompletion);
});
</script>

<template>
  <div class="article-reward-wrapper">
    <Transition name="reward">
      <div v-if="showReward" class="article-reward">
        <!-- Confetti particles -->
        <div v-if="showConfetti" class="confetti-container" aria-hidden="true">
          <span v-for="i in 30" :key="i" class="confetti-particle" :style="{
            '--delay': Math.random() * 0.6 + 's',
            '--x': (Math.random() * 200 - 100) + 'px',
            '--y': -(Math.random() * 150 + 80) + 'px',
            '--r': (Math.random() * 720 - 360) + 'deg',
            '--color': ['#6366f1', '#06b6d4', '#f59e0b', '#10b981', '#f43f5e', '#a855f7'][Math.floor(Math.random() * 6)],
            '--size': (Math.random() * 6 + 4) + 'px',
          }"></span>
        </div>

        <div class="reward-card" :class="{ 'reward-card--badge': result?.sectionCompleted, 'reward-card--levelup': result?.levelUp }">
          <!-- Already read state -->
          <template v-if="result?.alreadyRead">
            <div class="reward-icon reward-icon--check">&#10003;</div>
            <p class="reward-title">Deja lu</p>
            <p class="reward-subtitle">Tu as deja lu &laquo;&nbsp;{{ resolvedTitle }}&nbsp;&raquo;</p>
          </template>

          <!-- New read state -->
          <template v-else>
            <div class="reward-icon" :class="{ 'reward-icon--glow': xpAnimated }">&#127775;</div>
            <p class="reward-title">Tu viens de lire &laquo;&nbsp;{{ resolvedTitle }}&nbsp;&raquo;</p>

            <!-- XP animation -->
            <div class="reward-xp" :class="{ 'reward-xp--animated': xpAnimated }">
              <span class="reward-xp__value">+{{ baseXP }} XP</span>
            </div>

            <!-- Section completed -->
            <div v-if="result?.sectionCompleted" class="reward-badge">
              <span class="reward-badge__icon">&#127942;</span>
              <span class="reward-badge__text">Section &laquo;&nbsp;{{ result.sectionName }}&nbsp;&raquo; completee !</span>
              <span class="reward-badge__bonus">+50 XP bonus</span>
            </div>

            <!-- Level up -->
            <div v-if="result?.levelUp && result.newLevel" class="reward-levelup">
              <span class="reward-levelup__icon">{{ result.newLevel.icon }}</span>
              <span class="reward-levelup__text">
                Niveau {{ result.newLevel.level }} &mdash; {{ result.newLevel.name }}
              </span>
            </div>

            <!-- Current level progress -->
            <div v-if="level && !result?.levelUp" class="reward-progress">
              <div class="reward-progress__bar">
                <div class="reward-progress__fill" :style="{ width: (level.progress * 100) + '%' }"></div>
              </div>
              <span class="reward-progress__label">
                {{ level.icon }} {{ level.name }}
                <template v-if="level.articlesForNext > 0">
                  &mdash; encore {{ level.articlesForNext }} article{{ level.articlesForNext > 1 ? 's' : '' }}
                </template>
              </span>
            </div>
          </template>

          <!-- Next article button -->
          <a
            v-if="nextLink"
            :href="nextLink"
            class="reward-next"
          >
            <span>{{ nextLabel || 'Article suivant' }}</span>
            <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
            </svg>
          </a>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.article-reward-wrapper {
  margin-top: 2.5rem;
  padding-top: 1.5rem;
}

.article-reward {
  display: flex;
  justify-content: center;
  position: relative;
}

/* ── Reward card ─────────────────── */
.reward-card {
  position: relative;
  text-align: center;
  padding: 2rem 2.5rem;
  max-width: 420px;
  width: 100%;
  background: linear-gradient(
    160deg,
    rgba(15, 23, 42, 0.85) 0%,
    rgba(30, 27, 75, 0.75) 100%
  );
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.03),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  animation: cardAppear 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.reward-card--badge {
  border-color: rgba(245, 158, 11, 0.35);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 24px rgba(245, 158, 11, 0.1);
}

.reward-card--levelup {
  border-color: rgba(99, 102, 241, 0.4);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 30px rgba(99, 102, 241, 0.15);
}

@keyframes cardAppear {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* ── Icon ────────────────────────── */
.reward-icon {
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
    filter 0.5s ease;
}

.reward-icon--glow {
  transform: scale(1.15);
  filter: drop-shadow(0 0 12px rgba(245, 158, 11, 0.5));
}

.reward-icon--check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  font-size: 1.25rem;
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  border-radius: 50%;
  border: 2px solid rgba(16, 185, 129, 0.3);
}

/* ── Title and subtitle ──────────── */
.reward-title {
  font-size: 1rem;
  font-weight: 700;
  color: #f1f5f9;
  margin-bottom: 0.25rem;
  line-height: 1.4;
}

.reward-subtitle {
  font-size: 0.8125rem;
  color: #94a3b8;
  margin-top: 0.25rem;
}

/* ── XP ──────────────────────────── */
.reward-xp {
  margin-top: 0.75rem;
  margin-bottom: 0.5rem;
}

.reward-xp__value {
  display: inline-block;
  font-size: 1.25rem;
  font-weight: 800;
  color: #f59e0b;
  letter-spacing: 0.02em;
  opacity: 0;
  transform: translateY(8px) scale(0.8);
  transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.reward-xp--animated .reward-xp__value {
  opacity: 1;
  transform: translateY(0) scale(1);
  text-shadow: 0 0 16px rgba(245, 158, 11, 0.4);
}

/* ── Badge ────────────────────────── */
.reward-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  margin-top: 1rem;
  padding: 0.875rem 1rem;
  background: rgba(245, 158, 11, 0.08);
  border: 1px solid rgba(245, 158, 11, 0.25);
  border-radius: 10px;
  animation: badgePop 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both;
}

.reward-badge__icon {
  font-size: 1.5rem;
}

.reward-badge__text {
  font-size: 0.8125rem;
  font-weight: 700;
  color: #fbbf24;
}

.reward-badge__bonus {
  font-size: 0.75rem;
  font-weight: 600;
  color: #f59e0b;
  opacity: 0.8;
}

@keyframes badgePop {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  60% {
    transform: scale(1.05);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* ── Level up ─────────────────────── */
.reward-levelup {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 10px;
  animation: badgePop 0.5s cubic-bezier(0.16, 1, 0.3, 1) 1s both;
}

.reward-levelup__icon {
  font-size: 1.5rem;
}

.reward-levelup__text {
  font-size: 0.875rem;
  font-weight: 700;
  color: #c7d2fe;
}

/* ── Progress ─────────────────────── */
.reward-progress {
  margin-top: 1rem;
}

.reward-progress__bar {
  height: 4px;
  background: rgba(148, 163, 184, 0.15);
  border-radius: 9999px;
  overflow: hidden;
  margin-bottom: 0.375rem;
}

.reward-progress__fill {
  height: 100%;
  background: linear-gradient(90deg, #6366f1, #06b6d4);
  border-radius: 9999px;
  transition: width 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s;
}

.reward-progress__label {
  font-size: 0.6875rem;
  color: #64748b;
}

/* ── Next article button ──────────── */
.reward-next {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  margin-top: 1.25rem;
  padding: 0.5rem 1.125rem;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: #fff;
  font-size: 0.8125rem;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.2s ease;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
}

.reward-next:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
  background: linear-gradient(135deg, #818cf8, #6366f1);
  color: #fff;
  text-decoration: none;
}

.reward-next svg {
  transition: transform 0.15s ease;
}

.reward-next:hover svg {
  transform: translateX(2px);
}

/* ── Confetti ─────────────────────── */
.confetti-container {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  pointer-events: none;
  z-index: 10;
}

.confetti-particle {
  position: absolute;
  width: var(--size, 6px);
  height: var(--size, 6px);
  background: var(--color, #6366f1);
  border-radius: 1px;
  animation: confettiFall 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) var(--delay, 0s) forwards;
}

@keyframes confettiFall {
  0% {
    opacity: 1;
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(var(--x, 50px), var(--y, -120px)) rotate(var(--r, 360deg)) scale(0.3);
  }
}

/* ── Vue transition ──────────────── */
.reward-enter-active {
  animation: cardAppear 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.reward-leave-active {
  animation: cardAppear 0.3s cubic-bezier(0.7, 0, 0.84, 0) reverse;
}

/* ── Responsive ──────────────────── */
@media (max-width: 480px) {
  .reward-card {
    padding: 1.5rem 1.25rem;
    margin: 0 0.5rem;
  }

  .reward-icon {
    font-size: 2rem;
  }

  .reward-title {
    font-size: 0.9375rem;
  }
}
</style>
