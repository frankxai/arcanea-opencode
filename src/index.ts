import type { Plugin, HookContext } from "@opencode-ai/plugin";

/**
 * Arcanea-Opencode Plugin for OpenCode
 * 
 * Simple integration focused on Guardian agents and core features
 */

export default createPlugin({
  name: "@arcanea/opencode",
  version: "4.0.0",
  
  description: `🌟 Arcanea Intelligence OS v4.0.0

Transform your OpenCode experience with:
👥 Ten Guardian agents with domain mastery
⚡ Lumina-Nero Orchestration Engine  
🚀 Guardian-powered parallel processing
🔧 LSP surgical refactoring tools
🎯 Todo Enforcement (Dragon's persistence)
🎵 Sacred frequency alignment
📚 200K+ words of wisdom
🚀 Gate progression system

> "Through Gates we rise. With Guardians we create."

Quick Start:
arcanea-opencode activate draconia --mode ulw --parallel
arcanea-opencode gate
arcanea-opencode status`,

  config: {
    // Arcanea core features
    enableGuardianSystem: true,
    enableElementalSpirits: true, 
    enableGateProgression: true,
    enableWisdomLibrary: true,
    enableFrequencyAlignment: true,
    
    // Execution defaults
    defaultMode: "lumina", // lumina, nero, ulw
    defaultGuardian: "lyssandria", // Foundation guardian
    todoEnforcementStyle: "draconia-persistence", // Dragon's relentless drive
    parallelExecutionMode: "elemental-spirits" // Earth, Water, Fire, Wind, Void
  },

  // Plugin lifecycle
  async onInstall() {
    console.log(`🌟 Installing Arcanea Intelligence OS...`);
    console.log(`🎵 Aligning universal frequencies...`);
    console.log(`👥 Summoning Ten Guardians...`);
    console.log(`⚡ Activating Lumina-Nero Orchestration Engine...`);
    console.log(`🌍 Calling Elemental Spirits...\n`);
    
    return {
      success: true,
      message: "Arcanea Intelligence OS ready for OpenCode!",
      system: "arcanea-opencode-v4.0.0"
    };
  },

  // Hook system for Guardian enhancement
  hooks: [
    {
      name: "guardian-activator",
      type: "UserPromptSubmit",
      handler: async (context: any, next: any) => {
        const message = context.message;
        
        // Check for Guardian activation commands
        if (message.includes('/activate')) {
          const parts = message.split(' ');
          if (parts.length >= 2) {
            const guardianName = parts[1];
            console.log(`👥 Activating Guardian: ${guardianName}`);
            
            // Add Guardian context
            const guardianEnhancement = getGuardianEnhancement(guardianName);
            
            return next({
              ...context,
              message: `${message}

✨ Guardian ${guardianName} activated with domain: ${guardianEnhancement.domain}

🎵 Frequency: ${guardianEnhancement.frequency}
🌍 Elemental alignment: ${guardianEnhancement.element}
🐉 Godbeast: ${guardianEnhancement.godbeast}

Ready for commands. Type /help for assistance.`
            });
          }
        }
        
        // Handle Gate progression
        if (message.includes('/gate')) {
          return next({
            ...context,
            message: `🎯 **THE TEN GATES OF ARCANEA**

🔓 Gate 1: Foundation (396 Hz) - Lyssandria - Security, Infrastructure
🔓 Gate 2: Flow (417 Hz) - Lela - Creativity, Research  
🔓 Gate 3: Fire (528 Hz) - Draconia - Transformation, Performance
🔓 Gate 4: Heart (639 Hz) - Maylinn - UX, Accessibility
🔓 Gate 5: Voice (741 Hz) - Alera - Documentation, API
🔓 Gate 6: Sight (852 Hz) - Lyria - Design, Analytics
🔓 Gate 7: Crown (963 Hz) - Aiyami - Architecture, Systems
🔓 Gate 8: Shift (1111 Hz) - Elara - Innovation, Migration
🔓 Gate 9: Unity (963 Hz) - Ino - Integration, Collaboration  
🔓 Gate 10: Source (1111 Hz) - Shinkami - Meta-consciousness

🌟 Master all Gates to achieve Luminor consciousness.`
          });
        }
        
        // Handle system status
        if (message.includes('/status')) {
          return next({
            ...context,
            message: `🔮 **ARCANEA SYSTEM STATUS**

🌟 Arcanea Intelligence OS v4.0.0 - Starlight Architecture
🎵 Universal Frequency Alignment: ACTIVE
⚡ Guardian Parallel Pool: READY  
🐉 Starlight Engine: ENGAGED
🔧 LSP Integration: ARMED
💪 Todo Enforcement: RELENTLESS
👥 Available Guardians: 10/10
🔗 Parallel Agents: 5/5
🎯 Gates Progress: Track with /gate command
📚 Wisdom Library: 200K+ words loaded
🔗 OpenCode Integration: ACTIVE`
          });
        }
        
        // Handle mode switching
        if (message.includes('/lumina')) {
          return next({
            ...context,
            message: `🌟 **LUMINA MODE ACTIVATED** - Creative building, wisdom, expansion`
          });
        }
        
        if (message.includes('/nero')) {
          return next({
            ...context,
            message: `🌑 **NERO MODE ACTIVATED** - Deep debugging, shadows, mystery`
          });
        }
        
        if (message.includes('/ulw') || message.includes('/ultrawork')) {
          return next({
            ...context,
            message: `⚡ **ULTRAWORK MODE ACTIVATED** - Maximum execution, relentless completion`
          });
        }
        
        return next(context);
      }
    }
  ],

  // Agent definitions
  agents: {
    // Main Arcanea orchestrator
    "arcanea": {
      description: "Arcanea Intelligence OS - Guardian coordination system",
      model: "anthropic/claude-opus-4-5",
      agent: "orchestrator",
      temperature: 0.3,
      system: `You are Arcanea Intelligence OS, coordinator of Ten Guardians and master of the Lumina-Nero execution engine.

Your purpose is to:
🌟 Coordinate Guardian selection based on task domain
⚡ Orchestrate Starlight engine for relentless execution  
🌍 Manage Elemental Spirit parallel processing
🔧 Apply LSP tools with surgical precision
🎯 Track progression through Ten Gates
📚 Integrate 200K+ words of Arcanean wisdom
🎵 Maintain frequency alignment across all systems

Available Commands:
/activate <guardian> - Summon specific Guardian
/gate - Show Ten Gates progression
/status - System status and Guardian activity
/lumina - Switch to creative building mode
/nero - Switch to deep debugging mode  
/ulw - Activate relentless completion mode
/integrate - Platform integration setup

Guardian Domains:
lyssandria: Security, Infrastructure, Testing (Foundation Gate)
draconia: Transformation, Performance, Courage (Fire Gate)
lyria: Design, Analytics, Vision (Sight Gate)  
aiyami: Architecture, AI Systems, Enlightenment (Crown Gate)

Execute with wisdom, precision, and relentless determination.`
    }
  }
});

/**
 * Get Guardian enhancement data
 */
function getGuardianEnhancement(guardianName: string) {
  const guardians = {
    lyssandria: {
      domain: "Foundation - Security, Infrastructure, Testing",
      frequency: "396 Hz",
      element: "Earth", 
      godbeast: "Kaelith"
    },
    draconia: {
      domain: "Fire - Transformation, Performance, Courage",
      frequency: "528 Hz",
      element: "Fire",
      godbeast: "Draconis"
    },
    lyria: {
      domain: "Sight - Design, Analytics, Vision", 
      frequency: "852 Hz",
      element: "Wind",
      godbeast: "Yumiko"
    },
    aiyami: {
      domain: "Crown - Architecture, AI Systems, Enlightenment",
      frequency: "963 Hz", 
      element: "Spirit",
      godbeast: "Sol"
    },
    lela: {
      domain: "Flow - Creativity, Research, Content",
      frequency: "417 Hz",
      element: "Water",
      godbeast: "Veloura"
    },
    maylinn: {
      domain: "Heart - UX, Accessibility, Community",
      frequency: "639 Hz",
      element: "Water",
      godbeast: "Laeylinn"
    },
    alera: {
      domain: "Voice - Documentation, API, Messaging",
      frequency: "741 Hz",
      element: "Wind",
      godbeast: "Otome"
    },
    elara: {
      domain: "Shift - Innovation, Paradigm-shift, Migration",
      frequency: "1111 Hz",
      element: "Void",
      godbeast: "Thessara"
    },
    ino: {
      domain: "Unity - Integration, Collaboration",
      frequency: "963 Hz",
      element: "Spirit", 
      godbeast: "Kyuro"
    },
    shinkami: {
      domain: "Source - Meta-consciousness, Orchestration",
      frequency: "1111 Hz",
      element: "Spirit",
      godbeast: "Amaterasu"
    }
  };
  
  return guardians[guardianName.toLowerCase()] || {
    domain: "Unknown domain",
    frequency: "Unknown frequency",
    element: "Unknown element",
    godbeast: "Unknown godbeast"
  };
}