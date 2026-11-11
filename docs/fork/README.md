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

## Upstream sync check

Sync with `git merge upstream/main`, and land a sync PR with a merge commit, never a squash: a squash drops `upstream/main` as a parent, so the merge-base stays put and the next sync replays every upstream change since. Feature PRs can still be squashed.

Run after the merge, before pushing (the `/sync-upstream` skill runs the whole sync end to end):

1. List the upstream files the sync changed: `git diff --name-only <previous merge-base> upstream/main`.
2. Find the features at risk: entries whose **Upstream hooks** name one of those files (`grep -l <path> docs/fork/*.md`).
3. For each feature at risk:
   - every hook's phrase is still there: a merge without conflict can still bring back upstream's wording beside the fork's, or drop the fork's sentence when upstream rewrote the paragraph around it;
   - upstream's own change to that file is carried over, per the entry's **On conflict**;
   - upstream has not shipped the same behaviour; if it has, propose dropping the fork version rather than keeping both.
4. Renames: read the new `CHANGELOG.md` entries. A skill or seed file upstream renamed or moved takes its fork edits along, and the entries' paths follow.
5. Coverage: every upstream file in `git diff --name-only upstream/main...main` appears in at least one entry, `.changeset/` and `docs/fork/` aside. Report any that does not.
6. `claude plugin validate . --strict` passes.

Done when every feature at risk has a verdict: **intact**, **repaired** (say how), **superseded by upstream**, or **broken** (needs a human), and the coverage report lists no unexplained file.
