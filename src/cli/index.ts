#!/usr/bin/env node

import { Command } from "commander";
import pc from "picocolors";
import { VERSION, NAME, ORCHESTRATOR } from "../index.js";
import { cpSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const configSource = join(__dirname, "../../.opencode");

const program = new Command();

program
  .name(NAME)
  .description(`${ORCHESTRATOR}'s Loom - AI-Powered World-Building Orchestration`)
  .version(VERSION);

program
  .command("init")
  .description("Initialize Arcanea OpenCode in current project")
  .option("-f, --force", "Overwrite existing configuration")
  .action((options) => {
    const targetDir = process.cwd();
    const opencodePath = join(targetDir, ".opencode");
    const claudePath = join(targetDir, ".claude");
    
    console.log(pc.cyan(`\n✨ ${ORCHESTRATOR} awakens...\n`));
    
    if (existsSync(opencodePath) && !options.force) {
      console.log(pc.yellow("⚠️  .opencode folder already exists. Use --force to overwrite."));
      return;
    }
    
    try {
      mkdirSync(opencodePath, { recursive: true });
      cpSync(configSource, opencodePath, { recursive: true });
      
      if (!existsSync(claudePath)) {
        mkdirSync(claudePath, { recursive: true });
        cpSync(join(configSource, "agents"), join(claudePath, "agents"), { recursive: true });
        cpSync(join(configSource, "skills"), join(claudePath, "skills"), { recursive: true });
        cpSync(join(configSource, "commands"), join(claudePath, "commands"), { recursive: true });
      }
      
      console.log(pc.green("✅ Arcanea OpenCode initialized!\n"));
      console.log("Your agent team is ready:");
      console.log(pc.blue("  • Lore Master") + " - Canon Guardian");
      console.log(pc.blue("  • World Architect") + " - Physical World");
      console.log(pc.blue("  • Character Weaver") + " - People & Relationships");
      console.log(pc.blue("  • Magic Systems") + " - Supernatural Rules");
      console.log(pc.blue("  • Narrative Director") + " - Story & Conflict");
      console.log(pc.dim("  + 6 specialist agents for background tasks\n"));
      
      console.log(pc.cyan("Try: ") + pc.bold("ultraworld: Create a new fantasy realm"));
      console.log(pc.cyan("Or:  ") + pc.bold("/generate-realm [name]\n"));
      
    } catch (error) {
      console.error(pc.red("Failed to initialize:"), error);
      process.exit(1);
    }
  });

program
  .command("agents")
  .description("List available agents")
  .action(() => {
    console.log(pc.cyan(`\n${ORCHESTRATOR}'s Agent Team\n`));
    
    console.log(pc.bold("Department Heads (Strategic):"));
    console.log("  lore-master        - Canon, consistency, timeline");
    console.log("  world-architect    - Geography, cosmology, physics");
    console.log("  character-weaver   - People, relationships, arcs");
    console.log("  magic-systems      - Rules, costs, artifacts");
    console.log("  narrative-director - Story, conflict, quests\n");
    
    console.log(pc.bold("Specialists (Background Speed):"));
    console.log("  geography-cartographer  - Location details");
    console.log("  culture-anthropologist  - Society design");
    console.log("  timeline-historian      - Chronology");
    console.log("  species-biologist       - Creatures, races");
    console.log("  conflict-dramatist      - Dramatic tension");
    console.log("  consistency-validator   - QA, validation\n");
  });

program
  .command("commands")
  .description("List available slash commands")
  .action(() => {
    console.log(pc.cyan("\nAvailable Slash Commands\n"));
    console.log("  /generate-realm [name]     - Create complete world");
    console.log("  /create-character [name]   - Design character with depth");
    console.log("  /design-location [name]    - Build detailed place");
    console.log("  /define-magic-rule [idea]  - Extend magic system");
    console.log("  /ultraworld [scope] [desc] - Maximum parallel generation");
    console.log("  /validate-entity [path]    - Check for consistency\n");
  });

program.parse();
