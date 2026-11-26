---
name: implement
description: "Implement a ticket or a spec end to end: branch, build, review, pull request. Use when the user asks to implement or build an issue (`implement #42`, `implémente 42`) or a spec."
---

Take the work from a ticket, a spec or the plan in the conversation to an open pull request. The repo's docs say how to fetch a ticket, name a branch and write a pull request. How you build, and what you run to check it, is yours to decide.

What the user expects of the run, which the repo does not show:

- **UI no one has seen.** Before building, list what the work adds that the user sees or operates, each with where it is already shown: the design of record, the app, or the prototype the ticket names. When an item is shown nowhere, stop before building its UI and ask the user to run `/prototype` in this session; build the variant they choose. Do the same when the user rejects a UI you built, rather than offering design options in the conversation. A prototype made for earlier work shows only what it draws.
- **Prototype branch.** When the ticket names one, start from it and revert its commit last: the pull request keeps it in its history, the default branch never gets it.
- **Tests.** Test a behaviour only when it could break without anyone seeing it: logic, a contract between parts, a bug being fixed. Test it once, at the highest level that stays fast. What only the screen shows (layout, spacing, wording) is checked by looking, not by a test.
- **Other sessions share the repo.** Revert a file with `git restore <path>`, never a whole-tree `git checkout -- .`.
- **Builders.** Spawn subagents only when the work splits into large parts on separate files, on a lighter model than yours (`model: "sonnet"` in Claude Code), each started with a fresh context window. A builder owns its part's checks; do not redo them.
- **Review.** Before the pull request, call the Skill tool with "code-review" on the branch since its merge-base with the default branch, and fix each finding or record why it stays.
- **Pull request.** Its body is for a human who reviews code an agent wrote: what changes, how risky the merge is, and each choice a reviewer may want to refuse (a criterion met differently or left out, an addition outside the ticket, something the user sees that no one decided). End on its URL; do not wait for its checks.
