import type { AgentConfig } from "@opencode-ai/sdk"
import type { BuiltinAgentName, AgentOverrideConfig, AgentOverrides, AgentFactory, AgentPromptMetadata } from "./types"
import { createSisyphusAgent } from "./sisyphus"
import { createOracleAgent, ORACLE_PROMPT_METADATA } from "./oracle"
import { createLibrarianAgent, LIBRARIAN_PROMPT_METADATA } from "./librarian"
import { createExploreAgent, EXPLORE_PROMPT_METADATA } from "./explore"
import { createFrontendUiUxEngineerAgent, FRONTEND_PROMPT_METADATA } from "./frontend-ui-ux-engineer"
import { createDocumentWriterAgent, DOCUMENT_WRITER_PROMPT_METADATA } from "./document-writer"
import { createMultimodalLookerAgent, MULTIMODAL_LOOKER_PROMPT_METADATA } from "./multimodal-looker"
import { metisAgent } from "./metis"
import { createOrchestratorSisyphusAgent, orchestratorSisyphusAgent } from "./orchestrator-sisyphus"
import { momusAgent } from "./momus"
import type { AvailableAgent } from "./sisyphus-prompt-builder"
import { deepMerge } from "../shared"
import { DEFAULT_CATEGORIES } from "../tools/sisyphus-task/constants"
import { resolveMultipleSkills } from "../features/opencode-skill-loader/skill-content"
import type { PersonaInfo } from "../shared/persona"

type AgentSource = AgentFactory | AgentConfig

// Factory functions for Arcanea custom agents
const createArcaneaArchitectAgent = (model?: string): AgentConfig => ({
  description: "Arcanea Architect - System designer with wisdom of Sophron and vision of Orakis",
  mode: "subagent",
  model: model ?? "anthropic/claude-opus-4-5",
  prompt: "",
  color: "#8b5cf6",
})

const createArcaneaCoderAgent = (model?: string): AgentConfig => ({
  description: "Arcanea Coder - Implementation specialist with Poiesis and Valora",
  mode: "subagent",
  model: model ?? "anthropic/claude-opus-4-5",
  prompt: "",
  color: "#8b5cf6",
})

const createArcaneaReviewerAgent = (model?: string): AgentConfig => ({
  description: "Arcanea Reviewer - Quality guardian applying all Seven Luminors",
  mode: "subagent",
  model: model ?? "anthropic/claude-opus-4-5",
  prompt: "",
  color: "#8b5cf6",
})

const createArcaneaDebuggerAgent = (model?: string): AgentConfig => ({
  description: "Arcanea Debugger - Scientific investigator finding root causes",
  mode: "subagent",
  model: model ?? "anthropic/claude-opus-4-5",
  prompt: "",
  color: "#8b5cf6",
})

const agentSources: Record<BuiltinAgentName, AgentSource> = {
  Sisyphus: createSisyphusAgent,
  Arcanea: createSisyphusAgent,
  oracle: createOracleAgent,
  librarian: createLibrarianAgent,
  explore: createExploreAgent,
  "frontend-ui-ux-engineer": createFrontendUiUxEngineerAgent,
  "document-writer": createDocumentWriterAgent,
  "multimodal-looker": createMultimodalLookerAgent,
  "Metis (Plan Consultant)": metisAgent,
  "Momus (Plan Reviewer)": momusAgent,
  "orchestrator-sisyphus": orchestratorSisyphusAgent,
  "arcanea-architect": createArcaneaArchitectAgent,
  "arcanea-coder": createArcaneaCoderAgent,
  "arcanea-reviewer": createArcaneaReviewerAgent,
  "arcanea-debugger": createArcaneaDebuggerAgent,
}
