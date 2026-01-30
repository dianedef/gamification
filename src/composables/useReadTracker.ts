import { ref, computed, type Ref, type ComputedRef } from 'vue'
import type { StorageAdapter } from '../types'

export interface UseReadTrackerReturn {
  articlesRead: Ref<string[]>
  totalRead: ComputedRef<number>
  readByCategory: ComputedRef<Record<string, string[]>>
  markAsRead: (slug: string, category?: string) => void
  isRead: (slug: string) => boolean
}

interface ReadEntry {
  slug: string
  category?: string
  date: string
}

export function useReadTracker(options: {
  storage: StorageAdapter
  storageKey?: string
}): UseReadTrackerReturn {
  const { storage, storageKey = 'reads' } = options

  const entries = ref<ReadEntry[]>(storage.get<ReadEntry[]>(storageKey) ?? [])

  const articlesRead = computed(() => entries.value.map((e) => e.slug))

  const totalRead = computed(() => entries.value.length)

  const readByCategory = computed(() => {
    const map: Record<string, string[]> = {}
    for (const entry of entries.value) {
      const cat = entry.category ?? '_uncategorized'
      if (!map[cat]) map[cat] = []
      map[cat].push(entry.slug)
    }
    return map
  })

  function persist() {
    storage.set(storageKey, entries.value)
  }

  function markAsRead(slug: string, category?: string): void {
    if (entries.value.some((e) => e.slug === slug)) return
    entries.value.push({
      slug,
      category,
      date: new Date().toISOString(),
    })
    persist()
  }

  function isRead(slug: string): boolean {
    return entries.value.some((e) => e.slug === slug)
  }

  return {
    articlesRead,
    totalRead,
    readByCategory,
    markAsRead,
    isRead,
  }
}
