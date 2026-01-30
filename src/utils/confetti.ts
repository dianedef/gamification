type ConfettiFunction = (options?: Record<string, unknown>) => Promise<null>

let confettiModule: ConfettiFunction | null = null

async function getConfetti(): Promise<ConfettiFunction | null> {
  if (confettiModule) return confettiModule
  try {
    const mod = await import('canvas-confetti')
    confettiModule = mod.default as unknown as ConfettiFunction
    return confettiModule
  } catch {
    return null
  }
}

export async function fireConfetti(options?: Record<string, unknown>): Promise<void> {
  const confetti = await getConfetti()
  if (!confetti) return
  await confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    ...options,
  })
}

export async function fireBadgeConfetti(element?: HTMLElement): Promise<void> {
  const confetti = await getConfetti()
  if (!confetti) return

  let origin = { x: 0.5, y: 0.5 }
  if (element) {
    const rect = element.getBoundingClientRect()
    origin = {
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height / 2) / window.innerHeight,
    }
  }

  await confetti({
    particleCount: 60,
    spread: 55,
    origin,
    colors: ['#FFD700', '#FF6347', '#32CD32', '#9370DB', '#FF69B4'],
  })
}
