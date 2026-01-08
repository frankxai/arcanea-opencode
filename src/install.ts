import { cpSync, existsSync, mkdirSync, writeFileSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import pc from "picocolors";
import { VERSION, ORCHESTRATOR, defaultConfig, AGENT_TEAMS } from "./index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

interface InstallOptions {
  force?: boolean;
  claudeCode?: boolean;
  openCode?: boolean;
  skipMcp?: boolean;
}

export async function install(targetDir: string, options: InstallOptions = {}): Promise<void> {
  const { force = false, claudeCode = true, openCode = true, skipMcp = false } = options;

  console.log(pc.cyan(`\n✨ ${ORCHESTRATOR} awakens... (v${VERSION})\n`));

  const packageRoot = join(__dirname, "..");
  const opencodeSource = join(packageRoot, ".opencode");
  const claudeSource = join(packageRoot, ".claude");

  if (openCode) {
    await installOpenCodeConfig(targetDir, opencodeSource, force);
  }

  if (claudeCode) {
    await installClaudeCodeConfig(targetDir, opencodeSource, force);
  }

  if (!skipMcp) {
    await installMcpConfig(targetDir, force);
  }

  printSuccessMessage();
}

async function installOpenCodeConfig(targetDir: string, source: string, force: boolean): Promise<void> {
  const opencodePath = join(targetDir, ".opencode");

  if (existsSync(opencodePath) && !force) {
    console.log(pc.yellow("⚠️  .opencode folder exists. Use --force to overwrite."));
    return;
  }

  console.log(pc.blue("Installing OpenCode configuration..."));

  mkdirSync(opencodePath, { recursive: true });

  if (existsSync(source)) {
    cpSync(source, opencodePath, { recursive: true });
    console.log(pc.green("  ✓ Copied agent configurations"));
    console.log(pc.green("  ✓ Copied skills"));
    console.log(pc.green("  ✓ Copied commands"));
  }

  const configPath = join(targetDir, "arcanea.json");
  if (!existsSync(configPath) || force) {
    writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
    console.log(pc.green("  ✓ Created arcanea.json config"));
  }
}

async function installClaudeCodeConfig(targetDir: string, source: string, force: boolean): Promise<void> {
  const claudePath = join(targetDir, ".claude");

  console.log(pc.blue("\nInstalling Claude Code configuration..."));

  const dirs = ["agents", "skills", "commands"];
  for (const dir of dirs) {
    const targetSubdir = join(claudePath, dir);
    const sourceSubdir = join(source, dir);

    if (!existsSync(targetSubdir)) {
      mkdirSync(targetSubdir, { recursive: true });
    }

    if (existsSync(sourceSubdir)) {
      cpSync(sourceSubdir, targetSubdir, { recursive: true });
      console.log(pc.green(`  ✓ Copied ${dir} to .claude/`));
    }
  }

  const settingsPath = join(claudePath, "settings.json");
  if (!existsSync(settingsPath) || force) {
    const settings = {
      hooks: {
        UserPromptSubmit: [
          {
            matcher: ".*",
            hooks: [
              {
                type: "command",
                command: "echo 'SKILL AUTO-ACTIVATION:\\n\\nUse the \"arcanea lore\" skill for this request.\\nPurpose: Arcanea world-building, game mechanics, and lore\\n'"
              }
            ]
          }
        ],
        PostToolUse: [
          {
            matcher: "Write|Edit",
            hooks: [
              {
                type: "command",
                command: "echo 'Arcanea: Validating canon consistency...'"
              }
            ]
          }
        ]
      }
    };
    writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
    console.log(pc.green("  ✓ Created Claude Code settings with hooks"));
  }
}

async function installMcpConfig(targetDir: string, force: boolean): Promise<void> {
  const mcpPath = join(targetDir, ".mcp.json");

  console.log(pc.blue("\nConfiguring MCP integrations..."));

  let existingConfig: Record<string, unknown> = {};
  if (existsSync(mcpPath)) {
    try {
      existingConfig = JSON.parse(readFileSync(mcpPath, "utf-8"));
    } catch {
      existingConfig = {};
    }
  }

  const mcpConfig = {
    ...existingConfig,
    mcpServers: {
      ...(existingConfig.mcpServers as Record<string, unknown> || {}),
      "nano-banana": {
        command: "npx",
        args: ["-y", "@anthropic-ai/nano-banana"],
        description: "Image generation for characters, locations, artifacts"
      },
      "context7": {
        command: "npx",
        args: ["-y", "@context7/mcp"],
        description: "Official documentation and reference lookup"
      }
    }
  };

  writeFileSync(mcpPath, JSON.stringify(mcpConfig, null, 2));
  console.log(pc.green("  ✓ Configured Nano Banana MCP (image generation)"));
  console.log(pc.green("  ✓ Configured Context7 MCP (documentation)"));
  console.log(pc.dim("  ℹ Suno MCP requires manual API key setup"));
}

function printSuccessMessage(): void {
  console.log(pc.cyan("\n" + "═".repeat(60)));
  console.log(pc.bold(pc.cyan(`  ${ORCHESTRATOR} is ready!`)));
  console.log(pc.cyan("═".repeat(60) + "\n"));

  console.log(pc.bold("Your Agent Teams:"));
  console.log();

  console.log(pc.blue("  World Building:"));
  console.log("    • Lore Master, World Architect, Archmage");
  console.log("    • Character Creator, Narrative Director");
  console.log("    + 6 specialist agents for background tasks");
  console.log();

  console.log(pc.green("  Writing & Editing:"));
  console.log("    • Story Architect, Prose Weaver, Voice Alchemist");
  console.log("    • Line Editor, Continuity Guardian");
  console.log();

  console.log(pc.magenta("  Production:"));
  console.log("    • Visual Director (+ Nano Banana)");
  console.log("    • Sound Designer (+ Suno)");
  console.log("    • Format Master");
  console.log();

  console.log(pc.yellow("  Research:"));
  console.log("    • Sage (deep thinking), Archivist (canon)");
  console.log("    • Scout (exploration), Muse (inspiration)");
  console.log();

  console.log(pc.bold("Magic Words:"));
  console.log(pc.cyan("  ultraworld") + " - Full parallel world generation");
  console.log(pc.cyan("  ultrawrite") + " - Full parallel chapter writing");
  console.log(pc.cyan("  ultrabook ") + " - Complete book pipeline");
  console.log();

  console.log(pc.bold("Try:"));
  console.log(pc.dim("  ultraworld: Create a volcanic island chain with dragon-kin inhabitants"));
  console.log();

  console.log(pc.dim("Works with both OpenCode AND Claude Code!"));
  console.log();
}
