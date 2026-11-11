# Interactive form

A model-invoked skill that asks a grilling round, or any long question set, through a local browser form with a chat panel, each answer pre-filled with the agent's recommendation. The `### Grilling` house-convention sub-block points at it. (PR #4)

## Fork files
- `skills/productivity/interactive-form/`: the skill and its `scripts/serve-form.mjs` (Node standard library only)
- `docs/productivity/interactive-form.md`

## Upstream hooks
- `.claude-plugin/plugin.json`: `"./skills/productivity/interactive-form"` in `skills`
- `README.md` and `skills/productivity/README.md`: the `interactive-form` entry under "Model-invoked"
- `skills/engineering/ask-matt/SKILL.md`: "`/interactive-form`" in "## Standalone"

## On conflict
- Keep the entries; take upstream's reordering or rewording of the lists around them.
- If upstream ships its own form skill, compare before keeping two.

## Verify
- `grep -n interactive-form .claude-plugin/plugin.json README.md skills/productivity/README.md skills/engineering/ask-matt/SKILL.md` matches in all four.
- `/grill-with-docs <idea>` in a repo whose `AGENTS.md` has `### Grilling` opens the round in the browser.
