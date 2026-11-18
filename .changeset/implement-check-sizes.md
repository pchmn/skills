---
"mattpocock-skills": patch
---

`implement` runs the repo's full check once, before the commit, and leaves slow suites (end-to-end tests, packaging) to the pull request's checks unless the repo's docs say the change needs them locally.
