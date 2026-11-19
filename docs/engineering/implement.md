## What it does

`implement` builds work that has already been decided, from the ticket to a pull request with green checks. You point it at a [ticket](https://www.aihero.dev/ai-coding-dictionary/ticket), a [spec](https://www.aihero.dev/ai-coding-dictionary/spec), or the plan you just agreed in the conversation. It starts the work's branch, writes a failing test for each acceptance criterion before the code that passes it, runs [code-review](https://aihero.dev/skills-code-review), opens the pull request and watches its checks until they are green.

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
| One concrete behaviour you want test-first, with no spec | [tdd](https://aihero.dev/skills-tdd) directly |
| Already built, and you want it checked | [code-review](https://aihero.dev/skills-code-review) directly |

## Prerequisites

`implement` reads two of the repo's house conventions, the ones [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) writes into `AGENTS.md`: **Branching** (where the work's branch comes from and what it is called) and **Pull requests** (its title, its body, what runs before it opens). In a repo without them, it commits to the current branch and stops there, with no pull request.

The same setup configures the issue tracker the tickets live on, and the doc that says how to fetch one. `code-review` reads that configuration too, to find the originating spec.

## What one run does

1. Fetch the ticket and state its title. If it adds a control, a screen state or a piece of information on screen that neither your design of record nor the app shows yet, and names no prototype branch, stop and ask you to run `/prototype` in the session, then build the variant you choose. A UI you reject goes back to `/prototype` the same way.
2. List the open pull requests that change the same files, and start anyway. Ask only when the work needs code one of them adds: wait for it, or build on its branch.
3. Start the work's branch, per the Branching convention, or from the prototype branch the ticket names.
4. List the acceptance criteria. For each one a test can check, write the test, watch it fail, then write the code that makes it pass. Typecheck and run single test files as it goes. Note each choice the ticket and the docs leave open, with the option set aside.
5. Stop building when every criterion holds and the full check (typecheck, lint, tests) is green. The full check runs once, here. Slow suites such as end-to-end tests run locally only when the repo's docs say the change needs them; otherwise CI runs them. A criterion met differently, or left out, goes into the pull request rather than going unmentioned. Commit.
6. Run [code-review](https://aihero.dev/skills-code-review) since the branch's merge-base, fix what it finds or record why not, and commit. On a branch started from a prototype branch, revert the prototype's commit last, so the pull request keeps it and the default branch never gets it.
7. Push and open the pull request, per the Pull requests convention. Its body says how risky the merge is, shows the shape of the change, points at the few places to read closely, and lists the choices noted at step 4. It also names the open pull requests found at step 2 and the files they share.
8. Watch the pull request's checks in the background, so you can keep talking to the session while CI runs, and fix any that go red. The run ends on a green pull request and its URL.

The session writes the code itself. It spawns builder [subagents](https://www.aihero.dev/ai-coding-dictionary/subagent) on Sonnet only when the ticket splits into large parts that touch separate files, and each builder runs its own part's tests and checks. `code-review` runs its two sub-agents on Opus whatever the session's model, so the review is never weaker than the model that wrote the diff.

One run covers one ticket. The tickets [to-tickets](https://aihero.dev/skills-to-tickets) produces are tracer-bullet vertical slices sized to fit a single fresh [context window](https://www.aihero.dev/ai-coding-dictionary/context-window), so the intended rhythm is: clear context, implement one ticket, clear again.

## Acceptance criteria first

The skill's central idea is that the ticket's **acceptance criteria** (a "Done when" or "Acceptance criteria" section) are both the tests and the finish line. Each criterion a test can check gets that test before its code, so the run cannot call a criterion done while nothing proves it. A build without this bar drifts toward "the code compiles and looks right", and the misses it leaves are exactly the ones a criterion names: a boundary case nobody tested, a requirement swapped for a workaround, a behaviour the ticket said to leave alone.

A criterion no test can check (a device check, a screenshot) still counts. The run either meets it or names it in the pull request as unverified.

## How much it checks

Each step runs the smallest check that answers its question. While building, only the test files the change touches run. The repo's full check runs once, before the commit. Slow suites, such as end-to-end tests or packaging, are left to the pull request's checks unless the repo's docs say when a change needs them locally (for instance, when it touches the desktop app's startup). Write that rule in your `AGENTS.md`; without it, the run leaves those suites to CI.

## How it reverts files

To undo a file, the run uses `git restore <path>`, which touches one file; a whole-tree `git checkout -- .` can throw away other work, and auto modes often block it, which stops the run.

## Common questions

**Can I point it at all my tickets at once, or run several in parallel?**

Not with `/implement`: one invocation, one ticket. For a whole spec in one run, use [implement-spec](https://aihero.dev/skills-implement-spec), which gives each ticket on the ready frontier to a [subagent](https://www.aihero.dev/ai-coding-dictionary/subagent) in its own worktree, then merges the results onto one integration branch. Several `/implement` sessions side by side are safe only when each works in its own worktree, which is what the Branching convention sets up. Sessions sharing one checkout share one index and one HEAD, and commits land on each other's branches.

**I asked it to implement a ticket in plain words. Did it run the skill?**

It should: the skill is model-invoked, so "implement #42" reaches it the same way `/implement #42` does. Look for the Skill tool call at the top of the run. If it does not show, type `/implement`.

**It opened the pull request, but I wanted to look first.**

The pull request is the run's finish line, because that is where checks run and where a human reviews. If you want it to stop before pushing, say so when you invoke it ("implement #42, don't push"). In a repo with no Pull requests convention it already stops at the commit.

**Reviewing the code of an agent's pull request is hard. What helps?**

The body is written for that reader. Besides what changed and how it was checked, it says whether the merge is a one-way door (hard to undo: a file format, a public API, a deletion) or a two-way one, shows the shape of the code change as a small tree or pseudocode, names the two to five places worth reading closely and what can be skimmed, and lists the choices the agent made that the ticket left open. Those choices are where a human review earns its time. The shape comes from the repo's pull request template, which [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) writes; in a repo with its own template, the run fills that one, so carry the sections over by hand.

**One ticket burned 150k tokens. Am I using it wrong?**

Probably not. The ticket is more likely too big. A run does codebase exploration, a red-green loop per criterion, a full check, a review, and a wait on the pull request's checks, so a non-trivial ticket exceeding 100k [tokens](https://www.aihero.dev/ai-coding-dictionary/token) is normal rather than a sign something broke. The fix is upstream. Right-size the tickets in [to-tickets](https://aihero.dev/skills-to-tickets) so each fits one fresh window. If a single ticket keeps going over, split it rather than raising the [effort](https://www.aihero.dev/ai-coding-dictionary/effort) level.

**`/implement #2` in a fresh session worked on something completely unrelated.**

The agent resolved `#2` against another numbered list in context, such as a todo file or checklist, rather than the configured tracker. `implement` fetches a passed reference from the issue tracker and states its title before starting, and asks when the reference is ambiguous. Check that title matches the ticket you meant; passing the issue URL or `owner/repo#2` removes the ambiguity entirely.

**When does it spawn builders?**

Only when the ticket splits into large parts that touch separate files and could each be built and checked alone. Handing every ticket to Sonnet builders looked cheaper, but the orchestrator kept re-running their checks, reading their diffs and debugging CI on its own model, and read as many tokens as the builders it was saving; a builder that took close to an hour also held the whole session. A builder now owns its checks, and the session does not redo them. To keep a ticket on a cheaper model, start the session on that model.

## It's working if

- The session opens by reading the ticket and restating what it will build, rather than asking you what to build.
- The work lands on its own branch, not on the one you were on.
- A test for an acceptance criterion fails in the trace before the code that passes it is written.
- The `code-review` findings come back fixed, or named in the pull request, never dropped.
- The pull request's body tells you which few places to read closely and which choices the agent made on its own.
- The run ends on a pull request URL with its checks green, without you pasting a red CI link back to it.

## Where it fits

`implement` is the build step of the main chain:

```txt
grill-with-docs → to-spec → to-tickets → implement → code-review → retro
```

Its neighbours are [to-tickets](https://aihero.dev/skills-to-tickets), which produces the tickets it consumes and declares the blocking edges that decide their order; [code-review](https://aihero.dev/skills-code-review), which it runs before opening the pull request; and [pr](https://aihero.dev/skills-pr), which shapes the pull request body when the repo has no template of its own. It sits downstream of the planning skills and trusts them. It does not re-validate the shape of what it was handed, so a badly-structured map or a horizontally-layered ticket gets built as written.

That trust is why [wayfinder](https://aihero.dev/skills-wayfinder) merges onto the chain at [to-spec](https://aihero.dev/skills-to-spec) rather than looping its map straight into `implement`. Go straight to `implement` from a map only when the effort turned out small.

[ask-matt](https://aihero.dev/skills-ask-matt) is the router over the whole set when you are not sure which flow you are in.
