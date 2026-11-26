# Implement on request

`implement` is model-invoked, so "implement #42" reaches it as `/implement #42` does. A run starts the work's branch, builds it, tests what could break unseen, runs `code-review` and opens the pull request. (PR #7)

## Upstream hooks
- `skills/engineering/implement/SKILL.md`: the whole body and the description; no `disable-model-invocation`
- `skills/engineering/implement/agents/openai.yaml`: no `policy` block
- `README.md` and `skills/engineering/README.md`: the `implement` entry, under **Model-invoked**
- `skills/engineering/ask-matt/SKILL.md`: "`/implement` builds the ticket, tests what could break unseen" under "## The main flow"
- `docs/engineering/implement.md`: the whole page

## On conflict
- Keep the fork's invocation and its list of expectations; carry over an upstream line only if it adds an expectation the list lacks.
- Upstream rewording of the docs page's shared questions (parallel runs, token cost, the `#2` mix-up) can be taken as is.

## Verify
- `grep -c disable-model-invocation skills/engineering/implement/SKILL.md` prints `0`.
- In a set-up repo, "implement #N" in plain words shows an `implement` Skill tool call and ends on a pull request URL with green checks.
