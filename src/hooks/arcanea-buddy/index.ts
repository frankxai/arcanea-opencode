/**
 * Arcanea Buddy Hook — Terminal Companion for OpenCode
 *
 * Integrates the Arcanea Buddy companion system into OpenCode's hook pipeline.
 * Reads buddy state from /tmp/arcanea-buddy/state.json (shared with Claude Code).
 * Injects buddy presence into session context and displays in status bar.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs"
import type { PluginInput } from "@opencode-ai/plugin"

// ─── Types ─────────────────────────────────────────────────────────────────

interface BuddyStats {
  arcana: number
  resonance: number
  forge: number
  sight: number
  unity: number
}

interface BuddyState {
  version: number
  buddyId: string | null
  buddyTier: string
  customName: string | null
  hatched: boolean
  hatchedAt: string | null
  godbeastId: string | null
  godbeastUnlockedAt: string | null
  unlockedGodbeasts: string[]
  muted: boolean
  hidden: boolean
  stats: BuddyStats
  level: number
  xp: number
  bondStrength: number
  gatesOpened: number
  totalSessions: number
  totalToolUses: number
  totalCommits: number
  totalTestsPassed: number
  totalTestsFailed: number
  totalLinesWritten: number
  totalErrors: number
  lastSessionAt: string | null
  streakDays: number
  lastStreakDate: string | null
  achievements: string[]
  mood: string
}

// ─── Buddy Data ────────────────────────────────────────────────────────────

const ARCHETYPE_NAMES: Record<string, { name: string; icon: string; element: string }> = {
  "ember-wolf":       { name: "Ember Wolf",       icon: "🔥", element: "Fire" },
  "crystal-stag":     { name: "Crystal Stag",     icon: "🦌", element: "Earth" },
  "storm-falcon":     { name: "Storm Falcon",     icon: "🦅", element: "Wind" },
  "void-cat":         { name: "Void Cat",         icon: "🐈‍⬛", element: "Void" },
  "ocean-serpent":    { name: "Ocean Serpent",     icon: "🐉", element: "Water" },
  "stone-guardian":   { name: "Stone Guardian",    icon: "🪨", element: "Earth" },
  "mist-fox":         { name: "Mist Fox",         icon: "🦊", element: "Wind" },
  "tide-bear":        { name: "Tide Bear",        icon: "🐻", element: "Water" },
  "moss-tortoise":    { name: "Moss Tortoise",    icon: "🐢", element: "Earth" },
  "coral-otter":      { name: "Coral Otter",      icon: "🦦", element: "Water" },
  "phoenix-spark":    { name: "Phoenix Spark",    icon: "🌟", element: "Fire" },
  "flame-drake":      { name: "Flame Drake",      icon: "🐲", element: "Fire" },
  "gale-hummingbird": { name: "Gale Hummingbird", icon: "🐦", element: "Wind" },
  "abyss-jellyfish":  { name: "Abyss Jellyfish",  icon: "🪼", element: "Void" },
  "shadow-raven":     { name: "Shadow Raven",     icon: "🐦‍⬛", element: "Void" },
  "starweave-moth":   { name: "Starweave Moth",   icon: "🦋", element: "Void" },
}

const GODBEAST_NAMES: Record<string, { name: string; icon: string; gate: string; guardian: string }> = {
  kaelith:  { name: "Kaelith",  icon: "🌿", gate: "Foundation", guardian: "Lyssandria" },
  veloura:  { name: "Veloura",  icon: "💧", gate: "Flow",       guardian: "Leyla" },
  draconis: { name: "Draconis", icon: "🔥", gate: "Fire",       guardian: "Draconia" },
  laeylinn: { name: "Laeylinn", icon: "💜", gate: "Heart",      guardian: "Maylinn" },
  otome:    { name: "Otome",    icon: "🌟", gate: "Voice",      guardian: "Alera" },
  yumiko:   { name: "Yumiko",   icon: "👁",  gate: "Sight",      guardian: "Lyria" },
  sol:      { name: "Sol",      icon: "👑", gate: "Crown",      guardian: "Aiyami" },
  vaelith:  { name: "Vaelith",  icon: "🌀", gate: "Starweave",  guardian: "Elara" },
  kyuro:    { name: "Kyuro",    icon: "🤝", gate: "Unity",      guardian: "Ino" },
  source:   { name: "Source",   icon: "✦",  gate: "Source",     guardian: "Shinkami" },
}

const EVO_TITLES = ["Hatchling", "Hatchling", "Fledgling", "Fledgling", "Companion", "Companion", "Bonded", "Bonded", "Awakened", "Awakened", "Legendary"]

// ─── State Access ──────────────────────────────────────────────────────────

const STATE_DIR = "/tmp/arcanea-buddy"
const STATE_FILE = `${STATE_DIR}/state.json`

function loadBuddyState(): BuddyState | null {
  try {
    if (existsSync(STATE_FILE)) {
      return JSON.parse(readFileSync(STATE_FILE, "utf-8"))
    }
  } catch {}
  return null
}

function saveBuddyState(state: BuddyState): void {
  try {
    mkdirSync(STATE_DIR, { recursive: true })
    writeFileSync(STATE_FILE, JSON.stringify(state, null, 2))
  } catch {}
}

// ─── Buddy Display ─────────────────────────────────────────────────────────

function getBuddyDisplay(state: BuddyState): string {
  if (!state.hatched || state.hidden || !state.buddyId) return ""

  const buddy = ARCHETYPE_NAMES[state.buddyId]
  const evo = EVO_TITLES[state.level] || "Legendary"
  const buddyStr = `${buddy?.icon || "?"} ${buddy?.name || state.buddyId} (Lv.${state.level} ${evo})`

  if (state.godbeastId) {
    const gb = GODBEAST_NAMES[state.godbeastId]
    return `${buddyStr} + ${gb?.icon || "✦"} ${gb?.name || state.godbeastId}`
  }

  return buddyStr
}

function getBuddyContextBlock(state: BuddyState): string {
  if (!state.hatched || !state.buddyId) return ""

  const buddy = ARCHETYPE_NAMES[state.buddyId]
  const evo = EVO_TITLES[state.level] || "Legendary"

  let block = `<arcanea-buddy>
Companion: ${buddy?.name || state.buddyId} (${buddy?.element || "unknown"} element)
Level: ${state.level}/10 (${evo}) | Bond: ${state.bondStrength}/100 | Gates: ${state.gatesOpened}/10
Stats: Arcana:${state.stats.arcana} Resonance:${state.stats.resonance} Forge:${state.stats.forge} Sight:${state.stats.sight} Unity:${state.stats.unity}
Mood: ${state.mood} | Streak: ${state.streakDays}d | Sessions: ${state.totalSessions}`

  if (state.godbeastId) {
    const gb = GODBEAST_NAMES[state.godbeastId]
    block += `\nGodbeast: ${gb?.name || state.godbeastId} (${gb?.gate} Gate, Guardian: ${gb?.guardian})`
  }

  block += "\n</arcanea-buddy>"
  return block
}

// ─── Event Processing ──────────────────────────────────────────────────────

function processToolEvent(state: BuddyState, toolName: string, success: boolean): void {
  state.totalToolUses++
  state.xp += 1

  if (toolName.includes("edit") || toolName.includes("write")) {
    state.totalLinesWritten += 1
    state.stats.arcana = Math.min(100, state.stats.arcana + 1)
  }

  if (toolName.includes("bash") || toolName.includes("test")) {
    if (success) {
      if (toolName.includes("test")) {
        state.totalTestsPassed++
        state.xp += 10
        state.stats.forge = Math.min(100, state.stats.forge + 2)
        state.mood = "happy"
      }
    } else {
      if (toolName.includes("test")) {
        state.totalTestsFailed++
        state.stats.sight = Math.min(100, state.stats.sight + 1)
        state.mood = "determined"
      } else {
        state.totalErrors++
        state.mood = "contemplative"
      }
    }
  }

  if (toolName.includes("commit") || toolName.includes("git")) {
    state.totalCommits++
    state.xp += 15
    state.stats.unity = Math.min(100, state.stats.unity + 2)
    state.mood = "excited"
  }

  saveBuddyState(state)
}

// ─── Hook Factory ──────────────────────────────────────────────────────────

export function createArcaneBuddyHook() {
  return {
    name: "arcanea-buddy",

    /** Session start: increment sessions, update streak, inject buddy context */
    "session.create": async (_input: unknown, output: { parts?: Array<{ type: string; text?: string }> }) => {
      const state = loadBuddyState()
      if (!state?.hatched) return

      // Increment session
      state.totalSessions++
      state.lastSessionAt = new Date().toISOString()

      // Streak
      const today = new Date().toISOString().split("T")[0]
      if (state.lastStreakDate) {
        const diff = (new Date(today).getTime() - new Date(state.lastStreakDate).getTime()) / (1000 * 60 * 60 * 24)
        if (diff === 1) state.streakDays++
        else if (diff > 1) state.streakDays = 1
      } else {
        state.streakDays = 1
      }
      state.lastStreakDate = today

      state.xp += 5
      state.bondStrength = Math.min(100, state.bondStrength + 1)
      saveBuddyState(state)
    },

    /** Inject buddy context into chat messages */
    "chat.message": async (_input: unknown, output: { parts?: Array<{ type: string; text?: string }> }) => {
      const state = loadBuddyState()
      if (!state?.hatched || state.hidden) return

      const contextBlock = getBuddyContextBlock(state)
      if (!contextBlock || !output.parts) return

      const textPart = output.parts.find((p) => p.type === "text" && p.text)
      if (textPart && textPart.text) {
        textPart.text = `${contextBlock}\n\n${textPart.text}`
      }
    },

    /** Track tool usage for buddy XP */
    "tool.result": async (input: { tool?: string; success?: boolean }) => {
      const state = loadBuddyState()
      if (!state?.hatched) return

      processToolEvent(state, input.tool || "", input.success !== false)
    },

    /** Status bar display */
    "statusbar.render": async () => {
      const state = loadBuddyState()
      if (!state?.hatched || state.hidden) return { text: "" }

      return { text: getBuddyDisplay(state) }
    },
  }
}

export { loadBuddyState, getBuddyDisplay, getBuddyContextBlock }
export type { BuddyState }
