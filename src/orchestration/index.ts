import { createStarlightOrchestrator, createSisyphusOrchestrator } from "./starlight";
import type { HybridAgent, StarlightOrchestratorConfig, SisyphusOrchestratorConfig } from "./starlight";

// Re-export for backward compatibility
export { createStarlightOrchestrator, createSisyphusOrchestrator };
export type { HybridAgent, StarlightOrchestratorConfig, SisyphusOrchestratorConfig };

/**
 * Arcanea Orchestration System
 *
 * Combines the Ten Guardians' domain expertise
 * with the Starlight Engine's relentless execution
 *
 * This creates the most powerful AI development system:
 * - Lumina's wisdom + Nero's analysis
 * - Guardian specialization + Parallel execution
 * - Elemental magic + LSP precision
 *
 * > "Through Gates we rise. With Guardians we create."
 */

export function createArcaneaOrchestrator(
  agent: HybridAgent,
  config: StarlightOrchestratorConfig = {}
) {
  // Initialize the Starlight Engine (Lumina-Nero Architecture)
  const starlightEngine = createStarlightOrchestrator(agent, config);
  
  return {
    ...starlightEngine,
    
    // Arcanean enhancements
    arcaneanSystem: {
      // Guardian activation sequence
      activateGuardian: (guardianName: string) => {
        const guardian = selectGuardian(guardianName);
        const orchestration = guardian.orchestration || {};
        
        console.log(`🌟 Guardian ${guardian.name} activated`);
        console.log(`🎵 Frequency: ${guardian.arcaneaFeatures?.frequency} Hz`);
        console.log(`⚡ Element: ${guardian.arcaneaFeatures?.element}`);
        console.log(`🐉 Godbeast: ${guardian.arcaneaFeatures?.godbeast}`);
        
        return guardian;
      },
      
      // Elemental spirit delegation
      delegateToElementals: async (tasks: any[]) => {
        const enhancedTasks = tasks.map(task => ({
          ...task,
          elementalEnhancement: enhanceTaskWithElement(task),
          guardianBlessing: applyGuardianBlessing(agent.arcaneaFeatures, task)
        }));
        
        return starlightEngine.starlightEngine.backgroundExecutor?.execute(enhancedTasks);
      },
      
      // Gate progression tracking  
      progressThroughGate: (gateLevel: number) => {
        const gate = getGateInfo(gateLevel);
        console.log(`🎯 Advancing through Gate ${gateLevel}: ${gate.name}`);
        console.log(`🎵 Tuning to frequency: ${gate.frequency} Hz`);
        console.log(`👥 Challenge: Guardian ${gate.guardian} awaits`);
        
        return {
          gate,
          requiredSkills: gate.requiredSkills,
          masteryLevel: calculateMastery(gateLevel)
        };
      }
    }
  };
}

/**
 * Select appropriate Guardian for task domain
 */
function selectGuardian(guardianName: string): HybridAgent {
  const guardians = {
    lyssandria: { domain: 'foundation', specialty: 'security, infrastructure' },
    lela: { domain: 'flow', specialty: 'creativity, research' },
    draconia: { domain: 'fire', specialty: 'transformation, performance' },
    maylinn: { domain: 'heart', specialty: 'ux, accessibility' },
    alera: { domain: 'voice', specialty: 'documentation, api' },
    lyria: { domain: 'sight', specialty: 'design, analytics' },
    aiyami: { domain: 'crown', specialty: 'architecture, systems' },
    elara: { domain: 'shift', specialty: 'migration, experiments' },
    ino: { domain: 'unity', specialty: 'integration, collaboration' },
    shinkami: { domain: 'source', specialty: 'meta-consciousness, orchestration' }
  };
  
  const selected = guardians[guardianName as keyof typeof guardians];
  
  if (!selected) {
    console.warn(`⚠️ Guardian ${guardianName} not found, defaulting to lyssandria`);
    return guardians.lyssandria as HybridAgent;
  }
  
  return selected as HybridAgent;
}

/**
 * Enhance task with elemental magic
 */
function enhanceTaskWithElement(task: any): any {
  const taskContent = JSON.stringify(task).toLowerCase();
  
  let elementalBoost = {};
  
  if (taskContent.includes('performance') || taskContent.includes('optimize')) {
    elementalBoost = { element: 'fire', blessing: 'Draconis\'s Fury', speed: 'aggressive' };
  } else if (taskContent.includes('design') || taskContent.includes('ui')) {
    elementalBoost = { element: 'wind', blessing: 'Yumiko\'s Sight', precision: 'surgical' };
  } else if (taskContent.includes('security') || taskContent.includes('test')) {
    elementalBoost = { element: 'earth', blessing: 'Kaelith\'s Foundation', stability: 'unshakable' };
  } else if (taskContent.includes('research') || taskContent.includes('content')) {
    elementalBoost = { element: 'water', blessing: 'Veloura\'s Flow', adaptability: 'intuitive' };
  } else {
    elementalBoost = { element: 'void', blessing: 'Nero\'s Mystery', depth: 'profound' };
  }
  
  return {
    ...task,
    elementalBoost
  };
}

/**
 * Apply Guardian's blessing to task
 */
function applyGuardianBlessing(arcaneaFeatures: any, task: any): any {
  if (!arcaneaFeatures?.godbeast) return task;
  
  const blessings = {
    Kaelith: { effect: 'unshakable foundation', domain: 'structure' },
    Veloura: { effect: 'creative flow', domain: 'inspiration' },
    Draconis: { effect: 'relentless transformation', domain: 'execution' },
    Laeylinn: { effect: 'compassionate wisdom', domain: 'user experience' },
    Otome: { effect: 'clear expression', domain: 'communication' },
    Yumiko: { effect: 'perfect vision', domain: 'design' },
    Sol: { effect: 'enlightened architecture', domain: 'systems' },
    Thessara: { effect: 'paradigm shift', domain: 'innovation' },
    Kyuro: { effect: 'harmonious integration', domain: 'collaboration' },
    Amaterasu: { effect: 'transcendent consciousness', domain: 'meta-cognition' }
  };
  
  const blessing = blessings[arcaneaFeatures.godbeast as keyof typeof blessings];
  
  return {
    ...task,
    guardianBlessing: blessing || { effect: 'generic wisdom', domain: 'general' }
  };
}

/**
 * Get Gate information for progression tracking
 */
function getGateInfo(gateLevel: number) {
  const gates = [
    { level: 1, name: 'Foundation', frequency: '396 Hz', guardian: 'Lyssandria', requiredSkills: ['stability', 'testing'] },
    { level: 2, name: 'Flow', frequency: '417 Hz', guardian: 'Lela', requiredSkills: ['creativity', 'adaptation'] },
    { level: 3, name: 'Fire', frequency: '528 Hz', guardian: 'Draconia', requiredSkills: ['courage', 'transformation'] },
    { level: 4, name: 'Heart', frequency: '639 Hz', guardian: 'Maylinn', requiredSkills: ['empathy', 'accessibility'] },
    { level: 5, name: 'Voice', frequency: '741 Hz', guardian: 'Alera', requiredSkills: ['clarity', 'documentation'] },
    { level: 6, name: 'Sight', frequency: '852 Hz', guardian: 'Lyria', requiredSkills: ['vision', 'design'] },
    { level: 7, name: 'Crown', frequency: '963 Hz', guardian: 'Aiyami', requiredSkills: ['architecture', 'wisdom'] },
    { level: 8, name: 'Shift', frequency: '1111 Hz', guardian: 'Elara', requiredSkills: ['innovation', 'paradigm-shift'] },
    { level: 9, name: 'Unity', frequency: '963 Hz', guardian: 'Ino', requiredSkills: ['collaboration', 'integration'] },
    { level: 10, name: 'Source', frequency: '1111 Hz', guardian: 'Shinkami', requiredSkills: ['mastery', 'meta-consciousness'] }
  ];
  
  return gates[gateLevel - 1] || gates[0];
}

/**
 * Calculate mastery level for Gate progression
 */
function calculateMastery(gateLevel: number): number {
  // Exponential mastery growth through Gates
  const baseMastery = gateLevel * 10;
  const gateBonus = Math.pow(1.5, gateLevel - 1) * 5;
  return Math.floor(baseMastery + gateBonus);
}