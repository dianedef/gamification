import type { StorageAdapter } from '../types'

export function createStorage(prefix: string): StorageAdapter {
  const prefixedKey = (key: string) => `${prefix}_${key}`

  return {
    get<T>(key: string): T | null {
      if (typeof window === 'undefined') return null
      try {
        const raw = localStorage.getItem(prefixedKey(key))
        return raw ? (JSON.parse(raw) as T) : null
      } catch {
        return null
      }
    },

    set<T>(key: string, value: T): void {
      if (typeof window === 'undefined') return
      try {
        localStorage.setItem(prefixedKey(key), JSON.stringify(value))
      } catch {
        // Storage full or unavailable
      }
    },

    remove(key: string): void {
      if (typeof window === 'undefined') return
      localStorage.removeItem(prefixedKey(key))
    },

    clear(): void {
      if (typeof window === 'undefined') return
      const keysToRemove: string[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key?.startsWith(prefix + '_')) {
          keysToRemove.push(key)
        }
      }
      keysToRemove.forEach((key) => localStorage.removeItem(key))
    },
  }
}
