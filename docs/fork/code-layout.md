# Code layout

A user-invoked, in-progress skill that lays out an app or package by subject first and layer second, each layer defined by what a test of it needs. It writes the convention to `docs/conventions/<package>.md` with its ADR and a pointer in `AGENTS.md`, and adds the linter rule for the enforced edge. (PR #11)

## Fork files
- `skills/in-progress/code-layout/`: the skill and `SHAPES.md`, the layouts already worked out

## Upstream hooks
- `skills/in-progress/README.md`: the `code-layout` entry

## On conflict
- Keep the entry; take upstream's reordering or rewording of the list around it.
- `setup-ts-deep-modules` is upstream's own layout skill and answers a different question (hiding a package's internals behind entry points). Keep both; if upstream ships a subject-first layout skill, compare before keeping two.

## Verify
- `grep -n code-layout skills/in-progress/README.md` matches.
- `/code-layout` on a package with no convention: it shows a tree and a layer table before creating any file, then writes `docs/conventions/<package>.md`.
