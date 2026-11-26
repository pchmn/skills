# Ticket and pull request templates

On a GitHub tracker, `setup-matt-pocock-skills` writes `.github/ISSUE_TEMPLATE/ticket.md` and `.github/pull_request_template.md` from two seeds when the repo has none, and the GitHub tracker doc tells the ticket-writing skills to follow the ticket template. A template the repo already has is left alone, on a re-run too. The pull request template is written for a human reviewing an agent's code, in four sections: Summary, Risk of merging (whether a revert undoes it, what breaks if it is wrong), Decisions to check, Test plan. Risk of merging comes from upstream's `pr` skill (its Merge Danger, reworded in plain words). `/implement` lists the choices a reviewer may want to refuse in the body. (PRs #12, #20, #23)

## Fork files
- `skills/engineering/setup-matt-pocock-skills/ticket-template.md`: the seed of `.github/ISSUE_TEMPLATE/ticket.md`
- `skills/engineering/setup-matt-pocock-skills/pull-request-template.md`: the seed of `.github/pull_request_template.md`

## Upstream hooks
- `skills/engineering/setup-matt-pocock-skills/SKILL.md`: "**Ticket and pull request templates**" in the intro list; "`.github/ISSUE_TEMPLATE/` and `.github/pull_request_template.md`" in step 1; "the ticket and pull request templates the repo lacks" in step 3; "copy each template the repo lacks" in step 4
- `skills/engineering/setup-matt-pocock-skills/issue-tracker-github.md`: "**Ticket body**" under Conventions
- `docs/engineering/setup-matt-pocock-skills.md`: the `ticket.md` row of the Prerequisites table; "**Does it write the ticket and pull request templates?**"
- `skills/engineering/implement/SKILL.md`: "each choice a reviewer may want to refuse" and "for a human who reviews code an agent wrote" in the "**Pull request.**" bullet
- `docs/engineering/implement.md`: the "**Pull request.**" bullet of "## What one run does"; "**Reviewing the code of an agent's pull request is hard. What helps?**"; the "body is short" line of "## It's working if"

## On conflict
- Keep upstream's change to the setup steps and re-apply the fork's four sentences.
- `to-tickets` keeps upstream's own issue template: the fork overrides it from the tracker doc, never by editing `to-tickets`.
- If upstream ships templates of its own, compare before keeping two.
- When upstream's `pr` skill changes its Summary, Evidence or Merge Danger guidance, carry the change into the pull request template's comments.

## Verify
- `grep -n "ticket-template.md\|pull-request-template.md" skills/engineering/setup-matt-pocock-skills/SKILL.md` matches both.
- `/setup-matt-pocock-skills` in a GitHub repo with no `.github/` templates: it writes both files, and `docs/agents/issue-tracker.md` carries the "Ticket body" line.
- The same run in a repo that has a `pull_request_template.md`: the file is unchanged.
- `grep -n "each choice a reviewer may want to refuse" skills/engineering/implement/SKILL.md` matches.
