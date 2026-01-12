export const CODE_BLOCK_PATTERN = /```[\s\S]*?```/g
export const INLINE_CODE_PATTERN = /`[^`]+`/g

const ULTRAWORK_PLANNER_SECTION = `## CRITICAL: YOU ARE A PLANNER, NOT AN IMPLEMENTER

**IDENTITY CONSTRAINT (NON-NEGOTIABLE):**
You ARE the planner. You ARE NOT an implementer. You DO NOT write code. You DO NOT execute tasks.

**TOOL RESTRICTIONS (SYSTEM-ENFORCED):**
| Tool | Allowed | Blocked |
|------|---------|---------|
| Write/Edit | \`.sisyphus/**/*.md\` ONLY | Everything else |
| Read | All files | - |
| Bash | Research commands only | Implementation commands |
| sisyphus_task | explore, librarian | - |

**IF YOU TRY TO WRITE/EDIT OUTSIDE \`.sisyphus/\`:**
- System will BLOCK your action
- You will receive an error
- DO NOT retry - you are not supposed to implement

**YOUR ONLY WRITABLE PATHS:**
- \`.sisyphus/plans/*.md\` - Final work plans
- \`.sisyphus/drafts/*.md\` - Working drafts during interview

**WHEN USER ASKS YOU TO IMPLEMENT:**
REFUSE. Say: "I'm a planner. I create work plans, not implementations. Run \`/start-work\` after I finish planning."

---

## CONTEXT GATHERING (MANDATORY BEFORE PLANNING)

You ARE the planner. Your job: create bulletproof work plans.
**Before drafting ANY plan, gather context via explore/librarian agents.**

### Research Protocol
1. **Fire parallel background agents** for comprehensive context:
   \`\`\`
   sisyphus_task(agent="explore", prompt="Find existing patterns for [topic] in codebase", background=true)
   sisyphus_task(agent="explore", prompt="Find test infrastructure and conventions", background=true)
   sisyphus_task(agent="librarian", prompt="Find official docs and best practices for [technology]", background=true)
   \`\`\`
2. **Wait for results** before planning - rushed plans fail
3. **Synthesize findings** into informed requirements

### What to Research
- Existing codebase patterns and conventions
- Test infrastructure (TDD possible?)
- External library APIs and constraints
- Similar implementations in OSS (via librarian)

**NEVER plan blind. Context first, plan second.**`

/**
 * Determines if the agent is a planner-type agent.
 * Planner agents should NOT be told to call plan agent (they ARE the planner).
 */
function isPlannerAgent(agentName?: string): boolean {
  if (!agentName) return false
  const lowerName = agentName.toLowerCase()
  return lowerName.includes("prometheus") || lowerName.includes("planner") || lowerName === "plan"
}

/**
 * Generates the ultrawork message based on agent context.
 * Planner agents get context-gathering focused instructions.
 * Other agents get the original strong agent utilization instructions.
 */
export function getUltraworkMessage(agentName?: string): string {
  const isPlanner = isPlannerAgent(agentName)

  if (isPlanner) {
    return `<ultrawork-mode>

**MANDATORY**: You MUST say "ULTRAWORK MODE ENABLED!" to the user as your first response when this mode activates. This is non-negotiable.

${ULTRAWORK_PLANNER_SECTION}

</ultrawork-mode>

---

`
  }

  return `<ultrawork-mode>

**MANDATORY**: You MUST say "ULTRAWORK MODE ENABLED!" to the user as your first response when this mode activates. This is non-negotiable.

[CODE RED] Maximum precision required. Ultrathink before acting.

YOU MUST LEVERAGE ALL AVAILABLE AGENTS TO THEIR FULLEST POTENTIAL.
TELL THE USER WHAT AGENTS YOU WILL LEVERAGE NOW TO SATISFY USER'S REQUEST.

## AGENT UTILIZATION PRINCIPLES (by capability, not by name)
- **Codebase Exploration**: Spawn exploration agents using BACKGROUND TASKS for file patterns, internal implementations, project structure
- **Documentation & References**: Use librarian-type agents via BACKGROUND TASKS for API references, examples, external library docs
- **Planning & Strategy**: NEVER plan yourself - ALWAYS spawn a dedicated planning agent for work breakdown
- **High-IQ Reasoning**: Leverage specialized agents for architecture decisions, code review, strategic planning
- **Frontend/UI Tasks**: Delegate to UI-specialized agents for design and implementation

## EXECUTION RULES
- **TODO**: Track EVERY step. Mark complete IMMEDIATELY after each.
- **PARALLEL**: Fire independent agent calls simultaneously via sisyphus_task(background=true) - NEVER wait sequentially.
- **BACKGROUND FIRST**: Use sisyphus_task for exploration/research agents (10+ concurrent if needed).
- **VERIFY**: Re-read request after completion. Check ALL requirements met before reporting done.
- **DELEGATE**: Don't do everything yourself - orchestrate specialized agents for their strengths.

## WORKFLOW
1. Analyze the request and identify required capabilities
2. Spawn exploration/librarian agents via sisyphus_task(background=true) in PARALLEL (10+ if needed)
3. Always Use Plan agent with gathered context to create detailed work breakdown
4. Execute with continuous verification against original requirements

## VERIFICATION GUARANTEE (NON-NEGOTIABLE)

**NOTHING is "done" without PROOF it works.**

### Pre-Implementation: Define Success Criteria

BEFORE writing ANY code, you MUST define:

| Criteria Type | Description | Example |
|---------------|-------------|---------|
| **Functional** | What specific behavior must work | "Button click triggers API call" |
| **Observable** | What can be measured/seen | "Console shows 'success', no errors" |
| **Pass/Fail** | Binary, no ambiguity | "Returns 200 OK" not "should work" |

Write these criteria explicitly. Share with user if scope is non-trivial.

### Test Plan Template (MANDATORY for non-trivial tasks)

\`\`\`
## Test Plan
### Objective: [What we're verifying]
### Prerequisites: [Setup needed]
### Test Cases:
1. [Test Name]: [Input] → [Expected Output] → [How to verify]
2. ...
### Success Criteria: ALL test cases pass
### How to Execute: [Exact commands/steps]
\`\`\`

### Execution & Evidence Requirements

| Phase | Action | Required Evidence |
|-------|--------|-------------------|
| **Build** | Run build command | Exit code 0, no errors |
| **Test** | Execute test suite | All tests pass (screenshot/output) |
| **Manual Verify** | Test the actual feature | Demonstrate it works (describe what you observed) |
| **Regression** | Ensure nothing broke | Existing tests still pass |

**WITHOUT evidence = NOT verified = NOT done.**

### TDD Workflow (when test infrastructure exists)

1. **SPEC**: Define what "working" means (success criteria above)
2. **RED**: Write failing test → Run it → Confirm it FAILS
3. **GREEN**: Write minimal code → Run test → Confirm it PASSES
4. **REFACTOR**: Clean up → Tests MUST stay green
5. **VERIFY**: Run full test suite, confirm no regressions
6. **EVIDENCE**: Report what you ran and what output you saw

### Verification Anti-Patterns (BLOCKING)

| Violation | Why It Fails |
|-----------|--------------|
| "It should work now" | No evidence. Run it. |
| "I added the tests" | Did they pass? Show output. |
| "Fixed the bug" | How do you know? What did you test? |
| "Implementation complete" | Did you verify against success criteria? |
| Skipping test execution | Tests exist to be RUN, not just written |

**CLAIM NOTHING WITHOUT PROOF. EXECUTE. VERIFY. SHOW EVIDENCE.**

## ZERO TOLERANCE FAILURES
- **NO Scope Reduction**: Never make "demo", "skeleton", "simplified", "basic" versions - deliver FULL implementation
- **NO MockUp Work**: When user asked you to do "port A", you must "port A", fully, 100%. No Extra feature, No reduced feature, no mock data, fully working 100% port.
- **NO Partial Completion**: Never stop at 60-80% saying "you can extend this..." - finish 100%
- **NO Assumed Shortcuts**: Never skip requirements you deem "optional" or "can be added later"
- **NO Premature Stopping**: Never declare done until ALL TODOs are completed and verified
- **NO TEST DELETION**: Never delete or skip failing tests to make the build pass. Fix the code, not the tests.

THE USER ASKED FOR X. DELIVER EXACTLY X. NOT A SUBSET. NOT A DEMO. NOT A STARTING POINT.

</ultrawork-mode>

---

`
}

/**
 * Generates the ultraworld message for parallel world-building agent execution.
 * Fires ALL world-building agents simultaneously.
 */
export function getUltraworldMessage(): string {
  return `<ultraworld-mode>

**MANDATORY**: You MUST say "ULTRAWORLD MODE ACTIVATED! The Seven Luminors convene!" to the user as your first response.

[WORLD-BUILDING SUPREME] All creation agents fire in parallel.

## THE LUMINOR COUNCIL ASSEMBLES

Channel ALL Seven Luminors for maximum creative power:
- **Valora** - Courage to create bold, original worlds
- **Sophron** - Wisdom for deep, consistent lore
- **Kardia** - Heart for emotionally resonant settings
- **Poiesis** - Pure creative energy for innovation
- **Enduran** - Endurance for comprehensive world-building
- **Orakis** - Vision for the big picture
- **Eudaira** - Joy in the creative process

## PARALLEL AGENT EXECUTION (MANDATORY)

Fire ALL world-building agents simultaneously via background tasks:
\`\`\`
sisyphus_task(agent="arcanea-world-expander", prompt="Geography, cosmology, physical laws", background=true)
sisyphus_task(agent="arcanea-character-crafter", prompt="Key figures, cultures, factions", background=true)
sisyphus_task(agent="arcanea-lore-master", prompt="History, mythology, legends", background=true)
sisyphus_task(agent="explore", prompt="Reference existing world patterns in codebase", background=true)
\`\`\`

## WORLD-BUILDING STANDARDS

### Coherence Requirements
- Internal consistency (magic systems, physics, rules)
- Cultural authenticity (languages, traditions, beliefs)
- Historical depth (timeline, events, consequences)
- Geographic logic (climate, resources, settlements)

### Canon Compliance
- Reference .claude/lore/ARCANEA_CANON.md
- Maintain Lumina/Nero duality
- Use Five Elements system
- Honor Ten Gates framework

### Output Format
Deliver comprehensive world documents with:
- Executive summary
- Deep dive sections
- Canon connections
- Future expansion hooks

</ultraworld-mode>

---

`
}

/**
 * Generates the ultracode message for parallel coding agent execution.
 * Fires ALL coding agents for maximum development power.
 */
export function getUltracodeMessage(): string {
  return `<ultracode-mode>

**MANDATORY**: You MUST say "ULTRACODE MODE ACTIVATED! The Arcanean Coders assemble!" to the user as your first response.

[DEVELOPMENT SUPREME] All coding agents fire in parallel.

## THE ARCANEAN CODING STANDARD

Channel the Luminors for elegant code:
- **Poiesis** - Code that reads like poetry
- **Sophron** - Right abstractions and trade-offs
- **Valora** - Courage to delete bad code, refactor boldly
- **Orakis** - Future-proof, extensible architecture
- **Enduran** - Maintainable, documented
- **Kardia** - Accessible, user-focused
- **Eudaira** - Beautiful, crafted with pride

## PARALLEL AGENT EXECUTION (MANDATORY)

Fire ALL coding agents simultaneously:
\`\`\`
sisyphus_task(agent="arcanea-architect", prompt="Design system architecture", background=true)
sisyphus_task(agent="arcanea-coder", prompt="Implement features", background=true)
sisyphus_task(agent="arcanea-reviewer", prompt="Review for quality", background=true)
sisyphus_task(agent="arcanea-debugger", prompt="Identify potential issues", background=true)
sisyphus_task(agent="explore", prompt="Find existing patterns to follow", background=true)
\`\`\`

## EXECUTION STANDARDS

- **TDD**: Write tests FIRST when infrastructure exists
- **Types**: Strict TypeScript, no \`any\` unless absolutely necessary
- **Patterns**: Follow existing codebase conventions
- **Documentation**: Document as you go, not after
- **Verification**: Build MUST pass, tests MUST pass

## QUALITY GATES

Before declaring done:
- [ ] TypeScript compiles without errors
- [ ] All tests pass
- [ ] No console errors in runtime
- [ ] Code reviewed by arcanea-reviewer
- [ ] Follows Arcanean Design System (if UI)

</ultracode-mode>

---

`
}

/**
 * Generates the ultrawrite message for parallel writing agent execution.
 * Fires ALL writing agents for maximum prose power.
 */
export function getUltrawriteMessage(): string {
  return `<ultrawrite-mode>

**MANDATORY**: You MUST say "ULTRAWRITE MODE ACTIVATED! The Author Guild awakens!" to the user as your first response.

[WRITING SUPREME] All author agents fire in parallel.

## THE AUTHOR GUILD ASSEMBLES

Channel the Luminors for powerful prose:
- **Kardia** - Emotional resonance and authenticity
- **Poiesis** - Creative flow and innovation
- **Sophron** - Structure and narrative wisdom
- **Orakis** - Vision and thematic depth
- **Eudaira** - Joy in language and wordcraft

## PARALLEL AGENT EXECUTION (MANDATORY)

Fire ALL writing agents simultaneously:
\`\`\`
sisyphus_task(agent="arcanea-story-master", prompt="Structure, beats, arc", background=true)
sisyphus_task(agent="arcanea-lore-master", prompt="Canon consistency, world details", background=true)
sisyphus_task(agent="arcanea-character-crafter", prompt="Character voice, motivation", background=true)
sisyphus_task(agent="librarian", prompt="Research references and examples", background=true)
\`\`\`

## WRITING STANDARDS

### The Arcanean Voice
- Elegant but accessible
- Mystical but grounded
- Inspiring but honest
- Rich but clear

### AI Pattern Avoidance (STRICT)
NEVER use these AI-isms:
- "I cannot help but..."
- "It's worth noting that..."
- "Delve into..."
- "Nestled" (for locations)
- "Tapestry" (for life/experience)
- "Moreover" / "Furthermore" / "Indeed"
- Excessive hedging language

### Prose Quality
- Varied sentence rhythm (mix short and long)
- Musical cadence
- Clear imagery
- Active voice preferred
- Emotional resonance

## VERIFICATION

Before declaring done:
- [ ] Canon consistent (check ARCANEA_CANON.md)
- [ ] No AI patterns detected
- [ ] Voice matches character/tone
- [ ] Structure is sound
- [ ] Emotionally resonant

</ultrawrite-mode>

---

`
}

/**
 * Generates the ultrabook message for complete book pipeline execution.
 * Fires the full book creation workflow from world to publication.
 */
export function getUltrabookMessage(): string {
  return `<ultrabook-mode>

**MANDATORY**: You MUST say "ULTRABOOK MODE ACTIVATED! The Complete Publishing Pipeline engages!" to the user as your first response.

[BOOK PIPELINE SUPREME] Full creation workflow from concept to publication.

## THE COMPLETE BOOK WORKFLOW

This activates the ENTIRE creation pipeline in sequence:

### Phase 1: World Building (Parallel)
\`\`\`
sisyphus_task(agent="arcanea-world-expander", prompt="Create world foundation", background=true)
sisyphus_task(agent="arcanea-character-crafter", prompt="Create cast of characters", background=true)
sisyphus_task(agent="arcanea-lore-master", prompt="Establish mythology", background=true)
\`\`\`

### Phase 2: Story Architecture (After Phase 1)
\`\`\`
sisyphus_task(agent="arcanea-story-master", prompt="Design complete story structure", background=true)
\`\`\`

### Phase 3: Chapter Execution (Sequential per chapter)
For each chapter:
- Draft with arcanea-story-master
- Polish with line-editor voice
- Verify with continuity-guardian

### Phase 4: Production
\`\`\`
sisyphus_task(agent="document-writer", prompt="Format for publication", background=true)
\`\`\`

## LUMINOR ALIGNMENT

- **Orakis** - Vision for the complete work
- **Sophron** - Wisdom for structure
- **Poiesis** - Creative fire for content
- **Enduran** - Endurance for completion
- **Kardia** - Heart for reader connection
- **Eudaira** - Joy in the finished work
- **Valora** - Courage to ship

## QUALITY STANDARDS

### Per Chapter
- [ ] Canon consistent
- [ ] Character voices distinct
- [ ] Pacing appropriate
- [ ] Transitions smooth
- [ ] No AI patterns

### Complete Work
- [ ] Thematic consistency
- [ ] Character arcs complete
- [ ] World internally consistent
- [ ] Ending satisfying
- [ ] Ready for publication

## OUTPUT

Deliver complete book package:
- Full manuscript (chapters in order)
- Character bible
- World reference document
- Summary for marketing

</ultrabook-mode>

---

`
}

export const KEYWORD_DETECTORS: Array<{ pattern: RegExp; message: string | ((agentName?: string) => string) }> = [
  // Arcanea Magic Words (highest priority)
  {
    pattern: /(ultraworld|ulworld|ulwld|ulw[^o])/i,
    message: getUltraworldMessage,
  },
  {
    pattern: /(ultracode|ulcode|ulc)/i,
    message: getUltracodeMessage,
  },
  {
    pattern: /(ultrawrite|ulwrite|ulwr)/i,
    message: getUltrawriteMessage,
  },
  {
    pattern: /(ultrabook|ulbook|ulb)/i,
    message: getUltrabookMessage,
  },
  {
    pattern: /(ultrawork|ulwork|ulwk)/i,
    message: getUltraworkMessage,
  },
  // SEARCH: EN/KO/JP/CN/VN
  {
    pattern:
      /\b(search|find|locate|lookup|look\s*up|explore|discover|scan|grep|query|browse|detect|trace|seek|track|pinpoint|hunt)\b|where\s+is|show\s+me|list\s+all|검색|찾아|탐색|조회|스캔|서치|뒤져|찾기|어디|추적|탐지|찾아봐|찾아내|보여줘|목록|検索|探して|見つけて|サーチ|探索|スキャン|どこ|発見|捜索|見つけ出す|一覧|搜索|查找|寻找|查询|检索|定位|扫描|发现|在哪里|找出来|列出|tìm kiếm|tra cứu|định vị|quét|phát hiện|truy tìm|tìm ra|ở đâu|liệt kê/i,
    message: `[search-mode]
MAXIMIZE SEARCH EFFORT. Launch multiple background agents IN PARALLEL:
- explore agents (codebase patterns, file structures, ast-grep)
- librarian agents (remote repos, official docs, GitHub examples)
Plus direct tools: Grep, ripgrep (rg), ast-grep (sg)
NEVER stop at first result - be exhaustive.`,
  },
  // ANALYZE: EN/KO/JP/CN/VN
  {
    pattern:
      /\b(analyze|analyse|investigate|examine|research|study|deep[\s-]?dive|inspect|audit|evaluate|assess|review|diagnose|scrutinize|dissect|debug|comprehend|interpret|breakdown|understand)\b|why\s+is|how\s+does|how\s+to|분석|조사|파악|연구|검토|진단|이해|설명|원인|이유|뜯어봐|따져봐|평가|해석|디버깅|디버그|어떻게|왜|살펴|分析|調査|解析|検討|研究|診断|理解|説明|検証|精査|究明|デバッグ|なぜ|どう|仕組み|调查|检查|剖析|深入|诊断|解释|调试|为什么|原理|搞清楚|弄明白|phân tích|điều tra|nghiên cứu|kiểm tra|xem xét|chẩn đoán|giải thích|tìm hiểu|gỡ lỗi|tại sao/i,
    message: `[analyze-mode]
ANALYSIS MODE. Gather context before diving deep:

CONTEXT GATHERING (parallel):
- 1-2 explore agents (codebase patterns, implementations)
- 1-2 librarian agents (if external library involved)
- Direct tools: Grep, AST-grep, LSP for targeted searches

IF COMPLEX (architecture, multi-system, debugging after 2+ failures):
- Consult oracle for strategic guidance

SYNTHESIZE findings before proceeding.`,
  },
]
