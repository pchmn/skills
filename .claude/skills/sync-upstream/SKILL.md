---
name: sync-upstream
description: Merge mattpocock/skills into the fork's main through a reviewed sync PR.
disable-model-invocation: true
---

Merge `upstream/main` into the fork, run the fork's sync check, open a sync PR, and merge it once it is **safe**. The "Upstream sync check" section of [`docs/fork/README.md`](../../../docs/fork/README.md) is the checklist this skill runs and wins where this file disagrees. Read it and `CLAUDE.md` first.

A sync lands as a merge commit, never a rebase or a squash: the merge keeps `upstream/main` as a parent, which moves the merge-base forward.

## 1. Preflight

`origin` must be `pchmn/skills` and `upstream` must be `mattpocock/skills`. If either remote is missing or points elsewhere, stop and tell the user how to rename them.

```sh
git fetch origin && git fetch upstream
git rev-list --count origin/main..upstream/main
gh pr list -R pchmn/skills --state open --search 'head:chore/sync-upstream' --json number,headRefName,url
```

Pass `-R pchmn/skills` to every `gh` command: in a fork, `gh` defaults to the upstream parent, and nothing of this sync goes to `mattpocock/skills`.

Stop with a one-line report when the count is 0 (nothing to sync) or a `chore/sync-upstream*` PR is already open (link it).

## 2. Merge in a worktree

```sh
MB=$(git merge-base origin/main upstream/main)   # the "previous merge-base" of the checklist
git worktree add .worktrees/sync-upstream-<YYYY-MM-DD> -b chore/sync-upstream-<YYYY-MM-DD> origin/main
git -C .worktrees/sync-upstream-<YYYY-MM-DD> merge --no-ff upstream/main -m "chore: merge upstream/main into fork"
```

Work in that worktree from here on. Resolve each conflict per the **On conflict** section of the entry that names the file. Take upstream's side for the release files, which the fork never bumps itself: `CHANGELOG.md`, the `version` in `package.json` and `.claude-plugin/plugin.json`. Note every conflicted file and how you resolved it: any conflict makes the sync not safe.

## 3. Sync check

Run every step of the checklist in `docs/fork/README.md` with `$MB` as the previous merge-base and `HEAD` as the fork side. For each feature at risk, search each hook's phrase in the merged file, read the paragraph around it (a merge without conflict can leave upstream's sentence and the fork's side by side), run its **Verify** greps, and give a verdict: **intact**, **repaired** (say how), **superseded by upstream**, or **broken**. Repairing a hook means updating that feature's entry on the same branch.

Done when every feature at risk has a verdict and the coverage list is either empty or explained.

## 4. Checks

`npm ci`, then `npm run check-plugin-version` and `claude plugin validate . --strict`. For each failure, rerun the same check on `origin/main` (a throwaway worktree) and record whether it fails there identically; a pre-existing failure does not block.

## 5. Decide

The sync is **safe** only if all hold:

- no conflict outside the release files;
- every check passes, or fails identically on `origin/main`;
- every feature at risk is **intact**;
- the coverage list is empty.

Anything else (a conflict, a repaired, superseded or broken feature, an uncovered file, a new failure) makes it **needs review**, with the reason.

## 6. Open the PR

Commit any repair or manifest update on the branch, push it to `origin`, and open the PR with `gh pr create -R pchmn/skills --base main --head chore/sync-upstream-<YYYY-MM-DD> --title 'chore: sync with upstream (<YYYY-MM-DD>)' --body-file <file>`. The body holds:

- `⚠️ Needs review: <reason>` as its first line when the sync is not safe;
- the upstream range (`$MB..upstream/main`, commit count) and the upstream versions it spans, from `CHANGELOG.md`;
- upstream's changes grouped by skill, those touching a file the manifest names first; new skills and renamed or removed ones in one line each;
- whether the set-up repos should re-run `/setup-matt-pocock-skills`: yes when a seed file of that skill changed (`agent-skills-block.md`, `domain.md`, `triage-labels.md`, `issue-tracker-*.md`);
- check results, conflicts and their resolution, features at risk with verdicts, coverage report;
- the merge decision, then the Claude Code attribution line.

## 7. Merge

Give the user the same report in a few lines with the PR link.

- **Safe**: ask for confirmation, then `gh pr merge <number> -R pchmn/skills --merge --delete-branch`. Use `--merge` only: `--squash` and `--rebase` break the fork's ancestry with upstream.
- **Needs review**: leave the PR open and list what the user must look at.

Leave the worktree in place: it is cleaned up with its session.
