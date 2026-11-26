## What it does

`implement` builds work that has already been decided, from the ticket to an open pull request. You point it at a [ticket](https://www.aihero.dev/ai-coding-dictionary/ticket), a [spec](https://www.aihero.dev/ai-coding-dictionary/spec), or the plan you just agreed in the conversation. It starts the work's branch, builds it, tests the behaviours that could break unseen, runs [code-review](https://aihero.dev/skills-code-review), and opens the pull request.

It never reopens the plan. There is no interview, no clarifying round, no proposal of a different approach. Whatever was settled upstream is the input, and the ticket's acceptance criteria are the bar the run is held to. That is what separates it from typing "build this" at a fresh [agent](https://www.aihero.dev/ai-coding-dictionary/agent), which often redesigns the work while it builds it, and stops at whatever it decides is done.

## When to reach for it

Type `/implement`, or the agent reaches for it automatically when you ask it to implement a ticket ("implement #42", in any language).

Where the work currently lives decides whether this is the right skill:

| The work is… | Reach for |
| --- | --- |
| A ticket on the tracker | `/implement #42`, one ticket per [session](https://www.aihero.dev/ai-coding-dictionary/session), [clearing](https://www.aihero.dev/ai-coding-dictionary/clearing) context between tickets |
| A spec, not yet split up, and the build spans sessions | [to-tickets](https://aihero.dev/skills-to-tickets) first, then `/implement` per ticket |
| A spec, and the build is small | `/implement` directly against the spec |
| Only in the conversation you just had, and it's still small | `/implement` right there, in the same window |
| Not written down anywhere yet | [grill-with-docs](https://aihero.dev/skills-grill-with-docs), or [grill-me](https://aihero.dev/skills-grill-me) if there's no codebase |
| One concrete behaviour you want built test-first, with no spec | [tdd](https://aihero.dev/skills-tdd) directly |
| Already built, and you want it checked | [code-review](https://aihero.dev/skills-code-review) directly |

## Prerequisites

`implement` reads two of the repo's house conventions, the ones [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) writes into `AGENTS.md`: **Branching** (where the work's branch comes from and what it is called) and **Pull requests** (its title, its body, what runs before it opens). In a repo without them, it commits to the current branch and stops there, with no pull request.

The same setup configures the issue tracker the tickets live on, and the doc that says how to fetch one. `code-review` reads that configuration too, to find the originating spec.

## What one run does

How it builds, and which checks it runs along the way, is the agent's call. The repo's docs say how to fetch a ticket, name a branch and write a pull request. What `implement` adds is what you expect of the run and the repo does not show:

- **UI no one has seen.** Before building, it lists each control, screen state or piece of information on screen the work adds, with where it is already shown: your design of record, the app, or the prototype the ticket names. When one is shown nowhere, even on a ticket that names a prototype made for earlier work, it stops and asks you to run `/prototype` in the session, then builds the variant you choose. A UI you reject goes back to `/prototype` the same way.
- **Prototype branch.** When the ticket names one, the run starts from it and reverts the prototype's commit last, so the pull request keeps it and the default branch never gets it.
- **Tests.** A behaviour gets a test only when it could break without anyone seeing it: logic, a contract between parts, a bug being fixed. Each is tested once, at the highest level that stays fast. What only the screen shows (layout, spacing, wording) is checked by looking.
- **Other sessions share the repo.** To undo a file it runs `git restore <path>`, never a whole-tree `git checkout -- .`, which can throw away other work and which auto modes often block.
- **Builders.** The session writes the code itself. It spawns builder [subagents](https://www.aihero.dev/ai-coding-dictionary/subagent) on Sonnet only when the work splits into large parts on separate files, and each builder owns its part's checks.
- **Review.** Before the pull request it runs [code-review](https://aihero.dev/skills-code-review) since the branch's merge-base, and fixes each finding or records why it stays. `code-review` runs its sub-agents on Opus whatever the session's model, so the review is never weaker than the model that wrote the diff.
- **Pull request.** The body is for a human who reviews code an agent wrote: what changes, how risky the merge is, and each choice a reviewer may want to refuse. The run ends on the pull request's URL and does not wait for its checks.

One run covers one ticket. The tickets [to-tickets](https://aihero.dev/skills-to-tickets) produces are tracer-bullet vertical slices sized to fit a single fresh [context window](https://www.aihero.dev/ai-coding-dictionary/context-window), so the intended rhythm is: clear context, implement one ticket, clear again.

## Which behaviours get a test

A behaviour that could break without anyone seeing it (logic, a contract between parts, a bug being fixed) gets a test, so the run cannot call it done while nothing proves it. A behaviour already tested at one level is not tested again at each level below it, and a criterion only the screen shows is checked by looking at the screen. A run that turns every criterion into a test leaves a suite as large as the code, slow to run and costly to change, that mostly proves what a glance would.

A criterion no test can check (a device check, a screenshot) still counts. The run either meets it or names it in the pull request as unverified.

## Common questions

**Can I point it at all my tickets at once, or run several in parallel?**

Not with `/implement`: one invocation, one ticket. For a whole spec in one run, use [implement-spec](https://aihero.dev/skills-implement-spec), which gives each ticket on the ready frontier to a [subagent](https://www.aihero.dev/ai-coding-dictionary/subagent) in its own worktree, then merges the results onto one integration branch. Several `/implement` sessions side by side are safe only when each works in its own worktree, which is what the Branching convention sets up. Sessions sharing one checkout share one index and one HEAD, and commits land on each other's branches.

**I asked it to implement a ticket in plain words. Did it run the skill?**

It should: the skill is model-invoked, so "implement #42" reaches it the same way `/implement #42` does. Look for the Skill tool call at the top of the run. If it does not show, type `/implement`.

**It opened the pull request, but I wanted to look first.**

The pull request is the run's finish line, because that is where checks run and where a human reviews. If you want it to stop before pushing, say so when you invoke it ("implement #42, don't push"). In a repo with no Pull requests convention it already stops at the commit.

**Reviewing the code of an agent's pull request is hard. What helps?**

The body is written for that reader, and kept short. Besides what changed, it says whether a revert would undo the merge (a file format, a public API or a deletion would not), what breaks if it is wrong, and lists only the choices the reviewer may want to refuse: a criterion met differently, an addition outside the ticket, a choice that changes what the user sees. Those choices are where a human review earns its time. The shape comes from the repo's pull request template, which [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) writes; in a repo with its own template, the run fills that one, so carry the sections over by hand.

**One ticket burned 150k tokens. Am I using it wrong?**

Probably not. The ticket is more likely too big. A run does codebase exploration, tests for the behaviours that could break unseen, the repo's checks and a review, so a non-trivial ticket exceeding 100k [tokens](https://www.aihero.dev/ai-coding-dictionary/token) is normal rather than a sign something broke. The fix is upstream. Right-size the tickets in [to-tickets](https://aihero.dev/skills-to-tickets) so each fits one fresh window. If a single ticket keeps going over, split it rather than raising the [effort](https://www.aihero.dev/ai-coding-dictionary/effort) level.

**`/implement #2` in a fresh session worked on something completely unrelated.**

The agent resolved `#2` against another numbered list in context, such as a todo file or checklist, rather than the configured tracker. `implement` fetches a passed reference from the issue tracker and states its title before starting, and asks when the reference is ambiguous. Check that title matches the ticket you meant; passing the issue URL or `owner/repo#2` removes the ambiguity entirely.

**When does it spawn builders?**

Only when the ticket splits into large parts that touch separate files and could each be built and checked alone. Handing every ticket to Sonnet builders looked cheaper, but the orchestrator kept re-running their checks, reading their diffs and debugging CI on its own model, and read as many tokens as the builders it was saving; a builder that took close to an hour also held the whole session. A builder now owns its checks. To keep a ticket on a cheaper model, start the session on that model.

## It's working if

- The session opens by reading the ticket and restating what it will build, rather than asking you what to build.
- Before any UI code, it lists what the work puts on screen and where each piece is already shown, so you can call for a prototype before the build rather than after the pull request.
- The work lands on its own branch, not on the one you were on.
- Tests cover logic, contracts and fixed bugs, and none checks only a layout or a wording.
- The `code-review` findings come back fixed, or named in the pull request, never dropped.
- The pull request's body is short, and lists the choices the agent made that you may want to refuse.
- The run ends on the pull request's URL as soon as it is open.

## Where it fits

`implement` is the build step of the main chain:

```txt
grill-with-docs → to-spec → to-tickets → implement → code-review → retro
```

Its neighbours are [to-tickets](https://aihero.dev/skills-to-tickets), which produces the tickets it consumes and declares the blocking edges that decide their order; [code-review](https://aihero.dev/skills-code-review), which it runs before opening the pull request; and [pr](https://aihero.dev/skills-pr), which shapes the pull request body when the repo has no template of its own. It sits downstream of the planning skills and trusts them. It does not re-validate the shape of what it was handed, so a badly-structured map or a horizontally-layered ticket gets built as written.

That trust is why [wayfinder](https://aihero.dev/skills-wayfinder) merges onto the chain at [to-spec](https://aihero.dev/skills-to-spec) rather than looping its map straight into `implement`. Go straight to `implement` from a map only when the effort turned out small.

[ask-matt](https://aihero.dev/skills-ask-matt) is the router over the whole set when you are not sure which flow you are in.
