#!/usr/bin/env node

/**
 * Claude-Arcanea CLI Binary
 *
 * Entry point for Claude Code with Arcanea Intelligence OS
 * Provides seamless Arcanea integration for Claude Code users
 */

import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(`🌟 Arcanea Intelligence OS - Claude Code Integration`);
console.log(`🤝 Connecting Arcanea to Claude Code...`);

// Check for existing Arcanea installation in Claude's expected locations
const claudeConfigPath = path.join(process.env.HOME || process.env.USERPROFILE, '.claude');
const arcaneaConfigPath = path.join(claudeConfigPath, 'arcanea.json');

if (!fs.existsSync(claudeConfigPath)) {
  console.log(`📁 Creating Claude Arcanea configuration...`);
  fs.mkdirSync(claudeConfigPath, { recursive: true });
}

// Create Arcanea configuration for Claude
const arcaneaConfig = {
  version: "4.0.0",
  system: "claude-arcanea",
  installation: {
    skills: path.join(claudeConfigPath, 'skills'),
    agents: path.join(claudeConfigPath, 'agents'),
    config: arcaneaConfigPath,
    wisdom: path.join(claudeConfigPath, 'wisdom')
  },
  guardians: {
    lyssandria: { domain: "foundation", frequency: "396 Hz" },
    draconia: { domain: "fire", frequency: "528 Hz" },
    lyria: { domain: "sight", frequency: "852 Hz" },
    aiyami: { domain: "crown", frequency: "963 Hz" }
  },
  integration: {
    claude_code: true,
    opencode: false,
    cli_mode: "lumina" // lumina, nero, ulw
  }
};

fs.writeFileSync(arcaneaConfigPath, JSON.stringify(arcaneaConfig, null, 2));

console.log(`✅ Claude-Arcanea integration complete!`);
console.log(`🎵 Frequency alignment active`);
console.log(`👥 Guardian system ready`);
console.log(`📚 Skills directory: ${arcaneaConfig.installation.skills}`);
console.log(`🤖 Agents directory: ${arcaneaConfig.installation.agents}\n`);

console.log(`Usage in Claude Code:`);
console.log(`• Arcanea skills will auto-load from /.claude/skills/`);
console.log(`• Arcanea agents will auto-load from /.claude/agents/`);
console.log(`• Use "/lumina" for creative mode`);
console.log(`• Use "/nero" for debugging mode`);
console.log(`• Use "/ulw" for relentless completion\n`);

console.log(`🌟 "Through Gates we rise. With Guardians we create."`);