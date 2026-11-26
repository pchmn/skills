---
name: tdd
description: Test-driven development. Use when the user wants to build features or fix bugs test-first, mentions "red-green-refactor", or wants integration tests.
---

# Test-Driven Development

The user asked for the red → green loop: a failing test, then only enough code to pass it, then the next behaviour. What they expect of it:

- **Agreed seams.** Test only at public boundaries the user agreed to. When the repo's docs say what gets a test and where, they are the agreement. Otherwise, before any test exists, propose the seams, each with a line on what it catches and what it misses, and wait for the user.
- **Vertical slices.** One test, one minimal implementation, repeat. Never a batch of tests before the code: they test an imagined shape.
- **Expected values from outside the code.** A known literal, a worked example, the spec; never a value recomputed the way the code computes it.
- **No refactor phase.** Refactoring belongs to the `code-review` skill.

For the vocabulary of modules, interfaces and seams, call the Skill tool with "codebase-design".
