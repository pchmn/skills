<!-- Title is a conventional commit: `<type>(<scope>): <subject>` -->

## Related Issues

<!-- Link related tickets or issues. Use "Closes #123" to auto-close. -->
- Fixes #<issue> (Resolves the issue)
  or
- Closes #<issue> (Resolves the issue)
  and/or
- Refs #<issue> (Does not resolve the issue, but is related)

## Description

<!-- What this PR does and why, for a reader who has not read the ticket. Describe the behaviour, not the code. -->

## Changes Made

<!-- One behaviour change per line. An acceptance criterion met differently from the ticket, or left out, is named here. -->

-

## Merge Danger

<!-- Tells the reviewer how slowly to read. Be most careful before writing "two-way" and a small blast radius: you are grading your own change. -->

**Door:** <!-- One-way: hard to undo once merged (data or a file format written, a public API or contract changed or removed, something deleted or sent outward, or anything the repo's docs list as one-way). Two-way: a revert undoes it. Name what makes it one-way. -->

**Blast radius:** <!-- What breaks if this is wrong, and for whom. -->

**Not covered:** <!-- Risks that no test or check in this PR verifies. "None" when there is none. -->

## Code Summary

<!-- The shape of the code change, readable before the diff. Pick the smallest view that shows it: pseudocode, a call tree, a component tree, a file tree, a Mermaid diagram, or a `diff` of one of these. Keep only the calls, files and boundaries a reviewer needs. One view, rarely more. -->

## Review Guide

**Read first**

<!-- 2 to 5 places, in reading order, as `path:symbol`, each with one line on why a human should read it closely. -->
-

**Skim**

<!-- What follows mechanically from the places above: tests that mirror the code, renames, re-exports, docs. -->
-

**Decisions made here**

<!-- Each choice the ticket, the spec and the docs of record left open, with the option set aside; then each code-review finding left as it is, with why. "None" when there is none. -->
-

## Evidence

<!-- Before and after. A screenshot when the change is visual; otherwise the test that failed before and passes now, as pseudocode, or the output that changed. "Tests pass" alone is not evidence. -->

## Test plan

<!-- The checks that ran, then the ones left to do by hand, step by step. -->

- [ ]
