# Arcanea Mission Command

Execute the full Arcanea build mission. This is a comprehensive task that validates, fixes, documents, and advances the Arcanea ecosystem.

## Phase 0 — VALIDATE (Do First)

1. Read `OPENCODE_INSTRUCTIONS.md` for full context
2. Read `.arcanea/lore/CANON_LOCKED.md` for canonical truth
3. Run `pnpm install` from monorepo root
4. Run `pnpm build` — fix any TypeScript errors
5. Run `pnpm test` — ensure all tests pass
6. Run `tsc --noEmit` in `apps/web/`
7. Report findings before proceeding

## Phase 1 — FIX & HARDEN

For each package in `packages/`:
1. Check TypeScript strict compliance (no `any`)
2. Verify exports in package.json
3. Run package-level tests
4. Fix any issues found

Priority packages (intelligence layer):
- council, guardian-evolution, guardian-memory, rituals
- creative-pipeline, swarm-coordinator, hybrid-memory
- intelligence-bridge, sona-learner, token-optimizer

## Phase 2 — DOCUMENT

Generate `STATUS_REPORT.md` with:
- Package health matrix (build/test/types)
- What's working perfectly
- What needs attention
- Architecture diagram
- Recommended next steps

## Phase 3 — ADVANCE

Continue Phase 4 absorption from arcanea-flow:
- Port remaining CLI patterns (26 commands)
- Port background worker patterns (12 workers)
- Expand consensus algorithms
- Create integration tests

## Phase 4 — WEB APP

- Fix `apps/web/` build errors
- Verify Academy Gate Quiz functionality
- Check Library content loader
- Validate Supabase migrations

Report progress after each phase. Use todos obsessively.
