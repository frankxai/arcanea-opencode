/**
 * Arcanea Swarm Tool Implementation
 */

import {
  GUARDIAN_GATES,
  routeTaskToGuardian,
  simulateConsensus,
  SWARM_TOOLS,
} from "./index";

export const tools = SWARM_TOOLS;

export async function handleTool(name: string, args: Record<string, unknown>) {
  switch (name) {
    case "arcanea_guardians": {
      return Object.entries(GUARDIAN_GATES).map(([gate, g]) => ({
        gate: Number(gate),
        name: g.name,
        frequency: g.frequency,
        element: g.element,
        domain: g.domain,
      }));
    }

    case "arcanea_guardian_by_gate": {
      const gate = args.gate as number;
      const g = GUARDIAN_GATES[gate as keyof typeof GUARDIAN_GATES];
      if (!g) return { error: `Invalid gate: ${gate}. Use 1-10.` };
      return g;
    }

    case "arcanea_route_task": {
      const task = args.task as string;
      return routeTaskToGuardian(task);
    }

    case "arcanea_swarm_consensus": {
      const decision = args.decision as string;
      const guardians = args.guardians as number[] | undefined;
      return simulateConsensus(decision, guardians);
    }

    default:
      return { error: `Unknown tool: ${name}` };
  }
}
