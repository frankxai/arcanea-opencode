# Arcanea: The Creative Intelligence Platform

> *"Where Sisyphus rolls code, Arcanea weaves worlds."*

**Version**: 2.0.0 Vision Document
**Status**: Architecture Design

---

## The Vision

**oh-my-opencode** revolutionized coding with Sisyphus - an orchestrator that makes AI code indistinguishable from senior engineer code.

**Arcanea** does the same for **creative content** - making AI-generated worlds, stories, and media indistinguishable from master storytellers and artists.

### The Parallel

| oh-my-opencode (Sisyphus) | Arcanea |
|---------------------------|---------|
| Code orchestrator | Creative orchestrator |
| Oracle (architecture) | Sage (narrative architecture) |
| Librarian (docs/OSS) | Archivist (lore/canon) |
| Frontend Engineer | Visual Artist |
| Explore (codebase grep) | Scout (world exploration) |
| LSP tools (refactoring) | Canon tools (consistency) |
| `ultrawork` keyword | `ultraworld` keyword |
| Works until code is done | Works until world is complete |

---

## The Master Orchestrator: Arcanea

Not "The Weaver" - **Arcanea itself** is the orchestrator.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              ARCANEA                                         │
│                    Master Creative Intelligence                              │
│                                                                             │
│  "I am the living world. I coordinate creation across all domains -        │
│   from the first spark of an idea to the final page, image, and song."     │
│                                                                             │
│  Model: Claude Opus 4.5 (Extended Thinking 32k)                             │
│  Magic Word: ultraworld / ulw                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Agent Teams

### Team 1: World Building Department

| Agent | Role | Model | Background? |
|-------|------|-------|-------------|
| **Lore Master** | Canon Guardian, Consistency | Sonnet 4.5 | No |
| **World Architect** | Geography, Cosmology, Physics | Sonnet 4.5 | No |
| **Archmage** | Magic Systems, Artifacts, Costs | Sonnet 4.5 | No |
| **Character Creator** | People, Psychology, Relationships | Sonnet 4.5 | No |
| **Narrative Director** | Conflicts, Quests, Story Arcs | Sonnet 4.5 | No |

**Specialists** (Background, fast models):
- Geography Cartographer
- Culture Anthropologist  
- Timeline Historian
- Species Biologist
- Conflict Dramatist
- Consistency Validator

### Team 2: Writing & Editing Department (NEW)

| Agent | Role | Model | Background? |
|-------|------|-------|-------------|
| **Story Architect** | Plot structure, pacing, beats | Sonnet 4.5 | No |
| **Prose Weaver** | Actual chapter writing | Sonnet 4.5 | No |
| **Voice Alchemist** | Dialogue, character voice | Sonnet 4.5 | No |
| **Line Editor** | Prose polish, clarity, flow | Gemini 3 Pro | Yes |
| **Continuity Guardian** | Cross-chapter consistency | Gemini Flash | Yes |

**Specialists** (Background):
- Dialogue Specialist
- Description Specialist
- Action Specialist
- Emotion Specialist
- Pacing Analyst

### Team 3: Production Department (NEW)

| Agent | Role | Model + MCP | Background? |
|-------|------|-------------|-------------|
| **Visual Director** | Art direction, prompts | Gemini 3 Pro + Nano Banana | No |
| **Sound Designer** | Music, atmosphere | Sonnet + Suno MCP | No |
| **Format Master** | Export to ePub, PDF, web | Gemini Flash | Yes |
| **Publisher** | Distribution, metadata | Gemini Flash | Yes |

### Team 4: Research & Reference (Like Sisyphus's tools)

| Agent | Role | Model |
|-------|------|-------|
| **Sage** | Deep narrative/creative decisions | GPT 5.2 |
| **Archivist** | Canon lookup, world research | Sonnet 4.5 |
| **Scout** | Fast world exploration (grep for lore) | Grok/Haiku |
| **Muse** | External inspiration, mythology research | Librarian |

---

## The Magic Words

### `ultraworld` / `ulw`

Full parallel world generation:
```
ultraworld: Create the Frostborne Reaches, a northern realm of ice and ancient magic
```

Fires ALL world-building agents simultaneously.

### `ultrawrite` / `ulw`

Full parallel chapter writing:
```
ultrawrite: Write Chapter 3 - The Battle of Sunken Fields
```

Fires story architect + prose weaver + specialists.

### `ultrabook` / `ulb`

Complete book pipeline:
```
ultrabook: Create a complete novel set in the Frostborne Reaches
```

Fires EVERYTHING - world building → story → chapters → editing → visualization.

---

## MCP Integrations

### Visual Production
```json
{
  "nano-banana": {
    "purpose": "Character portraits, location art, scene illustrations",
    "triggers": ["visualize", "illustrate", "concept art"]
  }
}
```

### Audio Production
```json
{
  "suno": {
    "purpose": "Realm themes, character leitmotifs, battle music",
    "triggers": ["compose", "theme music", "soundtrack"]
  }
}
```

### Research
```json
{
  "context7": { "purpose": "Writing craft, mythology, world-building references" },
  "grep_app": { "purpose": "How other authors solved similar problems" },
  "websearch": { "purpose": "Real-world research for fantasy grounding" }
}
```

### Arcanea-Specific MCP (Custom)
```json
{
  "arcanea-mcp": {
    "purpose": "Canon management, consistency validation, entity CRUD",
    "tools": [
      "create_entity",
      "validate_entity", 
      "query_canon",
      "check_consistency",
      "update_timeline",
      "generate_relationship_map"
    ]
  }
}
```

---

## The Creative Pipeline

### Phase 1: World Foundation
```
User: ultraworld - Create the Shattered Isles

Arcanea fires in parallel:
├── World Architect → Geography, climate, regions
├── Archmage → Local magic traditions
├── Character Creator → Key figures
├── Narrative Director → Active conflicts
├── Lore Master → Canon validation
└── Specialists → Detail work (background)

Output: Complete world foundation (~50 files)
```

### Phase 2: Story Planning
```
User: Plan a trilogy set in the Shattered Isles

Story Architect fires:
├── Book 1 outline
├── Book 2 outline  
├── Book 3 outline
├── Character arcs across trilogy
├── Thematic throughlines
└── Foreshadowing map

Output: Complete story structure
```

### Phase 3: Chapter Writing
```
User: ultrawrite Chapter 1

Arcanea fires in parallel:
├── Prose Weaver → Draft chapter
├── Voice Alchemist → Dialogue passes
├── Line Editor → Polish (background)
├── Continuity Guardian → Consistency check (background)
└── Visual Director → Chapter header art (background)

Output: Polished chapter + art
```

### Phase 4: Production
```
User: Produce Book 1 for publication

Arcanea fires:
├── Format Master → ePub, PDF, web versions
├── Visual Director → Cover art, interior illustrations
├── Sound Designer → Companion soundtrack
└── Publisher → Metadata, descriptions, distribution prep

Output: Publish-ready package
```

---

## Hooks (Like oh-my-opencode)

### Canon Enforcement Hook
```typescript
// Runs after any entity write
PostToolUse: {
  matcher: "Write|Edit",
  path: "**/*.arc",
  action: "validate_against_canon"
}
```

### Consistency Continuation Hook
```typescript
// Forces completion like Sisyphus's todo continuation
Stop: {
  condition: "incomplete_entities OR unresolved_contradictions",
  action: "force_continue_until_consistent"
}
```

### Writing Quality Hook
```typescript
// Like comment-checker but for prose
PostToolUse: {
  matcher: "Write",
  path: "chapters/**/*.md",
  action: "check_prose_quality"
}
```

---

## Claude Code Compatibility

Like oh-my-opencode, Arcanea works with **both OpenCode AND Claude Code**:

### Shared Locations
- `~/.claude/agents/*.md` - Custom agents
- `~/.claude/skills/*/SKILL.md` - Skills
- `~/.claude/commands/*.md` - Slash commands
- `./.claude/settings.json` - Hooks
- `./.mcp.json` - MCP configs

### Installation
```bash
# For OpenCode users
bunx arcanea-opencode install

# For Claude Code users  
bunx arcanea-opencode install --claude-code

# Works with both!
```

---

## Comparison: What We Built vs. What We Need

### Current State (v1.0 - Config Only)
- ✅ Agent markdown files
- ✅ Skills files
- ✅ Slash commands
- ❌ No actual plugin code
- ❌ No hooks implementation
- ❌ No MCP integration
- ❌ No CLI installer

### Target State (v2.0 - Full Plugin)
- ✅ All of v1.0
- ✅ Full plugin like oh-my-opencode
- ✅ Hooks (canon enforcement, quality checks)
- ✅ MCP integrations (Nano Banana, Suno, custom)
- ✅ CLI installer
- ✅ Works with OpenCode AND Claude Code
- ✅ `ultraworld`, `ultrawrite`, `ultrabook` keywords

---

## Implementation Roadmap

### Phase 1: Foundation (This Week)
1. Rename "The Weaver" → "Arcanea" throughout
2. Add Writing/Editing team agents
3. Add Production team agents
4. Update slash commands

### Phase 2: Plugin Development (Next Week)
1. Fork oh-my-opencode structure
2. Implement Arcanea-specific hooks
3. Add MCP integrations
4. Create CLI installer

### Phase 3: Canon Tools (Week 3)
1. Build arcanea-mcp server
2. Implement consistency validation
3. Add relationship mapping
4. Create timeline tools

### Phase 4: Production Pipeline (Week 4)
1. Integrate Nano Banana for visuals
2. Integrate Suno for music
3. Build export formatters
4. Create distribution tools

---

## The Promise

**"Sisyphus writes code indistinguishable from senior engineers.**
**Arcanea creates worlds indistinguishable from master storytellers."**

Just include `ultraworld` in your prompt. Arcanea handles the rest.

---

*Where anyone can create anything, and imagination becomes reality.*
