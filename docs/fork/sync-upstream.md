# Sync upstream

`/sync-upstream` merges a fork's upstream through a reviewed sync PR, driven by the fork's `docs/fork/` manifest and its `## Sync settings`. Generic: any fork with a manifest uses it, this one included. (PR #2)

## Fork files
- `skills/misc/sync-upstream/SKILL.md`
- `skills/misc/sync-upstream/MANIFEST-TEMPLATE.md`: the manifest README a fork starts from
- `skills-lock.json`, `.claude/skills/sync-upstream/`: this fork's own install of the skill (`npx skills update` after changing it)

## Upstream hooks
- `skills/misc/README.md`: "**[sync-upstream]**" entry

## On conflict
- Keep upstream's entries and the fork's line.

## Verify
- `grep -n "sync-upstream" skills/misc/README.md` matches.
- In a fork with a manifest, `/sync-upstream` with nothing new upstream stops at the preflight with "nothing to sync".
