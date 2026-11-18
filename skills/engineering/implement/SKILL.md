---
name: implement
description: "Implement a ticket or a spec end to end: branch, build test-first, review, pull request. Use when the user asks to implement or build an issue (`implement #42`, `implémente 42`) or a spec."
---

You write the code in this session. Spawn builders only when the work splits into large parts that touch separate files and could each be built and checked alone. A builder is a subagent on a lighter model than yours (`model: "sonnet"` in Claude Code), started with a fresh context window. It owns its part's tests and checks and reports what it built and their result: do not re-run its checks or re-read its diff beyond what the review needs.

Edit files with the harness's file-editing tool (Edit in Claude Code), never a shell string replace or `sed -i`: a replace whose old text is missing changes nothing and reports no error, and `sed -i` differs between GNU and BSD. Revert a file with `git restore <path>`, never a whole-tree `git checkout -- .`. A builder's brief says both.

1. If the user passes a ticket reference, fetch it as the issue tracker doc says under "fetch the relevant ticket", and state its title before starting. If the reference is ambiguous, ask. Without one, the work is the spec or plan in the conversation.
2. List the open pull requests that change files this work is likely to change (`gh pr list` with each one's files, on GitHub). If there are any, name them and the shared files, and ask the user whether to start now or wait for them to merge.
3. Start the work's branch as the repo's Branching convention says. With no convention, stay on the current branch.
4. List the work's acceptance criteria (a ticket's "Done when" or "Acceptance criteria"). For each criterion a test can check, write that test first and watch it fail, then the code that makes it pass, typechecking and running single test files as you go. A builder gets the criteria of its part, the working tree's path, and this same bar.
5. The build is done when every acceptance criterion holds and the repo's full check (typecheck, lint, tests) is green. Run that check once, here, not after each change. A slow suite (end-to-end tests, packaging) runs locally only when the repo's docs say the change needs it; otherwise the pull request's checks run it. A criterion met differently, or left out, is named in the pull request, never left silent. Commit.
6. Call the Skill tool with "code-review" on the branch since its merge-base with the default branch. Fix each finding, or hand it back to the builder whose part it is in (`SendMessage` in Claude Code), or record why it stays, then commit.
7. Push and open the pull request as the repo's Pull requests convention says. With no convention, stop at the commit and report.
8. Watch the pull request's checks in the background (`gh pr checks --watch` on GitHub) and fix any that go red. The run is done when every check is green; end on the pull request's URL.
