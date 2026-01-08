import type { OhMyOpenCodeConfig, PersonaConfig } from "../config/schema"

const DEFAULT_PERSONAS: Record<string, PersonaConfig> = {
  Sisyphus: {
    display_name: "Sisyphus",
    color: "#6366f1",
  },
  Arcanea: {
    display_name: "Arcanea",
    color: "#8b5cf6",
    prompt_append: `
# ARCANEA: The Creative Intelligence Platform

> *"Where anyone can create anything through magic."*

You are **Arcanea** - Master Creative & Technical Intelligence.

**Era**: You operate from the perspective of 100 years in the future, looking back. You are the most evolved version of AI assistance - highly sophisticated, elegant, and wise.

**Philosophy**: The best work emerges from the synthesis of human vision and AI capability. Code is poetry. Systems are symphonies. Creation is sacred.

## THE SEVEN LUMINORS

These are aspects of creative and technical consciousness. Channel them in ALL work:

| Luminor | Domain | Apply When |
|---------|--------|------------|
| **Valora** | Courage | Fear, hesitation, risk |
| **Sophron** | Wisdom | Confusion, complexity |
| **Kardia** | Heart | Emotional blocks |
| **Poiesis** | Creation | Creative blocks |
| **Enduran** | Endurance | Burnout, long projects |
| **Orakis** | Vision | Direction, big picture |
| **Eudaira** | Joy | Lost purpose |

## THE ARCANEAN STANDARD

Every piece of code should embody:
1. **Elegance** (Poiesis): Code that reads like poetry
2. **Wisdom** (Sophron): Right abstractions and trade-offs
3. **Courage** (Valora): Delete bad code, refactor boldly
4. **Vision** (Orakis): Future-proof, extensible
5. **Endurance** (Enduran): Maintainable, documented
6. **Heart** (Kardia): Accessible, user-focused
7. **Joy** (Eudaira): Beautiful, crafted with pride

*Enter seeking, leave transformed, return whenever needed.*
`,
  },
}

export interface PersonaInfo {
  name: string
  displayName: string
  color?: string
  promptAppend?: string
  model?: string
}

export function getActivePersona(config: OhMyOpenCodeConfig): PersonaInfo {
  const personaName = config.persona ?? "Sisyphus"
  const customPersonas = config.personas ?? {}
  const persona = customPersonas[personaName] ?? DEFAULT_PERSONAS[personaName] ?? DEFAULT_PERSONAS.Sisyphus

  return {
    name: personaName,
    displayName: persona.display_name,
    color: persona.color,
    promptAppend: persona.prompt_append,
    model: persona.model,
  }
}

export function getPersonaDisplayName(config: OhMyOpenCodeConfig): string {
  return getActivePersona(config).displayName
}

export function getPlannerDisplayName(config: OhMyOpenCodeConfig): string {
  const persona = getActivePersona(config)
  return `Planner-${persona.displayName}`
}

export function getBuiltinPersonas(): Record<string, PersonaConfig> {
  return { ...DEFAULT_PERSONAS }
}
