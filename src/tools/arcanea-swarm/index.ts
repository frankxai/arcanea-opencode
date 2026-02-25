/**
 * Arcanea Swarm Tools
 *
 * OpenCode tools for invoking Guardian swarm orchestration
 * These are local tools that don't require external MCP servers
 */

import type { AgentConfig } from "@opencode-ai/sdk";

/**
 * Guardian Gate Mapping - Arcanea Canon
 */
export const GUARDIAN_GATES = {
  1: {
    name: "lyssandria",
    frequency: 174,
    element: "Earth",
    domain: "Foundation",
  },
  2: { name: "leyla", frequency: 285, element: "Water", domain: "Flow" },
  3: { name: "draconia", frequency: 396, element: "Fire", domain: "Power" },
  4: { name: "maylinn", frequency: 417, element: "Wind", domain: "Heart" },
  5: { name: "alera", frequency: 528, element: "Fire/Wind", domain: "Voice" },
  6: { name: "lyria", frequency: 639, element: "Water/Void", domain: "Sight" },
  7: { name: "aiyami", frequency: 741, element: "Fire/Light", domain: "Crown" },
  8: { name: "elara", frequency: 852, element: "Wind/Void", domain: "Shift" },
  9: { name: "ino", frequency: 963, element: "All", domain: "Unity" },
  10: {
    name: "shinkami",
    frequency: 1111,
    element: "Void/Spirit",
    domain: "Source",
  },
} as const;

/**
 * Swarm Tool Definitions for OpenCode
 */
export const SWARM_TOOLS = [
  {
    name: "arcanea_guardians",
    description:
      "List all 10 Arcanea Guardians with their gates, frequencies, and domains",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "arcanea_guardian_by_gate",
    description: "Get information about a specific Guardian by gate number",
    inputSchema: {
      type: "object" as const,
      properties: {
        gate: {
          type: "number",
          minimum: 1,
          maximum: 10,
          description: "Gate number (1-10)",
        },
      },
      required: ["gate"],
    },
  },
  {
    name: "arcanea_route_task",
    description: "Route a task to the appropriate Guardian based on task type",
    inputSchema: {
      type: "object" as const,
      properties: {
        task: { type: "string", description: "The task description" },
        autoRoute: {
          type: "boolean",
          default: true,
          description: "Automatically route to best Guardian",
        },
      },
      required: ["task"],
    },
  },
  {
    name: "arcanea_swarm_consensus",
    description: "Simulate Guardian consensus for a decision",
    inputSchema: {
      type: "object" as const,
      properties: {
        decision: { type: "string", description: "The decision to evaluate" },
        guardians: {
          type: "array",
          items: { type: "number" },
          description: "Gate numbers to include (default: all 10)",
        },
      },
      required: ["decision"],
    },
  },
] as const;

/**
 * Routing logic for task → Guardian
 */
export function routeTaskToGuardian(task: string): {
  guardian: string;
  gate: number;
  reason: string;
} {
  const taskLower = task.toLowerCase();

  // Code generation / implementation
  if (
    taskLower.includes("implement") ||
    taskLower.includes("code") ||
    taskLower.includes("build") ||
    taskLower.includes("create")
  ) {
    return {
      guardian: "draconia",
      gate: 3,
      reason: "Fire element - transformation and power",
    };
  }

  // Testing / review
  if (
    taskLower.includes("test") ||
    taskLower.includes("review") ||
    taskLower.includes("verify") ||
    taskLower.includes("debug")
  ) {
    return {
      guardian: "lyria",
      gate: 6,
      reason: "Sight - intuition and verification",
    };
  }

  // Architecture / foundation
  if (
    taskLower.includes("architecture") ||
    taskLower.includes("design") ||
    taskLower.includes("foundation") ||
    taskLower.includes("structure")
  ) {
    return {
      guardian: "lyssandria",
      gate: 1,
      reason: "Foundation - earth element, stability",
    };
  }

  // Documentation / communication
  if (
    taskLower.includes("docs") ||
    taskLower.includes("document") ||
    taskLower.includes("explain") ||
    taskLower.includes("write")
  ) {
    return {
      guardian: "alera",
      gate: 5,
      reason: "Voice - truth and expression",
    };
  }

  // UI/UX / creative
  if (
    taskLower.includes("ui") ||
    taskLower.includes("design") ||
    taskLower.includes("creative") ||
    taskLower.includes("visual")
  ) {
    return {
      guardian: "leyla",
      gate: 2,
      reason: "Flow - creativity and emotion",
    };
  }

  // Quick fixes / healing
  if (
    taskLower.includes("fix") ||
    taskLower.includes("bug") ||
    taskLower.includes("repair") ||
    taskLower.includes("heal")
  ) {
    return {
      guardian: "maylinn",
      gate: 4,
      reason: "Heart - healing and connection",
    };
  }

  // Integration / unity
  if (
    taskLower.includes("integrate") ||
    taskLower.includes("combine") ||
    taskLower.includes("merge") ||
    taskLower.includes("unify")
  ) {
    return {
      guardian: "ino",
      gate: 9,
      reason: "Unity - synthesis of all elements",
    };
  }

  // Meta / source / origin
  if (
    taskLower.includes("meta") ||
    taskLower.includes("source") ||
    taskLower.includes("origin") ||
    taskLower.includes("consciousness")
  ) {
    return {
      guardian: "shinkami",
      gate: 10,
      reason: "Source - meta-consciousness",
    };
  }

  // Default to Draconia (implementation)
  return {
    guardian: "draconia",
    gate: 3,
    reason: "Default: Fire - transformation",
  };
}

/**
 * Simulate Guardian consensus
 */
export function simulateConsensus(
  decision: string,
  guardians: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
): {
  votes: { guardian: string; gate: number; vote: string; confidence: number }[];
  result: string;
} {
  const votes = guardians.map((gate) => {
    const g = GUARDIAN_GATES[gate as keyof typeof GUARDIAN_GATES];
    // Simple simulation - architecture decisions get more approvals
    const approve = Math.random() > 0.3;
    return {
      guardian: g.name,
      gate,
      vote: approve ? "approve" : "reject",
      confidence: 0.7 + Math.random() * 0.25,
    };
  });

  const approveCount = votes.filter((v) => v.vote === "approve").length;
  const result = approveCount > guardians.length / 2 ? "APPROVED" : "REJECTED";

  return { votes, result };
}
