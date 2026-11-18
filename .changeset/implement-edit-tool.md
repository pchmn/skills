---
"mattpocock-skills": patch
---

`implement` edits files with the harness's edit tool rather than shell string replaces or `sed -i`, which fail silently or differ by platform, and reverts a file with `git restore <path>`.
