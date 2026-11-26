## What it does

`tdd` builds a feature or fixes a bug test-first: one failing test, then just enough code to pass it, then the next behaviour. It carries the few rules that make that loop produce tests worth keeping: agreed seams, vertical slices, and expected values from outside the code.

It writes no test at a seam you have not agreed to first. When the repo's docs say what gets a test and where, they count as that agreement. Otherwise, before any test exists, it names the public boundaries it intends to test at and stops for your confirmation. Testing effort is finite, and this step spends it on the critical paths instead of on every edge case. `tdd` is also a **reference**, not a driver. It contains the rules of the loop, and you run the [session](https://www.aihero.dev/ai-coding-dictionary/session) that applies them.

## When to reach for it

Type `/tdd`, or the [agent](https://www.aihero.dev/ai-coding-dictionary/agent) reaches for it automatically when a task fits: building a feature or fixing a bug test-first, or when you say "red-green-refactor".

Reach for it when there is a concrete behaviour to build, with an input and an observable output, and you want tests that survive a refactor.

| Your situation | Where to go |
| --- | --- |
| A behaviour with defined inputs and outputs (business logic, a request/response contract, a transformation, validation) | `tdd` |
| The behaviour isn't pinned down yet | [to-spec](https://aihero.dev/skills-to-spec), which also agrees the test seams before any code is written |
| The question is really the shape of the interface, not the tests | [codebase-design](https://aihero.dev/skills-codebase-design) |
| You have a [spec](https://www.aihero.dev/ai-coding-dictionary/spec) or [tickets](https://www.aihero.dev/ai-coding-dictionary/ticket) and want the whole build run for you | [implement](https://aihero.dev/skills-implement), which tests only what could break unseen |
| Config, wiring, glue, type annotations, straight CRUD delegation | Nothing here fits well; see the open gap below |

That last row is a real gap. The skill decides *where* the seams go, but nothing in it decides *whether* a change is worth the loop at all. If you run it on a change with no independent source of truth to assert against, you get a test that restates the implementation. That is the tautological anti-pattern the skill warns about, reached from the other direction. It is [issue #746](https://github.com/mattpocock/skills/issues/746), and it is open. Until it closes, you make that call yourself, or write the rule into your `CLAUDE.md`.

## Prerequisites

[codebase-design](https://aihero.dev/skills-codebase-design) needs to be installed. `tdd` points to it for the vocabulary of modules, interfaces and seams. Nothing else; the skill is [stateless](https://www.aihero.dev/ai-coding-dictionary/stateless) and writes no files of its own.

## The loop, and the seam it runs at

The skill rests on three terms.

**Red-green.** Write the failing test, then only enough code to pass it. Do not write code for the test after next. There is no refactor phase. The skill dropped it in June 2026 because agents almost never performed it, and because review and implementation work better as separate sessions. Refactoring belongs to [code-review](https://aihero.dev/skills-code-review).

**Vertical slice.** Write one test at one seam, then the minimal implementation, then repeat. The first cycle is a **tracer bullet** that proves a single path end to end. The opposite is horizontal slicing: all the tests first, then all the code. Tests written in bulk verify *imagined* behaviour. They check the shape of things rather than what a user does, and they commit you to a test structure before you understand the implementation.

**Pre-agreed seam.** A seam is the public boundary you observe behaviour at without reaching inside. No test goes at an unconfirmed seam. In the full chain the seams are agreed earlier, during [to-spec](https://aihero.dev/skills-to-spec): "`/tdd` is told to only work at pre-agreed test seams, `/code-review` checks that only agreed-upon test seams were used." Invoked on its own, `tdd` follows the repo's docs when they say what gets a test, and asks you directly when they do not.

**Expected values from outside the code.** The expected value is a known literal, a worked example or the spec, never a value computed the way the code computes it, which passes by construction.

## Common questions

**Why doesn't it refactor? The description says "red-green-refactor".**

Because the refactor step was removed and the description was not. The removal was deliberate. Agents almost never did the step, and keeping implementation and review in separate sessions works better. Whether the result still counts as TDD by the book matters less than whether the loop produces better code. The mismatch between the trigger phrase and the body is filed as [issue #589](https://github.com/mattpocock/skills/issues/589) and is still open, so "red-green-refactor" continues to work as a phrase that fires the skill. What you get is red-green, with refactoring in [code-review](https://aihero.dev/skills-code-review).

**It asked me to choose a test seam and I had no idea which to pick.**

This is the most-reported friction with the skill ([issue #607](https://github.com/mattpocock/skills/issues/607)). The prompt lists candidate seams by name only, with nothing about what each one catches or misses, so you are choosing between labels. There is no fix shipped yet. The practical workaround is to ask the agent for the trade-offs before answering: what does the component-level seam miss that the integration seam catches, and how much slower is it. It is also why the chain agrees seams up front in `to-spec`, where you have the whole feature in view rather than one prompt.

**It wrote the implementation before the test, even though the skill says red first.**

It happens. One user pushed the [model](https://www.aihero.dev/ai-coding-dictionary/model) on it and got an unusually honest answer: "I knew the skill said 'one test at a time, watch it fail for the right reason'. I read it. I just defaulted to my normal habit." The skill accepts this. No instruction makes an agent comply 100% of the time, and stricter wording restricts the agent's creativity for little gain. The loop is worth running even when the agent does not follow it strictly, because the results are still better overall. If strict adherence matters for a particular slice, watch the run rather than trusting the skill to enforce it.

**Does `/tdd` replace `/implement`, or the course's `/do-work`?**

No. `/tdd` documents the loop's rules; `/implement` builds a ticket to a pull request and tests only what could break unseen. The course's single `/do-work` step is now split across `/implement`, `/tdd` and `/code-review`. If you are asking which one to run against a ticket, the answer is almost always `/implement`.

**Where did the deep-modules and interface-design guidance go?**

Into [codebase-design](https://aihero.dev/skills-codebase-design) in v1.0, generalised so several skills share one vocabulary. `refactoring.md` left at the same time; refactoring is now [code-review](https://aihero.dev/skills-code-review)'s job, and that skill carries the Fowler smell baseline. The `tests.md` and `mocking.md` notes (what a good test is, what to mock) are gone too: the skill keeps only the loop's rules and leaves the rest to the agent and the repo's docs.

**Does it know about my other tickets?**

No. Run against one ticket, it can propose work that belongs to a sibling ticket, because it has no view of the rest of the issue graph ([issue #129](https://github.com/mattpocock/skills/issues/129)). This is not `tdd`'s job. Passing the spec alongside the ticket helps; right-sizing the tickets in the first place helps more.

## It's working if

- With no repo docs on what gets a test, it stops and names the seams it intends to test at, and waits, before any test file exists.
- One test appears, goes red, gets just enough code to pass, and only then does the next test appear, not a batch of tests followed by a batch of code.
- Expected values in assertions are literals you can trace to the spec, not values recomputed the way the code computes them.
- Renaming an internal function breaks nothing in the suite.

## Where it fits

`tdd` runs inside the build step of the main chain; it is not a step of its own:

```txt
grill-with-docs → to-spec → to-tickets → implement → code-review → retro
```

[to-spec](https://aihero.dev/skills-to-spec) agrees the test seams up front, [implement](https://aihero.dev/skills-implement) builds each ticket, and [code-review](https://aihero.dev/skills-code-review) checks afterwards that only the agreed seams were used, and owns the refactoring `tdd` no longer does. Its other neighbour is [codebase-design](https://aihero.dev/skills-codebase-design), the shared source of the seam and deep-module vocabulary that `tdd` uses. You can also reach for it on its own, whenever there is a concrete behaviour to build and no full spec in play. When you are unsure which skill fits your situation, [ask-matt](https://aihero.dev/skills-ask-matt) routes you.
