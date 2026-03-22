import {
  accueilSidebar,
  comprendreSidebar,
  concevoirSidebar,
  creerSidebar,
  validerSidebar,
  humainSidebar,
  outilsSidebar,
} from '../config/navigation';

export interface NavLink {
  label: string;
  link: string;
}

export interface NavGroup {
  label: string;
  collapsed?: boolean;
  items: NavEntry[];
}

export type NavEntry = NavLink | NavGroup;

export interface SidebarDefinition {
  id: string;
  sidebar: NavGroup;
}

export interface NavOverride {
  label?: string;
  link: string;
}

export interface PrevNextLinks {
  prev: NavLink | null;
  next: NavLink | null;
}

export const sidebars: SidebarDefinition[] = [
  { id: 'comprendre', sidebar: comprendreSidebar as NavGroup },
  { id: 'concevoir', sidebar: concevoirSidebar as NavGroup },
  { id: 'creer', sidebar: creerSidebar as NavGroup },
  { id: 'valider', sidebar: validerSidebar as NavGroup },
  { id: 'humain', sidebar: humainSidebar as NavGroup },
  { id: 'outils', sidebar: outilsSidebar as NavGroup },
  { id: 'accueil', sidebar: accueilSidebar as NavGroup },
];

const matchingPriority = [
  'comprendre',
  'concevoir',
  'creer',
  'valider',
  'humain',
  'outils',
  'accueil',
];

export const headerNavigation = [
  { label: 'Accueil', href: '/', sidebarId: 'accueil' },
  { label: 'Comprendre', href: '/comprendre/neurosciences', sidebarId: 'comprendre' },
  { label: 'Concevoir', href: '/concevoir/frameworks', sidebarId: 'concevoir' },
  { label: 'Créer', href: '/creer/copywriting', sidebarId: 'creer' },
  { label: 'Valider', href: '/valider/metriques', sidebarId: 'valider' },
  { label: "L'humain", href: '/humain/utilisateur-personne', sidebarId: 'humain' },
  { label: 'Outils', href: '/outils/prompts-ia', sidebarId: 'outils' },
];

function trimTrailingSlash(path: string) {
  if (path === '/') {
    return '/';
  }

  return path.replace(/\/+$/, '');
}

export function normalizePath(path: string) {
  if (!path) {
    return '/';
  }

  const withoutOrigin = path.replace(/^https?:\/\/[^/]+/u, '');
  const withSlash = withoutOrigin.startsWith('/') ? withoutOrigin : `/${withoutOrigin}`;

  return trimTrailingSlash(withSlash);
}

export function isNavLink(entry: NavEntry): entry is NavLink {
  return 'link' in entry;
}

export function flattenLinks(items: NavEntry[]) {
  const links: NavLink[] = [];
  const seen = new Set<string>();

  const walk = (nodes: NavEntry[]) => {
    for (const node of nodes) {
      if (isNavLink(node)) {
        const key = normalizePath(node.link);
        if (!seen.has(key)) {
          seen.add(key);
          links.push(node);
        }
        continue;
      }

      walk(node.items);
    }
  };

  walk(items);

  return links;
}

function matchScore(currentPath: string, link: string) {
  const current = normalizePath(currentPath);
  const candidate = normalizePath(link);

  if (current === candidate) {
    return 10000 + candidate.length;
  }

  if (candidate !== '/' && current.startsWith(`${candidate}/`)) {
    return candidate.length;
  }

  if (candidate === '/' && current === '/') {
    return 9999;
  }

  return -1;
}

export function findSidebarForPath(path: string) {
  const current = normalizePath(path);
  let bestMatch: (SidebarDefinition & { score: number }) | null = null;

  for (const sidebarId of matchingPriority) {
    const definition = sidebars.find((entry) => entry.id === sidebarId);

    if (!definition) {
      continue;
    }

    const score = Math.max(
      ...flattenLinks(definition.sidebar.items).map((link) => matchScore(current, link.link)),
      -1,
    );

    if (score < 0) {
      continue;
    }

    if (!bestMatch || score > bestMatch.score) {
      bestMatch = { ...definition, score };
    }
  }

  return bestMatch;
}

export function groupHasCurrentPath(group: NavGroup, currentPath: string): boolean {
  return group.items.some((item) => entryHasCurrentPath(item, currentPath));
}

export function entryHasCurrentPath(entry: NavEntry, currentPath: string): boolean {
  if (isNavLink(entry)) {
    return matchScore(currentPath, entry.link) >= 0;
  }

  return groupHasCurrentPath(entry, currentPath);
}

export function isCurrentPath(link: string, currentPath: string) {
  return normalizePath(link) === normalizePath(currentPath);
}

export function docPathFromEntryId(id: string) {
  const slug = id.replace(/\.(md|mdx)$/u, '');

  if (slug === 'index') {
    return '/';
  }

  if (slug.endsWith('/index')) {
    return `/${slug.slice(0, -'/index'.length)}/`;
  }

  return `/${slug}`;
}

export function slugParamFromEntryId(id: string) {
  const path = docPathFromEntryId(id);

  if (path === '/') {
    return undefined;
  }

  return normalizePath(path).slice(1);
}

export function resolvePrevNext(
  currentPath: string,
  overrides: {
    prev?: false | NavOverride;
    next?: false | NavOverride;
  } = {},
): PrevNextLinks {
  const sidebarMatch = findSidebarForPath(currentPath);
  const links = sidebarMatch ? flattenLinks(sidebarMatch.sidebar.items) : [];
  const index = links.findIndex((link) => isCurrentPath(link.link, currentPath));

  const autoPrev = index > 0 ? links[index - 1] : null;
  const autoNext = index >= 0 ? links[index + 1] ?? null : null;

  return {
    prev:
      overrides.prev === false
        ? null
        : overrides.prev
          ? { label: overrides.prev.label ?? 'Page précédente', link: overrides.prev.link }
          : autoPrev,
    next:
      overrides.next === false
        ? null
        : overrides.next
          ? { label: overrides.next.label ?? 'Page suivante', link: overrides.next.link }
          : autoNext,
  };
}

export function pageTitle(title: string) {
  return title.includes('Gamification') ? title : `${title} | Gamification`;
}
