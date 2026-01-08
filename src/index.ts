/**
 * Arcanea OpenCode
 * 
 * The Weaver's Loom - AI-Powered World-Building Orchestration
 * Built on oh-my-opencode by YeonGyu Kim
 */

export const VERSION = "1.0.0";
export const NAME = "arcanea-opencode";
export const ORCHESTRATOR = "The Weaver";

export interface ArcaneaConfig {
  world?: string;
  enableUltraworld?: boolean;
  enableValidation?: boolean;
  agents?: {
    departments?: string[];
    specialists?: string[];
  };
}

export const defaultConfig: ArcaneaConfig = {
  enableUltraworld: true,
  enableValidation: true,
  agents: {
    departments: [
      "lore-master",
      "world-architect", 
      "character-weaver",
      "magic-systems",
      "narrative-director"
    ],
    specialists: [
      "geography-cartographer",
      "culture-anthropologist",
      "timeline-historian",
      "species-biologist",
      "conflict-dramatist",
      "consistency-validator"
    ]
  }
};

export function getAgentPath(type: "department" | "specialist", name: string): string {
  const folder = type === "department" ? "departments" : "specialists";
  return `.opencode/agents/${folder}/${name}.md`;
}

export function getSkillPath(name: string): string {
  return `.opencode/skills/${name}.md`;
}

export function getCommandPath(name: string): string {
  return `.opencode/commands/${name}.md`;
}
