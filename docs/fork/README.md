# Fork manifest

This repo is a fork of [mattpocock/skills](https://github.com/mattpocock/skills) (the `upstream` remote), fitted to a maintainer who files their own issues and works in pnpm monorepos. One file per fork feature: what it changes, which upstream text it rewrites, and how to check it still holds. `git log upstream/main..main` holds the history; this folder holds the intent and the coupling, which the history does not show.

## Entry format

```md
# <Feature name>

<Behaviour the fork gives, 1 to 3 lines.> (PRs #N, #M)

## Fork files
- `path/to/new-file.md`: role, when not obvious from the name

## Upstream hooks
- `path/to/upstream-file.md`: "<heading or phrase to search for>": what the fork text says there

## On conflict
- <which side wins, and what of upstream's change to carry over>

## Verify
- <one concrete check: a grep, or a skill run on a repo>
```

Name each hook by a heading or a phrase to search for, never by line number: line numbers drift on every upstream merge. A hook is any edit to a file that also exists upstream.

## Keeping it current

A PR that adds, changes or removes fork behaviour updates its entry in the same PR (new feature: new file; feature dropped: delete the file).

## Sync settings

Read by `/sync-upstream` (installed from this repo's `skills/misc/sync-upstream`), which merges upstream through a reviewed PR and runs the sync check.

- **Upstream**: `mattpocock/skills`
- **Fork**: `pchmn/skills`
- **Install**: `npm ci`
- **Checks**: `npm run check-plugin-version`, `claude plugin validate . --strict`
- **Release files**: `CHANGELOG.md`, the `version` in `package.json` and in `.claude-plugin/plugin.json`
- **Ignored paths**: `.changeset/`
- **PR summary**: upstream's changes grouped by skill, those touching a file an entry names first; new, renamed or removed skills in one line each; the upstream versions spanned, from `CHANGELOG.md`; and whether the set-up repos should re-run `/setup-matt-pocock-skills` (yes when one of its seed files changed: `agent-skills-block.md`, `domain.md`, `triage-labels.md`, `issue-tracker-*.md`).
- **Extra checks**: for each entry at risk whose hooks are prose, run its **Verify** greps, since prose has no test to fail.
