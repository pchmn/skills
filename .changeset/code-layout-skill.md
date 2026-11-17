---
"mattpocock-skills": patch
---

Add `code-layout`, an in-progress user-invoked skill: it lays out an app or package by subject first and layer second, each layer defined by what a test of it needs, writes the convention to `docs/conventions/` with its ADR, and makes the linter enforce the one edge that matters. `SHAPES.md` holds the layouts already worked out for a backend behind a framework, a UI, a pure package and a package that is mostly I/O. `setup-matt-pocock-skills` ends by pointing at it when the repo has no `docs/conventions/` and the skill is installed.
