---
name: code-layout
description: Lay out an app or package by subject first and layer second, each layer defined by what a test of it needs, then write the convention down and make the linter enforce it.
disable-model-invocation: true
---

# Code layout

Lay out one app or package so that everything about a subject is read in one folder, and the code a test reaches with no mock sits apart from the code that touches the outside. The idea is fixed; the folders are derived for each package, so two packages of one repo may end up with different layers.

For the words **seam** and **adapter**, call the Skill tool with "codebase-design".

## The idea

**Subject first.** `src/modules/<subject>/` holds one folder per thing the glossary names, in the singular: `group`, `task`, `match`. A module is a thing; an act (joining, sending, transferring) is a file inside the module of the thing it acts on. A subject keeps the same name in every package that handles it.

**Layer second, and a test decides the layer.** A file belongs to a layer because of what a test of that file needs:

| Layer | A test of it needs | Usual names |
| --- | --- | --- |
| Pure | no mock, nothing awaited | `rules/`, `domain/` |
| Orchestration | a fake of what it depends on, or a host to run it | `usecases/`, `hooks/` |
| Outside | the real database, network, process or store | `adapters/` |
| Display | a renderer | `ui/` |

The pure and the outside layers mean the same in every package. The orchestration layer is named for what runs it: a use case called by a handler, a hook called by a mounted component.

**A layer exists only when it holds files.** A pure package has modules and no layers. A package of three files stays flat.

**One door.** The package has one public seam, the place the outside calls in: the framework's function files, the route files, the RPC handlers, an `index.ts`. Pure code is tested directly; everything else is tested through the door.

**Few enforced edges.** The linter enforces that the pure layer imports nothing impure. Where it pays, it also enforces that orchestration imports no adapter. Every other direction is navigation: the convention states it and nothing checks it. Modules import each other freely.

**What belongs to no subject** goes in `shared/`, and the composition root, the one file that builds every adapter, sits outside the modules.

**Files**: kebab-case, a test beside the file it tests, an import that names its file (no barrel).

**Growth**: a module that outgrows its folders splits into `submodules/`, so that a path still says which layer belongs to which module.

## Steps

### 1. Read the package

Read `GLOSSARY.md`, `docs/conventions/`, the ADRs that touch the package, and the code if there is any.

**Done when** you can name three things: the subjects, what touches the outside, and where the outside calls in.

### 2. Pick the subjects

Take them from the glossary. A subject earns a module when it is a thing that carries rules of its own; an entity living inside another one stays in its owner's module.

**Done when** every existing file, or every feature planned, lands in one module or in `shared/`.

### 3. Pick the layers

Sort the package's code with the test question from the table. Keep the layers that hold files, and name the orchestration layer for what runs it. [SHAPES.md](SHAPES.md) holds the shapes already worked out for a backend behind a framework, a UI, a pure package and a package that is mostly I/O: start from the nearest one.

**Done when** each layer has a one-line test of membership that places any file without a debate.

### 4. Pick the door and the enforced edges

Name the public seam. Then write each enforced edge as a rule on paths, because a rule the linter cannot express stays navigation.

**Done when** each enforced edge reads as "files under this glob import none of these".

### 5. Show the user

Show the tree, the layer table with its tests of membership, the door and the enforced edges.

**Done when** the user has approved the layout, before any file is created or moved.

### 6. Write it down

- `docs/conventions/<package>.md` says what the code looks like: the tree, each layer's test of membership, the naming, where a test lives. It opens by naming the ADRs behind it.
- The reasons go in an ADR: call the Skill tool with "domain-modeling" and follow its ADR format.
- Add a pointer in `AGENTS.md` or `CLAUDE.md`, under `### Conventions`: "Read `docs/conventions/<package>.md` before writing in `<path>/`."

**Done when** the convention file, the ADR and the pointer exist, and the convention repeats no reason the ADR gives.

### 7. Move what exists

Move files with `git mv` and fix the import paths that follow. Rename and rewrite nothing in the same change, so the review reads as moves. Create a folder with its first file, never ahead of it.

**Done when** the tests that go through the door pass without a line of them changed.

### 8. Make the linter enforce it, and prove it bites

Add each enforced edge to the linter (with Biome, a `noRestrictedImports` override on the layer's glob), with a message that cites the ADR.

**Done when** you have seen the lint pass, then fail on a forbidden import added on purpose, then pass again once it is reverted.
