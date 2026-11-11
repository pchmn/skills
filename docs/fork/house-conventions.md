# House conventions

`setup-matt-pocock-skills` writes the `## Agent skills` block from a seed that carries the house conventions shared by every repo: the ticketless path for a one-commit change, branching in a worktree per branch, pull requests, the pnpm catalog, code comments, grilling through `interactive-form`. Re-running setup re-syncs the sub-blocks the seed owns and leaves a repo's own sub-blocks alone. (PRs #1, #2)

## Fork files
- `skills/engineering/setup-matt-pocock-skills/agent-skills-block.md`: the seed of the block; edit a house convention here, then re-run setup in each repo

## Upstream hooks
- `skills/engineering/setup-matt-pocock-skills/SKILL.md`: "Write the block from [agent-skills-block.md]" in step 4, with the condition table and the re-sync rule, replacing upstream's inline block; "**House conventions**" in the intro list; "re-syncs the house conventions" in step 5
- `docs/engineering/setup-matt-pocock-skills.md`: the `## Agent skills` row of the Prerequisites table; "**Do I need to re-run it after updating the skills?**"; an "It's working if" bullet

## On conflict
- Upstream changes to its inline block (a new pointer, a renamed doc) go into `agent-skills-block.md`, never back into `SKILL.md`.
- Keep the re-sync rule: the seed owns its headings, the repo owns every other heading.

## Verify
- `grep -n "agent-skills-block.md" skills/engineering/setup-matt-pocock-skills/SKILL.md` matches.
- Re-run `/setup-matt-pocock-skills` in a set-up repo: it shows a diff for each owned sub-block that drifted, and leaves a `### Engine`-style sub-block untouched.
