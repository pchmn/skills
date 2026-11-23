# UI prototype

A ticket needs a validated prototype when it adds a control, a screen state or a piece of information on screen that neither the design of record nor the app shows yet. `to-tickets` asks whether it is made on the ticket's branch now or at implementation; `implement` lists, before building, where each new on-screen element is already shown (a prototype made for earlier work counts only for what it draws) and stops for `/prototype` when one is shown nowhere, starts from the ticket's prototype branch, sends a rejected UI back to `/prototype`, and reverts the prototype's commit before the pull request opens; `code-review`'s Spec axis compares the built screens with the prototype, or reports a UI built without one. Where to capture the app comes from the repo's `AGENTS.md`. (PRs #17, #19, #21)

## Upstream hooks
- `skills/engineering/to-tickets/SKILL.md`: "needs a validated prototype" in `<vertical-slice-rules>`, and "A ticket whose prototype is made now" under "### 5. Publish the tickets"
- `skills/engineering/implement/SKILL.md`: "where it is already shown" and "shows only what it draws" in step 1, "from the prototype branch the ticket names" in step 3, "revert the prototype's commit last" in step 6
- `skills/engineering/code-review/SKILL.md`: "When the spec links a UI prototype" under "### 2. Identify the spec source", and "The linked UI prototype" and "UI built without a validated prototype" in the Spec sub-agent prompt
- `docs/engineering/to-tickets.md`, `docs/engineering/implement.md`, `docs/engineering/code-review.md`: the same rule, under "## Blocking edges", steps 1, 3 and 6, and "## The two axes"

## On conflict
- Keep the trigger (control, screen state, on-screen information), the `Prototype:` line, the coverage list posted before building, the revert before the pull request, and both findings; take upstream's rewording.
- `/prototype` here is whatever prototype skill the user has installed, launched by the user; upstream's own `prototype` skill and its `prototype/<name>` branch are not assumed.

## Verify
- `grep -ln "validated prototype" skills/engineering/{to-tickets,implement,code-review}/SKILL.md` lists all three, and `grep -n "UI built without a validated prototype" skills/engineering/code-review/SKILL.md` matches.
