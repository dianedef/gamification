// reading-tracker.ts — Pure TypeScript reading state manager (no Vue dependency)
// Persists to localStorage. Designed for the gamification knowledge base site.

const STORAGE_KEY = 'gamification-kb-reading-state';

export interface ReadingState {
  articlesRead: string[];
  streak: { current: number; longest: number; lastVisitDate: string | null };
  totalXP: number;
  firstVisitDate: string;
  sectionsCompleted: string[];
}

export interface LevelInfo {
  level: number;
  name: string;
  icon: string;
  progress: number;
  articlesForNext: number;
  articlesInLevel: number;
}

export interface MarkResult {
  xpGained: number;
  sectionCompleted: boolean;
  sectionName: string | null;
  levelUp: boolean;
  newLevel: LevelInfo | null;
  alreadyRead: boolean;
}

export interface SectionProgress {
  read: number;
  total: number;
  percent: number;
}

export interface AllProgress {
  total: number;
  read: number;
  percent: number;
}

// Section definitions: slug prefix -> article count
const SECTION_COUNTS: Record<string, number> = {
  comprendre: 5,
  concevoir: 3,
  creer: 4,
  valider: 2,
  humain: 5,
  outils: 3,
};

const SECTION_LABELS: Record<string, string> = {
  comprendre: 'Comprendre',
  concevoir: 'Concevoir',
  creer: 'Créer',
  valider: 'Valider',
  humain: "L'humain",
  outils: 'Outils',
};

// Total articles: 5+3+4+2+5+3 = 22
const TOTAL_ARTICLES = 22;

// Level thresholds
const LEVELS: { min: number; max: number; name: string; icon: string }[] = [
  { min: 0, max: 3, name: 'Curieux', icon: '\u{1F331}' },
  { min: 4, max: 8, name: 'Apprenti', icon: '\u{1F4DA}' },
  { min: 9, max: 14, name: 'Initie', icon: '\u{1F3AF}' },
  { min: 15, max: 19, name: 'Expert', icon: '\u26A1' },
  { min: 20, max: 22, name: 'Maitre', icon: '\u{1F451}' },
];

// Long articles (those that give +20 XP instead of +10)
const LONG_ARTICLES = [
  'comprendre/neurosciences',
  'comprendre/techniques-avancees',
  'concevoir/etudes-de-cas',
  'creer/implementation',
  'humain/utilisateur-personne',
];

function todayString(): string {
  return new Date().toISOString().split('T')[0];
}

function defaultState(): ReadingState {
  return {
    articlesRead: [],
    streak: { current: 0, longest: 0, lastVisitDate: null },
    totalXP: 0,
    firstVisitDate: todayString(),
    sectionsCompleted: [],
  };
}

function loadState(): ReadingState {
  if (typeof window === 'undefined') return defaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as Partial<ReadingState>;
    return {
      articlesRead: parsed.articlesRead ?? [],
      streak: {
        current: parsed.streak?.current ?? 0,
        longest: parsed.streak?.longest ?? 0,
        lastVisitDate: parsed.streak?.lastVisitDate ?? null,
      },
      totalXP: parsed.totalXP ?? 0,
      firstVisitDate: parsed.firstVisitDate ?? todayString(),
      sectionsCompleted: parsed.sectionsCompleted ?? [],
    };
  } catch {
    return defaultState();
  }
}

function saveState(state: ReadingState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or unavailable — silently fail
  }
}

/** Normalize a slug: strip leading/trailing slashes */
function normalizeSlug(slug: string): string {
  return slug.replace(/^\/+|\/+$/g, '');
}

/** Get the section from a slug (first path segment) */
function sectionFromSlug(slug: string): string {
  return normalizeSlug(slug).split('/')[0];
}

// ─── Public API ──────────────────────────────────────────────────────────────

export function getState(): ReadingState {
  return loadState();
}

export function markArticleRead(slug: string, section?: string): MarkResult {
  const normalizedSlug = normalizeSlug(slug);
  const state = loadState();
  const resolvedSection = section ?? sectionFromSlug(normalizedSlug);

  // Already read?
  if (state.articlesRead.includes(normalizedSlug)) {
    return {
      xpGained: 0,
      sectionCompleted: false,
      sectionName: null,
      levelUp: false,
      newLevel: null,
      alreadyRead: true,
    };
  }

  const previousLevel = getLevelFromCount(state.articlesRead.length);

  // Add article
  state.articlesRead.push(normalizedSlug);

  // Calculate XP
  const isLong = LONG_ARTICLES.includes(normalizedSlug);
  const xp = isLong ? 20 : 10;
  state.totalXP += xp;

  // Check section completion
  let sectionCompleted = false;
  let sectionName: string | null = null;
  if (resolvedSection && SECTION_COUNTS[resolvedSection]) {
    const sectionArticles = state.articlesRead.filter(
      (s) => sectionFromSlug(s) === resolvedSection,
    );
    if (
      sectionArticles.length >= SECTION_COUNTS[resolvedSection] &&
      !state.sectionsCompleted.includes(resolvedSection)
    ) {
      state.sectionsCompleted.push(resolvedSection);
      sectionCompleted = true;
      sectionName = SECTION_LABELS[resolvedSection] ?? resolvedSection;
      state.totalXP += 50; // Section completion bonus
    }
  }

  // Check level up
  const newLevel = getLevelFromCount(state.articlesRead.length);
  const levelUp = newLevel.level > previousLevel.level;

  saveState(state);

  return {
    xpGained: xp + (sectionCompleted ? 50 : 0),
    sectionCompleted,
    sectionName,
    levelUp,
    newLevel: levelUp ? newLevel : null,
    alreadyRead: false,
  };
}

export function updateStreak(): { current: number; longest: number } {
  const state = loadState();
  const today = todayString();

  if (state.streak.lastVisitDate === today) {
    // Already visited today
    return { current: state.streak.current, longest: state.streak.longest };
  }

  if (state.streak.lastVisitDate === null) {
    // First visit ever
    state.streak.current = 1;
    state.streak.longest = 1;
    state.streak.lastVisitDate = today;
    saveState(state);
    return { current: 1, longest: 1 };
  }

  // Check if yesterday
  const lastDate = new Date(state.streak.lastVisitDate + 'T00:00:00');
  const todayDate = new Date(today + 'T00:00:00');
  const diffDays = Math.floor(
    (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays === 1) {
    // Consecutive day
    state.streak.current += 1;
  } else {
    // Streak broken
    state.streak.current = 1;
  }

  state.streak.longest = Math.max(state.streak.longest, state.streak.current);
  state.streak.lastVisitDate = today;
  saveState(state);

  return { current: state.streak.current, longest: state.streak.longest };
}

function getLevelFromCount(articleCount: number): LevelInfo {
  let matched = LEVELS[0];
  for (const lvl of LEVELS) {
    if (articleCount >= lvl.min) {
      matched = lvl;
    }
  }

  const levelIndex = LEVELS.indexOf(matched);
  const articlesInLevel = matched.max - matched.min + 1;
  const articlesIntoLevel = Math.min(
    articleCount - matched.min,
    articlesInLevel,
  );
  const progress =
    articleCount >= matched.max
      ? 1
      : articlesIntoLevel / articlesInLevel;
  const articlesForNext =
    levelIndex < LEVELS.length - 1
      ? LEVELS[levelIndex + 1].min - articleCount
      : 0;

  return {
    level: levelIndex + 1,
    name: matched.name,
    icon: matched.icon,
    progress: Math.min(1, Math.max(0, progress)),
    articlesForNext,
    articlesInLevel,
  };
}

export function getLevel(): LevelInfo {
  const state = loadState();
  return getLevelFromCount(state.articlesRead.length);
}

export function getSectionProgress(section: string): SectionProgress {
  const state = loadState();
  const total = SECTION_COUNTS[section] ?? 0;
  const read = state.articlesRead.filter(
    (s) => sectionFromSlug(s) === section,
  ).length;
  return {
    read,
    total,
    percent: total > 0 ? Math.round((read / total) * 100) : 0,
  };
}

export function getAllProgress(): AllProgress {
  const state = loadState();
  return {
    total: TOTAL_ARTICLES,
    read: state.articlesRead.length,
    percent: Math.round((state.articlesRead.length / TOTAL_ARTICLES) * 100),
  };
}

export function getSectionLabels(): Record<string, string> {
  return { ...SECTION_LABELS };
}

export function getSectionCounts(): Record<string, number> {
  return { ...SECTION_COUNTS };
}

export function resetState(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
