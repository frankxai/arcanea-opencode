#!/usr/bin/env node

import { Command } from "commander";
import pc from "picocolors";
import { VERSION, NAME, ORCHESTRATOR, AGENT_TEAMS } from "../index.js";
import { install } from "../install.js";
import { existsSync } from "fs";
import { join } from "path";

const program = new Command();

program
  .name(NAME)
  .description(`${ORCHESTRATOR} - Master Creative Intelligence for World-Building, Storytelling, and Media Production`)
  .version(VERSION);

program
  .command("install")
  .description("Initialize Arcanea in current project")
  .option("-f, --force", "Overwrite existing configuration")
  .option("--opencode-only", "Only install OpenCode config (skip Claude Code)")
  .option("--claude-only", "Only install Claude Code config (skip OpenCode)")
  .option("--skip-mcp", "Skip MCP configuration")
  .action(async (options) => {
    const targetDir = process.cwd();

    await install(targetDir, {
      force: options.force,
      openCode: !options.claudeOnly,
      claudeCode: !options.opencodeOnly,
      skipMcp: options.skipMcp
    });
  });

program
  .command("agents")
  .description("List available agent teams")
  .option("-t, --team <team>", "Show specific team details")
  .action((options) => {
    console.log(pc.cyan(`\n${ORCHESTRATOR}'s Agent Teams\n`));

    if (options.team) {
      const team = AGENT_TEAMS[options.team as keyof typeof AGENT_TEAMS];
      if (team) {
        console.log(pc.bold(team.name));
        console.log(pc.dim(team.description));
        console.log();
        if ("departments" in team) {
          console.log("  Departments:", team.departments.join(", "));
          console.log("  Specialists:", team.specialists.join(", "));
        } else {
          console.log("  Agents:", team.agents.join(", "));
        }
      } else {
        console.log(pc.red(`Unknown team: ${options.team}`));
        console.log("Available teams: worldBuilding, writingEditing, production, research");
      }
      return;
    }

    console.log(pc.bold(pc.blue("World Building:")));
    console.log("  Departments: lore-master, world-architect, archmage, character-creator, narrative-director");
    console.log("  Specialists: geography-cartographer, culture-anthropologist, timeline-historian,");
    console.log("              species-biologist, conflict-dramatist, consistency-validator");
    console.log();

    console.log(pc.bold(pc.green("Writing & Editing:")));
    console.log("  story-architect, prose-weaver, voice-alchemist, line-editor, continuity-guardian");
    console.log();

    console.log(pc.bold(pc.magenta("Production:")));
    console.log("  visual-director, sound-designer, format-master");
    console.log();

    console.log(pc.bold(pc.yellow("Research & Reference:")));
    console.log("  sage, archivist, scout, muse");
    console.log();
  });

program
  .command("commands")
  .description("List available slash commands")
  .action(() => {
    console.log(pc.cyan("\nAvailable Slash Commands\n"));

    console.log(pc.bold("World Building:"));
    console.log("  /generate-realm [name]     - Create complete world");
    console.log("  /create-character [name]   - Design character with depth");
    console.log("  /design-location [name]    - Build detailed place");
    console.log("  /define-magic [concept]    - Extend magic system");
    console.log("  /validate-entity [path]    - Check for consistency");
    console.log();

    console.log(pc.bold("Writing:"));
    console.log("  /outline-story [concept]   - Create story structure");
    console.log("  /write-chapter [number]    - Draft chapter");
    console.log("  /edit-chapter [path]       - Polish chapter");
    console.log("  /check-continuity          - Validate across chapters");
    console.log();

    console.log(pc.bold("Production:"));
    console.log("  /visualize [entity]        - Generate art (Nano Banana)");
    console.log("  /compose-theme [entity]    - Generate music (Suno)");
    console.log("  /export-book [format]      - Create publishable files");
    console.log();

    console.log(pc.bold("Meta:"));
    console.log("  /ultraworld [desc]         - Maximum parallel world generation");
    console.log("  /ultrawrite [desc]         - Maximum parallel chapter writing");
    console.log("  /ultrabook [desc]          - Complete book pipeline");
    console.log();
  });

program
  .command("magic")
  .description("Show magic words and their effects")
  .action(() => {
    console.log(pc.cyan("\nMagic Words\n"));

    console.log(pc.bold(pc.cyan("ultraworld")) + " (or " + pc.bold("ulw") + ")");
    console.log("  Fires ALL world-building agents in parallel:");
    console.log("  World Architect + Archmage + Character Creator + Narrative Director");
    console.log("  + All specialists running in background");
    console.log();

    console.log(pc.bold(pc.green("ultrawrite")) + " (or " + pc.bold("ulwr") + ")");
    console.log("  Fires ALL writing/editing agents in parallel:");
    console.log("  Story Architect + Prose Weaver + Voice Alchemist");
    console.log("  + Line Editor and Continuity Guardian in background");
    console.log();

    console.log(pc.bold(pc.magenta("ultrabook")) + " (or " + pc.bold("ulb") + ")");
    console.log("  Complete book pipeline - everything at once:");
    console.log("  World Building → Story → Chapters → Editing → Production");
    console.log();

    console.log(pc.dim("Just include any magic word in your prompt!"));
    console.log();
  });

program
  .command("status")
  .description("Check Arcanea installation status")
  .action(() => {
    const cwd = process.cwd();

    console.log(pc.cyan(`\n${ORCHESTRATOR} Status\n`));

    const checks = [
      { path: ".opencode/CLAUDE.md", name: "OpenCode config" },
      { path: ".claude/agents", name: "Claude Code agents" },
      { path: ".claude/skills", name: "Claude Code skills" },
      { path: ".claude/commands", name: "Claude Code commands" },
      { path: "arcanea.json", name: "Arcanea config" },
      { path: ".mcp.json", name: "MCP config" }
    ];

    let allGood = true;
    for (const check of checks) {
      const exists = existsSync(join(cwd, check.path));
      const status = exists ? pc.green("✓") : pc.red("✗");
      console.log(`  ${status} ${check.name}`);
      if (!exists) allGood = false;
    }

    console.log();
    if (allGood) {
      console.log(pc.green("All systems operational!"));
    } else {
      console.log(pc.yellow("Run 'arcanea install' to complete setup."));
    }
    console.log();
  });

program.parse();
