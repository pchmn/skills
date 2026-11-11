---
name: triage
description: Move issues through a state machine of triage roles, categorise, verify, grill if needed, and rewrite each one into an agent-ready ticket.
disable-model-invocation: true
---

# Triage

Move issues on the project issue tracker through a small state machine of triage roles. Triage turns a `needs-triage` issue (a raw idea, a bug noticed in passing) into a ticket an agent can pick up, or closes it with a recorded reason.

## Reference docs

- [AGENT-BRIEF.md](AGENT-BRIEF.md): how to write a durable agent brief
- [OUT-OF-SCOPE.md](OUT-OF-SCOPE.md): how the `.out-of-scope/` knowledge base works

## Roles

Two **category** roles:

- `bug`: something is broken
- `enhancement`: new feature or improvement

Three **state** roles:

- `needs-triage`: an idea not yet grilled into a ticket
- `ready-for-agent`: the issue body is an agent brief with every gap settled
- `wontfix`: will not be actioned

Every issue carries exactly one category role and one state role, both set by whoever creates it. If state roles conflict, flag it and ask the maintainer before doing anything else.

These are canonical role names. The actual label strings used in the issue tracker may differ. The mapping should have been provided to you. If not, tell the user to run `/setup-matt-pocock-skills`.

State transitions: `needs-triage` moves to `ready-for-agent` or `wontfix`. An unlabeled issue is treated as `needs-triage`. The maintainer can override at any time; flag transitions that look unusual and ask before proceeding.

## Invocation

The maintainer invokes `/triage` and describes what they want in natural language. Interpret the request and act. Examples:

- "Show me anything that needs my attention"
- "Let's look at #42"
- "Move #42 to ready-for-agent"
- "What's ready for agents to pick up?"

## Show what needs attention

Query the issue tracker and present three buckets, oldest first:

1. **Unlabeled**: never given a state.
2. **`needs-triage`**: waiting to become a ticket.
3. **Closed but still `needs-triage`**: a stale label to remove.

Show counts and a one-line summary per item. Let the maintainer pick.

## Triage a specific issue

1. **Gather context.** Read the full issue (body, comments, labels, dates). Explore the codebase using the project's domain glossary, respecting ADRs in the area. Run two checks against the codebase: (a) **redundancy**: search for an existing implementation of the requested behavior by domain concept (not just the request's wording), and report where you looked. If found, it's an already-implemented `wontfix` (step 5). (b) **prior rejection**: read `.out-of-scope/*.md` and surface any that resembles this request.

2. **Recommend.** Tell the maintainer your category and state recommendation with reasoning, plus a brief codebase summary relevant to the request (including whether it's already implemented). Wait for direction.

3. **Verify the claim.** Before any grilling, check that the claim holds up. For a bug, reproduce it from the steps in the issue. Report what happened: confirmed (with code path), failed, or insufficient detail (a gap to grill). A confirmed verification makes a much stronger agent brief.

4. **Grill (if needed).** If the request needs fleshing out, call the Skill tool twice, for "grilling" and "domain-modeling", and grill it into shape a round of questions at a time, sharpening domain terms and updating `GLOSSARY.md`/ADRs inline as decisions land. The maintainer is in the session, so every open question is settled here; none is parked on the issue.

5. **Apply the outcome:**
   - `ready-for-agent`: rewrite the issue's body as an agent brief ([AGENT-BRIEF.md](AGENT-BRIEF.md)), then swap the state label. The body is the brief, so post no comment.
   - For `wontfix`, close the issue with a one-line comment that depends on *why*:
     - **Already implemented**: the change already exists in the codebase. Point to where it lives; do **not** write to `.out-of-scope/` (that KB is for *rejected* requests, not built ones).
     - **Rejected (bug)**: give the reason, then close.
     - **Rejected (enhancement)**: write to `.out-of-scope/`, link to it from the comment, then close ([OUT-OF-SCOPE.md](OUT-OF-SCOPE.md)).
   - `needs-triage`: the session ended with gaps open. Leave the label, and record what was settled in a comment so the next session starts from it.

## Quick state override

If the maintainer says "move #42 to ready-for-agent", trust them and apply the role directly. Confirm what you're about to do (role change, body rewrite, close), then act. Skip grilling. If moving to `ready-for-agent` without a grilling session, ask whether they want the body rewritten as an agent brief.

## Resuming a previous session

If a comment on the issue records what an earlier triage session settled, read it and present an updated picture before continuing. Don't re-ask resolved questions.
