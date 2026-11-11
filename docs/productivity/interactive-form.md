## What it does

`interactive-form` puts a set of questions in a browser form instead of the terminal. The [agent](https://www.aihero.dev/ai-coding-dictionary/agent) writes a small JSON schema, a local Node script serves it as one page, and the answers come back into the [session](https://www.aihero.dev/ai-coding-dictionary/session) when you submit. Nothing is installed: the script uses Node's standard library only.

The form is pre-filled with the agent's answers. In a grilling round, every question's text box already holds "yes" under the recommendation, and every choice is pre-selected on the recommended option. Submitting an untouched form accepts every recommendation, so you only type where you disagree.

## When to reach for it

Type `/interactive-form`, or the agent reaches for it on its own when a task fits.

| What you have | Reach for |
| --- | --- |
| A [grilling](https://aihero.dev/skills-grilling) round of several questions | This skill: one section per question, recommendation underneath |
| More questions or options than the [harness](https://www.aihero.dev/ai-coding-dictionary/harness)'s own question tool takes | This skill |
| One or two quick questions | The terminal, or the harness's question tool |

## The round in a page

A grilling round maps one to one onto the form: the round's context becomes the intro, each question becomes a section titled `Q<n>: <title>`, and the recommendation sits on its `➡️` line under the question body. Answers come back keyed by question number, the same shape as answering a round "1 yes, 2 the second option" in the terminal.

With the chat panel on (the default for a grilling round), a side question typed in the form reaches the agent while the form stays open. The agent looks things up if it needs to and posts its answer back to the page. You never leave the form to ask "what does this option change?".

## Common questions

**How do I make every grilling session use it?**
`setup-matt-pocock-skills` writes a `### Grilling` sub-block into the repo's `AGENTS.md` or `CLAUDE.md` when this skill is installed. That sub-block sends every grilling round through the form unless you ask for the terminal.

**The form has been open for a long time. Has the agent given up?**
No. The script waits for you to submit or cancel, with no time limit, and the agent waits on it. Cancelling hands the decision back to the chat.

## It's working if

- A grilling round opens in your browser with every recommendation already filled in, and submitting it untouched accepts them all.
- A question typed in the chat panel gets an answer on the page without you going back to the terminal.
- The next round arrives in a new form, built from the answers you just submitted.

## Where it fits

A **reach-for-it-anytime standalone** that carries other skills' questions. [grilling](https://aihero.dev/skills-grilling) and its wrappers decide what to ask; this skill only changes where you answer. [ask-matt](https://aihero.dev/skills-ask-matt) maps the rest.
