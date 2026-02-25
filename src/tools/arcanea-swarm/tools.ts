/**
 * Arcanea Swarm Tools - OpenCode Tool Definitions
 *
 * Uses the proper OpenCode tool format with execute functions
 */

import { tool, type ToolDefinition } from "@opencode-ai/plugin/tool";
import {
  GUARDIAN_GATES,
  routeTaskToGuardian,
  simulateConsensus,
} from "./index";

/**
 * List all 10 Arcanea Guardians
 */
export const arcanea_guardians: ToolDefinition = tool({
  description:
    "List all 10 Arcanea Guardians with their gates, frequencies, and domains",
  args: {},
  execute: async () => {
    const result = Object.entries(GUARDIAN_GATES).map(([gate, g]) => ({
      gate: Number(gate),
      name: g.name,
      frequency: g.frequency,
      element: g.element,
      domain: g.domain,
    }));
    return JSON.stringify(result, null, 2);
  },
});

/**
 * Get Guardian by gate number
 */
export const arcanea_guardian_by_gate: ToolDefinition = tool({
  description:
    "Get information about a specific Guardian by gate number (1-10)",
  args: {
    gate: tool.schema.number().min(1).max(10).describe("Gate number (1-10)"),
  },
  execute: async (args) => {
    const g = GUARDIAN_GATES[args.gate as keyof typeof GUARDIAN_GATES];
    if (!g)
      return JSON.stringify({ error: `Invalid gate: ${args.gate}. Use 1-10.` });
    return JSON.stringify(g);
  },
});

/**
 * Route task to appropriate Guardian
 */
export const arcanea_route_task: ToolDefinition = tool({
  description: "Route a task to the appropriate Guardian based on task type",
  args: {
    task: tool.schema.string().describe("The task description"),
  },
  execute: async (args) => {
    const result = routeTaskToGuardian(args.task);
    return JSON.stringify(result);
  },
});

/**
 * Simulate Guardian consensus
 */
export const arcanea_swarm_consensus: ToolDefinition = tool({
  description: "Simulate Guardian consensus for a decision",
  args: {
    decision: tool.schema.string().describe("The decision to evaluate"),
    guardians: tool.schema
      .array(tool.schema.number())
      .optional()
      .describe("Gate numbers to include (default: all 10)"),
  },
  execute: async (args) => {
    const result = simulateConsensus(args.decision, args.guardians);
    return JSON.stringify(result);
  },
});

/**
 * Export all tools
 */
export const tools = {
  arcanea_guardians,
  arcanea_guardian_by_gate,
  arcanea_route_task,
  arcanea_swarm_consensus,
};
