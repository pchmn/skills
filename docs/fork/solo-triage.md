# Solo triage

Triage keeps three states (`needs-triage`, `ready-for-agent`, `wontfix`) for issues only, with no `needs-info`, `ready-for-human`, external PRs or AI disclaimer. Moving to `ready-for-agent` rewrites the issue body as the agent brief; a `wontfix` keeps its one-line comment and `.out-of-scope/`. Every issue is created with its state and category labels. (PR #1)

## Upstream hooks
- `skills/engineering/triage/SKILL.md`: rewritten whole; "Three **state** roles", "rewrite the issue's body as an agent brief"
- `skills/engineering/triage/AGENT-BRIEF.md`: the opening paragraph ("what the issue's body becomes"); the PR example removed
- `skills/engineering/triage/OUT-OF-SCOPE.md`: "When to write to `.out-of-scope/`": the sentence on enhancement PRs removed
- `skills/engineering/setup-matt-pocock-skills/triage-labels.md` and `docs/agents/triage-labels.md`: the three-state table with categories
- `skills/engineering/setup-matt-pocock-skills/SKILL.md`: "three canonical triage states and the two categories"; the "PRs as a request surface" sentence removed from Section A
- `skills/engineering/setup-matt-pocock-skills/issue-tracker-github.md` and `issue-tracker-gitlab.md`: `--label <state>`, "Rewrite an issue's body"; the "request surface" sections removed
- `skills/engineering/setup-matt-pocock-skills/issue-tracker-local.md`: "`Status:` and `Category:` lines"
- `skills/engineering/to-tickets/SKILL.md`: "its category label"; `**Category:**` in the local ticket template
- `skills/engineering/to-spec/SKILL.md`: "the `enhancement` category label"
- `skills/engineering/ask-matt/SKILL.md`: "Triage is for issues still labelled `needs-triage`"
- `docs/engineering/triage.md`: rewritten whole
- `docs/engineering/to-tickets.md`, `docs/engineering/setup-matt-pocock-skills.md`: the state and label wording

## On conflict
- `triage/SKILL.md` and `docs/engineering/triage.md` are fork-owned: take the fork's file, then port any upstream change that does not touch states, reporters or PRs (a new check in "Gather context", a fix to the redundancy search).
- Elsewhere, keep upstream's change and re-apply the fork's sentence.
- A new upstream feature built on `needs-info`, `ready-for-human` or PR triage is dropped or adapted to the three states.

## Verify
- `grep -rn "needs-info\|ready-for-human\|request surface" skills/engineering` matches nothing.
- `/triage` on a `needs-triage` issue: it rewrites the body, swaps the label, and posts no comment.
