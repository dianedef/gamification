import { computed, type ComputedRef } from 'vue'
import type { ProgressEntry } from '../types'

export interface UseProgressReturn {
  byCategory: ComputedRef<Record<string, ProgressEntry>>
  overall: ComputedRef<ProgressEntry>
}

export function useProgress(options: {
  categories: Record<string, string[]>
  getArticlesRead: () => string[]
}): UseProgressReturn {
  const { categories, getArticlesRead } = options

  const byCategory = computed(() => {
    const articlesRead = getArticlesRead()
    const result: Record<string, ProgressEntry> = {}

    for (const [cat, slugs] of Object.entries(categories)) {
      const total = slugs.length
      const read = slugs.filter((s) => articlesRead.includes(s)).length
      result[cat] = {
        read,
        total,
        percent: total > 0 ? Math.round((read / total) * 100) : 0,
      }
    }

    return result
  })

  const overall = computed(() => {
    const allSlugs = new Set(Object.values(categories).flat())
    const articlesRead = getArticlesRead()
    const total = allSlugs.size
    const read = [...allSlugs].filter((s) => articlesRead.includes(s)).length
    return {
      read,
      total,
      percent: total > 0 ? Math.round((read / total) * 100) : 0,
    }
  })

  return { byCategory, overall }
}
