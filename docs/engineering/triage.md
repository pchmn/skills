## What it does

`triage` works through the issues on your project's tracker that are not tickets yet. It moves each one through a small state machine of **triage roles** (a category role and a state role). Each issue ends as an agent-ready [ticket](https://www.aihero.dev/ai-coding-dictionary/ticket), or as a closed issue with a recorded reason.

It assumes one maintainer who files their own issues. Nobody outside is waiting for an answer, so every open question is settled with you during the session, and the result is written into the issue's body. `triage` posts no brief as a comment and parks no question on the issue.

It also differs from labelling by hand because it recommends and then waits. It gives you its category and state call with reasoning, plus what it found in the codebase, and applies nothing until you tell it to.

## When to reach for it

You invoke this by typing `/triage` and then describing what you want in plain language. The [agent](https://www.aihero.dev/ai-coding-dictionary/agent) won't reach for it on its own. Examples: "Show me anything that needs my attention", "let's look at #42", "move #42 to ready-for-agent".

| What you have | Where to go |
| --- | --- |
| An issue filed raw and still labelled `needs-triage` | `/triage` |
| A rough idea of your own, nothing written down | [grill-with-docs](https://aihero.dev/skills-grill-with-docs) |
| A settled conversation to turn into a [spec](https://www.aihero.dev/ai-coding-dictionary/spec) | [to-spec](https://aihero.dev/skills-to-spec) |
| A spec to split into agent-ready tickets | [to-tickets](https://aihero.dev/skills-to-tickets) |
| A confirmed bug that needs a root cause, not a label | [diagnosing-bugs](https://aihero.dev/skills-diagnosing-bugs) |

## Prerequisites

`triage` reads and writes your issue tracker, so [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) must first configure that tracker and its label vocabulary. The role names below are **canonical**. The label strings in your tracker may differ, and setup provides the mapping. If your tracker already uses the canonical names exactly, you have nothing to map.

## The state machine

Every issue carries exactly one category role and one state role, both set by whoever creates it. There are two categories: `bug` (something is broken) and `enhancement` (new feature or improvement). There are three states:

| State | Means |
| --- | --- |
| `needs-triage` | An idea or a bug filed raw, not yet grilled into a ticket. An unlabelled issue is treated the same way. |
| `ready-for-agent` | The issue's body is an agent brief with every gap settled. An [AFK](https://www.aihero.dev/ai-coding-dictionary/afk) agent can take it. |
| `wontfix` | Closed, with the reason recorded. |

An issue written after a conversation that already settled it is born `ready-for-agent` and never passes through `triage`.

`wontfix` has three cases. The difference matters because only one of them writes to the knowledge base:

| Why you're closing it | What happens |
| --- | --- |
| Already implemented | A one-line comment that points to where the feature already lives. Nothing goes into `.out-of-scope/`, because it's a built feature, not a rejected one, and a file there would break the dedup checks. |
| Rejected bug | The reason in one line, then close. |
| Rejected enhancement | A file in `.out-of-scope/`, linked from the closing comment, then close. |

`.out-of-scope/` holds one markdown file per rejected **concept**, not per issue. Each file is a short design document, not a database row. It says what was rejected, why, and lists every issue that asked for it. `triage` reads the whole directory before it evaluates anything. It matches by concept, not keyword, so "night theme" matches `dark-mode.md`. When it finds a match, it shows you the old decision and asks if you still agree with it, instead of arguing the request again from the start.

## Verify, then rewrite the body

Before any [grilling](https://www.aihero.dev/ai-coding-dictionary/grilling), `triage` checks that the claim holds. For a bug, it reproduces it from the steps in the issue. Then it reports one of three results:

- Confirmed, with the code path.
- Failed to reproduce.
- Not enough detail to try, which becomes a gap to grill.

In the same pass, it runs two more checks against the codebase. The **redundancy** check asks if the feature is already implemented, and searches by domain concept, not by the issue's wording. The **prior rejection** check asks if `.out-of-scope/` already says no. Both checks are cheap, and a hit on either produces a `wontfix`.

All of this work makes one artifact good: the **agent brief**. When an issue moves to `ready-for-agent`, `triage` rewrites the issue's body as the brief, so the agent that picks it up reads one text and no thread. The tracker keeps the original wording in the body's edit history. Briefs are **durable** rather than precise, because an issue can sit in `ready-for-agent` for weeks while the code changes. So a brief names types, signatures and behavioural contracts, and never file paths or line numbers. If the repo has its own ticket template, the body follows that template and the same principles.

## Common questions

**I ran `/to-spec` and `/to-tickets`. Do I run `/triage` over those tickets?**
No. They are already agent-ready. `to-tickets` creates each one with the `ready-for-agent` label and its category, so an AFK runner picks them up without another pass. `triage` is for what was filed raw.

**Where did `needs-info`, `ready-for-human` and external PRs go?**
They were removed. `needs-info` waits on a reporter, and in a repo where you file your own issues the reporter is in the session, so the question is asked there. `ready-for-human` went unused. Triage of external pull requests assumed outside contributors. A repo that takes issues from the public needs the upstream skill, not this one.

**Why does it rewrite my issue instead of commenting?**
A brief in a comment leaves two texts on the issue, and the agent has to work out which one is the contract. One body removes the question. The only comments `triage` still posts are the one-line reason on a `wontfix`, and a note of what was settled when a session ends with gaps open.

**How is this different from `/diagnosing-bugs`?**
The verification step here is shallow on purpose. It answers "is this real, and roughly where does it live", and does not look for a root cause. If a bug does not reproduce in a few minutes, use [diagnosing-bugs](https://aihero.dev/skills-diagnosing-bugs) to investigate it.

**Can I point it at my whole backlog and let it run?**
You can ask, but watch what it reads. The "show what needs attention" pass is a cheap listing for *selection*. You pick one issue, and then `triage` gathers full [context](https://www.aihero.dev/ai-coding-dictionary/context) on that issue. If you run it across twenty issues at once, the agent can use that cheap listing as its only evidence without telling you. For a bulk pass, say explicitly that it must read each issue in full.

**Does it work with Linear, or anything other than GitHub Issues?**
Yes. The tracker is config, not a hard-coded assumption: GitHub, GitLab, plain markdown files under `.scratch/`, or any tracker you describe to setup.

## It's working if

- Every issue it touches ends with exactly one category role and one state role, never zero, and never two conflicting states.
- It gives you a recommendation with reasoning and stops. It does not relabel the issue and move on.
- It reproduced the bug before anything reached `ready-for-agent`.
- A `ready-for-agent` issue has a body that reads as a ticket, and no brief in its comments.
- The briefs it writes name types and behaviours, and contain no file paths and no line numbers.
- When a request you rejected six months ago comes back, it tells you and quotes the old reason instead of triaging it again.

## Where it fits

`triage` is an **on-ramp**, not a step in the main chain. The main flow starts from a conversation (grill, spec, tickets, implement, review). `triage` is the parallel lane for an issue filed before that conversation happened. Both lanes end at the same place: an issue labelled `ready-for-agent` whose body is the brief. [implement](https://aihero.dev/skills-implement) picks that up the same way it picks up a ticket from [to-tickets](https://aihero.dev/skills-to-tickets). When a request needs more detail before `triage` can brief it, `triage` runs [grilling](https://aihero.dev/skills-grilling) and [domain-modeling](https://aihero.dev/skills-domain-modeling) together, one round of questions at a time, so it records decisions in `GLOSSARY.md` and the ADRs as you make them. When you're not sure which lane you are in, [ask-matt](https://aihero.dev/skills-ask-matt) routes you.
