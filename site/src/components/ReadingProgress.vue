<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { markArticleRead } from '../lib/reading-tracker';

const props = defineProps<{
  slug?: string;
  title?: string;
}>();

const progress = ref(0);
const markedRead = ref(false);
const showToast = ref(false);
const toastFading = ref(false);

function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (docHeight <= 0) {
    progress.value = 100;
    return;
  }

  progress.value = Math.min(100, Math.round((scrollTop / docHeight) * 100));

  // Mark as read at 80%
  if (progress.value >= 80 && !markedRead.value) {
    markedRead.value = true;
    const slug = props.slug || window.location.pathname.replace(/^\/|\/$/g, '');
    const result = markArticleRead(slug);

    if (!result.alreadyRead) {
      // Show toast
      showToast.value = true;

      // Notify other components (GamificationBar)
      window.dispatchEvent(new CustomEvent('gamification:article-read'));

      // Fade out toast after 3 seconds
      setTimeout(() => {
        toastFading.value = true;
        setTimeout(() => {
          showToast.value = false;
          toastFading.value = false;
        }, 400);
      }, 3000);
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress);
});
</script>

<template>
  <div>
    <!-- Progress bar at top of page -->
    <div
      class="reading-progress"
      role="progressbar"
      :aria-valuenow="progress"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-label="`Progression de lecture : ${progress}%`"
    >
      <div class="reading-progress__bar" :style="{ width: progress + '%' }"></div>
    </div>

    <!-- Toast notification -->
    <Transition name="toast">
      <div
        v-if="showToast"
        class="read-toast"
        :class="{ 'read-toast--fading': toastFading }"
        role="status"
        aria-live="polite"
      >
        <span class="read-toast__icon">&#10003;</span>
        <span class="read-toast__text">Article lu</span>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  z-index: 9999;
  background: rgba(148, 163, 184, 0.08);
  pointer-events: none;
}

.reading-progress__bar {
  height: 100%;
  background: linear-gradient(90deg, #7c3aed, #818cf8, #06b6d4);
  box-shadow: 0 0 10px rgba(124, 58, 237, 0.35),
    0 0 4px rgba(6, 182, 212, 0.25);
  transition: width 120ms ease-out;
  border-radius: 0 2px 2px 0;
}

/* ── Toast ────────────────────────── */
.read-toast {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 10000;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(
    135deg,
    rgba(15, 23, 42, 0.94) 0%,
    rgba(30, 27, 75, 0.94) 100%
  );
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4),
    0 0 12px rgba(99, 102, 241, 0.15);
  animation: toastIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  font-family: var(--font-sans, 'Inter', system-ui, sans-serif);
}

.read-toast--fading {
  animation: toastOut 0.4s cubic-bezier(0.7, 0, 0.84, 0) forwards;
}

.read-toast__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #10b981, #059669);
  border-radius: 50%;
  font-size: 0.625rem;
  font-weight: 800;
  color: #fff;
}

.read-toast__text {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #e2e8f0;
}

@keyframes toastIn {
  from {
    opacity: 0;
    transform: translateY(-12px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes toastOut {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(-8px) scale(0.96);
  }
}

/* Vue transition classes */
.toast-enter-active {
  animation: toastIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-leave-active {
  animation: toastOut 0.4s cubic-bezier(0.7, 0, 0.84, 0);
}
</style>
