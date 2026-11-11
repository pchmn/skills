## Agent skills

### Issue tracker

[one-line summary of where issues are tracked]. See `docs/agents/issue-tracker.md`.

A change with no decision to record and no work to defer, that fits in one commit, skips the ticket and goes straight to a PR. Anything else gets its ticket first.

### Triage labels

[one-line summary of the label vocabulary]. See `docs/agents/triage-labels.md`.

### Domain docs

[one-line summary of layout: "single-context" or "multi-context"]. Read `docs/agents/domain.md` before exploring an area, and when a change runs into an ADR.

### Grilling

Ask each round of a grilling session (`grilling`, `grill-with-docs`) through the `interactive-form` skill rather than in the chat, unless the user asks for the terminal.

### Branching

One branch per ticket, cut from `origin/main`: `<type>/<issue-number>-<slug>`, where `<type>` is the conventional-commit type of the work and `<slug>` is the kebab-cased ticket title. A ticketless change takes `<type>/<slug>`. Implementation commits land on that branch, never directly on `main`.

Start every branch in its own git worktree under `.worktrees/`, named after the branch, never by switching branches in the main checkout: another session may be working there. Cut it from a fresh `origin/main`, because a local `main` lags behind the PRs merged since; only work that builds on another branch starts from that branch.

### Pull requests

One PR per ticket or ticketless change, opened against `main`. Its title is a conventional commit, `<type>(<scope>): <subject>`, because a squash merge takes the title. Its body follows `.github/pull_request_template.md` when the repo has one.

Before opening the PR, run the `code-review` skill on the branch since its merge-base with `main`, and fix what it finds or say in the PR why you left it.

Everything written to the tracker is in English, whatever the language of the conversation: a ticket, a PR title, a PR body, a comment. The code, the commits and the docs are too.

### Dependencies

A dependency two packages or more declare (the root counts) takes its version from the default catalog in `pnpm-workspace.yaml`, as `"catalog:"`; one only a single package uses stays pinned there.

### Code comments

Write them in English, on the exact line they protect: one line by default, two only if each carries a fact of its own. A comment states something the code cannot (a constraint, a gotcha, a why), never a paraphrase of the line below it, never a receipt for a decision explained elsewhere. Design rationale belongs in `docs/adr/`, and nothing already written there, in `GLOSSARY.md`, in the schema or in a test name is repeated in a comment. When in doubt, delete.

In declarative config (YAML, JSON, TOML) the default is none. Only a cross-file coupling, a parameter deliberately left out, or an operational dependency the file cannot show earns one.
