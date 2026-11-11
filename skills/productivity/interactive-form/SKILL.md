---
name: interactive-form
description: "Browser form for answers that are awkward to type in the terminal: a grilling round, or more questions or options than AskUserQuestion takes."
allowed-tools: Bash(node *), Bash(curl -s http://localhost:*)
---

# Interactive form

`scripts/serve-form.mjs` (in this skill's folder) serves a one-page form locally, waits for the
user to submit or cancel, prints the result and exits.

## 1. Write the schema

Write a JSON schema to your scratchpad:

- **Form**: `{ title, intro?, submitLabel?, chat?, text?` and one of `tabs | sections | fields }`.
  A tab is `{ title, sections? | fields? }`, a section `{ title?, description?, fields }`; `intro`
  and `description` keep their line breaks. `text` overrides the UI strings (keys of `TEXT` in the
  script).
- **Field**: `{ name, label?, help?, placeholder?, value?, required?, pattern?, type?, options? }`,
  `type` one of `text` (default), `textarea`, `radio`, `checkbox`; `options` is
  `[{ value, label?, help? }]`. `value` pre-fills a text field or pre-selects a radio option.
  `label: ""` hides the label.

### A grilling round

One section per question: `title` is `Q<n>: <question title>`, `description` is the question
body followed by a blank line and `➡️ Recommended: <your answer>`. Each section holds one
`textarea` named `q<n>`, `label: ""`, `value: "yes"`, so submitting untouched accepts every
recommendation. When the question offers choices, add a `radio` named `q<n>_choice` above it,
pre-selected on the recommended one, and make the textarea optional (a comment). Put the round's
context in `intro`, and set `"chat": true`. The form carries the questions: in the terminal,
just say it opened.

## 2. Serve it

```bash
node <this skill>/scripts/serve-form.mjs --schema <scratchpad>/form.json --open
```

It prints `FORM_URL=http://localhost:<port>` (from 4321, the next free one; `--port` changes the
start).

Run it with `run_in_background: true`, tell the user a form opened in their browser, then wait for
the task to finish. It can take more than 10 minutes: never relaunch it on your own. If the user
says they're giving up, stop the task.

With `"chat": true`, also start a `Monitor` on the task's output file, with the maximum
timeout, re-armed on each expiry while the form is open:

```bash
tail -n +1 -f <task output file> | grep --line-buffered '^FORM_CHAT '
```

Each event is a message the user typed in the form's chat panel. Answer it as you would in the
terminal (look things up first if needed), then post your answer, in plain text, to the page:

```bash
curl -s <FORM_URL>/reply --data-binary @- <<'EOF'
<your answer>
EOF
```

Stop the monitor once the form task has finished.

## 3. Read the result

Between `FORM_RESULT_BEGIN` and `FORM_RESULT_END`: `status` (`saved` / `cancelled`) and `data`
(answers by field name; a checkbox gives the array of checked values). On `cancelled`, ask in the
chat how to carry on.
