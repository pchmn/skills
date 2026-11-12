## What it does

`implement` builds work that has already been decided, from the ticket to a pull request with green checks. You point it at a [ticket](https://www.aihero.dev/ai-coding-dictionary/ticket), a [spec](https://www.aihero.dev/ai-coding-dictionary/spec), or the plan you just agreed in the conversation. It starts the work's branch, writes a failing test for each acceptance criterion before the code that passes it, runs [code-review](https://aihero.dev/skills-code-review), opens the pull request and watches its checks until they are green.

It never reopens the plan. There is no interview, no clarifying round, no proposal of a different approach. Whatever was settled upstream is the input, and the ticket's acceptance criteria are the bar the run is held to. That is what separates it from typing "build this" at a fresh [agent](https://www.aihero.dev/ai-coding-dictionary/agent), which often redesigns the work while it builds it, and stops at whatever it decides is done.

## When to reach for it

Type `/implement`, or the agent reaches for it automatically when you ask it to implement a ticket ("implement #42", in any language). The code is written on Sonnet either way.

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

1. Fetch the ticket and state its title.
2. Start the work's branch, per the Branching convention.
3. List the acceptance criteria. For each one a test can check, write the test, watch it fail, then write the code that makes it pass. Typecheck and run single test files as it goes.
4. Stop building when every criterion holds and the full check (typecheck, lint, tests) is green. A criterion met differently, or left out, goes into the pull request rather than going unmentioned. Commit.
5. Run [code-review](https://aihero.dev/skills-code-review) since the branch's merge-base, fix what it finds or record why not, and commit.
6. Push and open the pull request, per the Pull requests convention.
7. Watch the pull request's checks and fix any that go red. The run ends on a green pull request and its URL.

The session orchestrates on its own model and hands the code to builder [subagents](https://www.aihero.dev/ai-coding-dictionary/subagent) on Sonnet: as many at once as the work splits into, and the same builders again for review findings and red checks, so they keep the context of what they wrote. The decisions were taken upstream, so what is left is execution, at half Opus's price. `code-review` still runs its two sub-agents on Opus, so a stronger model checks the cheaper one's work. In a harness without subagents, the session builds itself.

One run covers one ticket. The tickets [to-tickets](https://aihero.dev/skills-to-tickets) produces are tracer-bullet vertical slices sized to fit a single fresh [context window](https://www.aihero.dev/ai-coding-dictionary/context-window), so the intended rhythm is: clear context, implement one ticket, clear again.

## Acceptance criteria first

The skill's central idea is that the ticket's **acceptance criteria** (a "Done when" or "Acceptance criteria" section) are both the tests and the finish line. Each criterion a test can check gets that test before its code, so the run cannot call a criterion done while nothing proves it. A build without this bar drifts toward "the code compiles and looks right", and the misses it leaves are exactly the ones a criterion names: a boundary case nobody tested, a requirement swapped for a workaround, a behaviour the ticket said to leave alone.

A criterion no test can check (a device check, a screenshot) still counts. The run either meets it or names it in the pull request as unverified.

## Common questions

**Can I point it at all my tickets at once, or run several in parallel?**

Not with `/implement`: one invocation, one ticket. For a whole spec in one run, use [implement-spec](https://aihero.dev/skills-implement-spec), which gives each ticket on the ready frontier to a [subagent](https://www.aihero.dev/ai-coding-dictionary/subagent) in its own worktree, then merges the results onto one integration branch. Several `/implement` sessions side by side are safe only when each works in its own worktree, which is what the Branching convention sets up. Sessions sharing one checkout share one index and one HEAD, and commits land on each other's branches.

**I asked it to implement a ticket in plain words. Did it run the skill?**

It should: the skill is model-invoked, so "implement #42" reaches it the same way `/implement #42` does. Look for the Skill tool call at the top of the run, and for builder subagents on Sonnet. If neither shows, type `/implement`.

**It opened the pull request, but I wanted to look first.**

The pull request is the run's finish line, because that is where checks run and where a human reviews. If you want it to stop before pushing, say so when you invoke it ("implement #42, don't push"). In a repo with no Pull requests convention it already stops at the commit.

**One ticket burned 150k tokens. Am I using it wrong?**

Probably not. The ticket is more likely too big. A run does codebase exploration, a red-green loop per criterion, a full check, a review, and a wait on the pull request's checks, so a non-trivial ticket exceeding 100k [tokens](https://www.aihero.dev/ai-coding-dictionary/token) is normal rather than a sign something broke. The fix is upstream. Right-size the tickets in [to-tickets](https://aihero.dev/skills-to-tickets) so each fits one fresh window. If a single ticket keeps going over, split it rather than raising the [effort](https://www.aihero.dev/ai-coding-dictionary/effort) level.

**`/implement #2` in a fresh session worked on something completely unrelated.**

The agent resolved `#2` against another numbered list in context, such as a todo file or checklist, rather than the configured tracker. `implement` fetches a passed reference from the issue tracker and states its title before starting, and asks when the reference is ambiguous. Check that title matches the ticket you meant; passing the issue URL or `owner/repo#2` removes the ambiguity entirely.

**Why builder subagents rather than switching the session to Sonnet?**

A skill's `model:` frontmatter is ignored in Claude Code's auto mode, and otherwise lasts only one turn, so a question mid-run sent the rest back to the session's model. A subagent's model holds in every mode, and the orchestrator keeps the stronger model for the calls that need it: splitting the work, weighing findings, reading red checks. If you want a ticket built on Opus, because it still carries design calls, say so when you ask for it.

## It's working if

- The session opens by reading the ticket and restating what it will build, rather than asking you what to build.
- The work lands on its own branch, not on the one you were on.
- A test for an acceptance criterion fails in the trace before the code that passes it is written.
- The `code-review` findings come back fixed, or named in the pull request, never dropped.
- The run ends on a pull request URL with its checks green, without you pasting a red CI link back to it.

## Where it fits

`implement` is the build step of the main chain:

```txt
grill-with-docs → to-spec → to-tickets → implement → code-review → retro
```

Its neighbours are [to-tickets](https://aihero.dev/skills-to-tickets), which produces the tickets it consumes and declares the blocking edges that decide their order; [code-review](https://aihero.dev/skills-code-review), which it runs before opening the pull request; and [pr](https://aihero.dev/skills-pr), which shapes the pull request body when the repo has no template of its own. It sits downstream of the planning skills and trusts them. It does not re-validate the shape of what it was handed, so a badly-structured map or a horizontally-layered ticket gets built as written.

That trust is why [wayfinder](https://aihero.dev/skills-wayfinder) merges onto the chain at [to-spec](https://aihero.dev/skills-to-spec) rather than looping its map straight into `implement`. Go straight to `implement` from a map only when the effort turned out small.

[ask-matt](https://aihero.dev/skills-ask-matt) is the router over the whole set when you are not sure which flow you are in.
