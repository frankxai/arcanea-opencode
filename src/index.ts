export const VERSION = "2.0.0";
export const NAME = "arcanea-opencode";
export const ORCHESTRATOR = "Arcanea";

export interface ArcaneaConfig {
  world?: string;
  enableUltraworld?: boolean;
  enableUltrawrite?: boolean;
  enableUltrabook?: boolean;
  enableValidation?: boolean;
  enableVisuals?: boolean;
  enableMusic?: boolean;
  agents?: {
    worldBuilding?: string[];
    writingEditing?: string[];
    production?: string[];
    research?: string[];
  };
  mcp?: {
    nanoBanana?: boolean;
    suno?: boolean;
    context7?: boolean;
  };
  claudeCode?: {
    enabled?: boolean;
    copyAgents?: boolean;
    copySkills?: boolean;
    copyCommands?: boolean;
  };
}

export const defaultConfig: ArcaneaConfig = {
  enableUltraworld: true,
  enableUltrawrite: true,
  enableUltrabook: true,
  enableValidation: true,
  enableVisuals: true,
  enableMusic: true,
  agents: {
    worldBuilding: [
      "lore-master",
      "world-architect",
      "archmage",
      "character-creator",
      "narrative-director",
      "geography-cartographer",
      "culture-anthropologist",
      "timeline-historian",
      "species-biologist",
      "conflict-dramatist",
      "consistency-validator"
    ],
    writingEditing: [
      "story-architect",
      "prose-weaver",
      "voice-alchemist",
      "line-editor",
      "continuity-guardian"
    ],
    production: [
      "visual-director",
      "sound-designer",
      "format-master"
    ],
    research: [
      "sage",
      "archivist",
      "scout",
      "muse"
    ]
  },
  mcp: {
    nanoBanana: true,
    suno: true,
    context7: true
  },
  claudeCode: {
    enabled: true,
    copyAgents: true,
    copySkills: true,
    copyCommands: true
  }
};

export const MAGIC_WORDS = {
  ultraworld: ["ultraworld", "ulw"],
  ultrawrite: ["ultrawrite", "ulwr"],
  ultrabook: ["ultrabook", "ulb"]
};

export const AGENT_TEAMS = {
  worldBuilding: {
    name: "World Building",
    description: "Agents for creating rich, consistent fantasy worlds",
    departments: ["lore-master", "world-architect", "archmage", "character-creator", "narrative-director"],
    specialists: ["geography-cartographer", "culture-anthropologist", "timeline-historian", "species-biologist", "conflict-dramatist", "consistency-validator"]
  },
  writingEditing: {
    name: "Writing & Editing",
    description: "Agents for crafting and polishing prose",
    agents: ["story-architect", "prose-weaver", "voice-alchemist", "line-editor", "continuity-guardian"]
  },
  production: {
    name: "Production",
    description: "Agents for visual, audio, and publishing",
    agents: ["visual-director", "sound-designer", "format-master"]
  },
  research: {
    name: "Research & Reference",
    description: "Agents for deep thinking and external research",
    agents: ["sage", "archivist", "scout", "muse"]
  }
};

export function getAgentPath(team: keyof typeof AGENT_TEAMS, name: string): string {
  return `.opencode/agents/${team}/${name}.md`;
}

export function getSkillPath(name: string): string {
  return `.opencode/skills/${name}.md`;
}

export function getCommandPath(name: string): string {
  return `.opencode/commands/${name}.md`;
}

export function getClaudeCodePath(type: "agents" | "skills" | "commands", name: string): string {
  return `.claude/${type}/${name}.md`;
}

export { install } from "./install.js";
