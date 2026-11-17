# Shapes

Four layouts derived from the same idea. Start from the nearest one and change what the package needs changed.

## A backend behind a framework

The framework reads some files by path (function files, route handlers). Those are the door; the rules live beside it, where the framework is unknown.

```
<framework dir>/          the door: arguments, the use case given its dependencies, the answer
src/
  modules/<subject>/
    domain/               the subject's types, its rules and the interfaces it needs (ports)
    usecases/             one file per intention, named for it: create-group.ts
    adapters/             the ports' implementations: the only code that imports the framework
  shared/                 ids, errors, what every subject reads
  adapters/               the composition root: builds every adapter from one context
```

- **Enforced**: `shared/`, `domain/` and `usecases/` import neither the framework nor any `adapters/`.
- **Tests**: `domain/` directly; use cases and adapters through the door.
- A use case takes its parameters first and its dependencies second, and imports `domain/` only: its own, a neighbour's, `shared/`.
- Time comes in as a parameter (`now`), so a rule never reads the clock.

## A UI

The router owns one folder. A route file is the adapter at the routing seam: it picks the frame and composes pieces of the modules.

```
app/ or routes/           the door: the URL, the frame, which pieces of modules/*/ui/ to show
modules/<subject>/
  rules/                  what a test reaches with no mock: no React, router, client or adapter
  adapters/               speaks to a store or a client without being a hook
  hooks/                  what needs a mounted component: use- in the filename and in every export
  ui/                     what a route composes
core/                     what every module reads through: clients, theme, i18n, the UI kit
```

- **Enforced**: `rules/` imports nothing of React, the router, a client or an adapter. `ui/` reads `hooks/`, and `hooks/` read `rules/` and `adapters/`: navigation.
- **Tests**: `rules/` directly. A file that needs a mock to reach one of its functions is holding two layers: split it.
- One hook per mutation the UI sends, named for the backend use case it calls: `use-rename-group.ts` for `rename-group.ts`.
- A module is named as the backend names it when both handle the subject.

## A pure package

No database, no framework, no platform call: the package is all rules, so the layers would be empty folders.

```
src/
  modules/<subject>/      types beside their rules, flat
  shared/
  index.ts                the door: what the outside reads is exported here
```

- **Enforced**: the whole package imports no framework and no platform module.
- **Tests**: beside the file, calling the function, nothing mocked.
- Scripts the package runs stay at its root, outside `src/`.

## A package that is mostly I/O

A server that drives processes, streams, files and sockets. The outside layer is the largest, and the pure layer is what makes the rest testable: parsing, merging, deciding.

```
rpc/ or handlers/         the door
modules/<subject>/
  rules/                  pure and synchronous: parse a line, merge a patch, pick a winner
  usecases/               orchestration against ports, long-lived ones included
  adapters/               the processes, the files, the sockets, the database
shared/
main.ts                   the composition root
```

- **Enforced**: `rules/` imports no runtime, platform or effect library; `usecases/` import no adapter and no platform module.
- **Tests**: `rules/` directly, on recorded output kept as fixtures. The rest through the door, with one scripted adapter standing in for each outside process, so no test starts a real one.
- A second adapter written for the tests is what makes the port a real seam.
