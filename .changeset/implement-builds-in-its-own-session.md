---
"mattpocock-skills": patch
---

`implement` writes the code in its own session and spawns Sonnet builders only for large parts that touch separate files. A builder owns its tests and checks, and the session no longer re-runs them.
