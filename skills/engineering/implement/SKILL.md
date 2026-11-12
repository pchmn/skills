---
name: implement
description: "Implement a ticket or a spec end to end: branch, build test-first, review, pull request. Use when the user asks to implement or build an issue (`implement #42`, `implémente 42`) or a spec."
model: sonnet
---

1. If the user passes a ticket reference, fetch it as the issue tracker doc says under "fetch the relevant ticket", and state its title before starting. If the reference is ambiguous, ask. Without one, the work is the spec or plan in the conversation.
2. Start the work's branch as the repo's Branching convention says. With no convention, stay on the current branch.
3. List the work's acceptance criteria (a ticket's "Done when" or "Acceptance criteria"). For each one a test can check, write that test first and watch it fail, then the code that makes it pass. Typecheck and run single test files as you go.
4. The build is done when every acceptance criterion holds and the repo's full check (typecheck, lint, tests) is green. A criterion met differently, or left out, is named in the pull request, never left silent. Commit.
5. Call the Skill tool with "code-review" on the branch since its merge-base with the default branch. Fix each finding or record why it stays, then commit.
6. Push and open the pull request as the repo's Pull requests convention says. With no convention, stop at the commit and report.
7. Watch the pull request's checks (`gh pr checks --watch` on GitHub) and fix any that go red. The run is done when every check is green; end on the pull request's URL.
