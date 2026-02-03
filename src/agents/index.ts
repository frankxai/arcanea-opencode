export * from "./types"
export { createBuiltinAgents } from "./utils"
export type { AvailableAgent, AvailableCategory, AvailableSkill } from "./dynamic-agent-prompt-builder"

// Starlight - The Lumina-Nero Orchestration Engine (primary orchestrator)
export { createStarlightAgent, createSisyphusAgent } from "./starlight"

// Starlight-Apprentice - Focused executor (subagent)
export {
  createStarlightApprenticeAgentWithOverrides,
  createSisyphusJuniorAgentWithOverrides,
  STARLIGHT_APPRENTICE_DEFAULTS,
  SISYPHUS_JUNIOR_DEFAULTS
} from "./starlight-apprentice"

// Oracle - Vision and architecture guidance
export { createOracleAgent, ORACLE_PROMPT_METADATA } from "./oracle"

// Research agents
export { createLibrarianAgent, LIBRARIAN_PROMPT_METADATA } from "./librarian"
export { createExploreAgent, EXPLORE_PROMPT_METADATA } from "./explore"

// Specialized agents
export { createMultimodalLookerAgent, MULTIMODAL_LOOKER_PROMPT_METADATA } from "./multimodal-looker"
export { createMetisAgent, METIS_SYSTEM_PROMPT, metisPromptMetadata } from "./metis"
export { createMomusAgent, MOMUS_SYSTEM_PROMPT, momusPromptMetadata } from "./momus"
export { createAtlasAgent, atlasPromptMetadata } from "./atlas"
