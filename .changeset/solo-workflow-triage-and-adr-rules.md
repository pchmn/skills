---
"mattpocock-skills": minor
---

Fit the engineering skills to a repo whose maintainer files its own issues.

- **`triage`** keeps three states (`needs-triage`, `ready-for-agent`, `wontfix`) and drops `needs-info`, `ready-for-human`, external PRs and the AI disclaimer. Moving an issue to `ready-for-agent` rewrites its body as the agent brief instead of posting a comment.
- **`to-tickets`** and **`to-spec`** create each issue with its category label as well as its state.
- **`setup-matt-pocock-skills`** seeds the reduced label table, drops the "PRs as a request surface" sections, and writes a ticketless path for one-commit changes into the `## Agent skills` block.
- **`domain-modeling`** and the seeded `docs/agents/domain.md` sort an ADR collision into three cases: a reversal stops and waits, an extension the user asked for rewrites the ADR in the same change, and the agent's own choice follows the ADR. An ADR states a decision, not an inventory, is rewritten in place while the decision holds, and excludes a choice undone in one PR.
