# Implement on request

`implement` is model-invoked, so "implement #42" reaches it as `/implement #42` does. A run starts the work's branch, writes a failing test first for each acceptance criterion, runs `code-review`, opens the pull request and watches its checks until they are green. (PR #7)

## Upstream hooks
- `skills/engineering/implement/SKILL.md`: the whole body and the description; no `disable-model-invocation`
- `skills/engineering/implement/agents/openai.yaml`: no `policy` block
- `README.md` and `skills/engineering/README.md`: the `implement` entry, under **Model-invoked**
- `skills/engineering/ask-matt/SKILL.md`: "the code gets built test-first" under "## The main flow"
- `docs/engineering/implement.md`: the whole page

## On conflict
- Keep the fork's seven steps and its invocation; carry over an upstream step only if it adds a behaviour the seven lack.
- Upstream rewording of the docs page's shared questions (parallel runs, token cost, the `#2` mix-up) can be taken as is.

## Verify
- `grep -c disable-model-invocation skills/engineering/implement/SKILL.md` prints `0`.
- In a set-up repo, "implement #N" in plain words shows an `implement` Skill tool call, a turn on Sonnet, and ends on a pull request URL with green checks.
