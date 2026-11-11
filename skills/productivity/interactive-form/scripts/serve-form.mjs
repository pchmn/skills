#!/usr/bin/env node
// Schema, flags and output: see ../SKILL.md.

import http from 'node:http';
import fs from 'node:fs';
import childProcess from 'node:child_process';

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const val = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
      args[key] = val;
    }
  }
  return args;
}

const args = parseArgs(process.argv.slice(2));
const startPort = parseInt(args.port, 10) || 4321;

if (!args.schema) {
  console.error('ERROR: --schema <path> is required');
  process.exit(1);
}

let schema;
try {
  schema = JSON.parse(fs.readFileSync(args.schema, 'utf8'));
} catch (e) {
  console.error('ERROR: could not read/parse schema: ' + e.message);
  process.exit(1);
}

const sectionsOf = (node) => node.sections || [{ fields: node.fields || [] }];
const tabs = (schema.tabs || [schema]).map((t) => ({ title: t.title, sections: sectionsOf(t) }));
const allFields = tabs.flatMap((t) => t.sections.flatMap((s) => s.fields || []));
for (const f of allFields) {
  if (!f.name) {
    console.error('ERROR: every field needs a name: ' + JSON.stringify(f));
    process.exit(1);
  }
}

const TEXT = {
  lang: 'en',
  title: 'Form',
  save: schema.submitLabel || 'Submit',
  cancel: 'Cancel',
  optional: 'optional',
  checkOne: 'Pick at least one option.',
  savedTitle: 'Submitted',
  savedText: 'You can close this tab and go back to the terminal.',
  cancelledTitle: 'Cancelled',
  cancelledText: 'Nothing was sent. You can close this tab.',
  chatTitle: 'Discuss with the agent',
  chatPlaceholder: 'Ask about a question… (Enter to send)',
  chatWaiting: 'The agent is answering…',
  ...schema.text,
};

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formData(params) {
  return Object.fromEntries(allFields.map((f) => [f.name, f.type === 'checkbox' ? params.getAll(f.name) : params.get(f.name) ?? '']));
}

const CSS = `
:root { --paper:#f4f0e8; --ink:#2b221c; --muted:#8a7f74; --line:#ddd5c8; --tint:#ebe5da; }
@media (prefers-color-scheme: dark) { :root { --paper:#1c1916; --ink:#ece6dc; --muted:#9a9084; --line:#38322c; --tint:#2a2520; } }
* { box-sizing:border-box; }
body { margin:0; background:var(--paper); color:var(--ink); font:15px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif; }
main { max-width:720px; margin:0 auto; padding:64px 16px 140px; }
h1 { font-size:22px; font-weight:600; letter-spacing:-.01em; margin:0 0 6px; }
.intro { color:var(--muted); margin:0 0 40px; white-space:pre-wrap; }
section.boxed { border:1px solid var(--line); border-radius:4px; padding:18px 20px 4px; margin-bottom:20px; }
section h2 { font-size:15px; font-weight:600; margin:0 0 8px; }
section > header { font-size:14px; margin-bottom:4px; white-space:pre-wrap; }
.tabs { display:flex; gap:28px; border-bottom:1px solid var(--line); margin-bottom:36px; }
.tabs button { border:0; border-bottom:1px solid transparent; border-radius:0; background:none; padding:0 0 10px; margin-bottom:-1px;
  color:var(--muted); font-size:12px; font-weight:600; letter-spacing:.08em; text-transform:uppercase; }
.tabs button.active { color:var(--ink); border-bottom-color:var(--ink); }
.field { padding:14px 0 18px; }
.top { display:flex; align-items:baseline; gap:10px; margin-bottom:8px; }
label { font-weight:600; }
code { font:11px ui-monospace,SFMono-Regular,Menlo,monospace; color:var(--muted); }
input, textarea { width:100%; padding:10px 12px; border:1px solid transparent; border-radius:3px; background:var(--tint);
  color:var(--ink); font:14px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif; }
textarea { min-height:84px; resize:vertical; }
input:focus, textarea:focus { outline:none; }
.help { color:var(--muted); font-size:13px; margin:6px 0 0; white-space:pre-wrap; }
button { font:inherit; cursor:pointer; color:var(--ink); background:none; border:0; padding:0; }
button.primary { background:var(--ink); color:var(--paper); padding:10px 22px; border-radius:2px; font-weight:600; }
#cancel { padding:10px 6px; color:var(--muted); }
#cancel:hover { color:var(--ink); }
button:disabled { opacity:.35; cursor:default; }
footer { position:fixed; left:0; right:0; bottom:0; background:var(--paper); border-top:1px solid var(--line); }
footer div { max-width:720px; margin:0 auto; padding:16px; display:flex; gap:18px; align-items:center; justify-content:flex-end; }
.opts { display:flex; flex-direction:column; gap:10px; margin-top:4px; }
.opt { display:flex; gap:12px; align-items:flex-start; font-weight:400; cursor:pointer; }
.opt input { flex:none; width:16px; height:16px; margin:3px 0 0; padding:0; accent-color:var(--ink); }
.opt input[type=radio] { appearance:none; border:1.5px solid var(--muted); border-radius:50%; background:none; }
.opt input[type=radio]:checked { border-color:var(--ink); background:radial-gradient(var(--ink) 0 45%, transparent 50%); }
.opt-help { display:block; color:var(--muted); font-size:13px; }
.done { padding:120px 0; }
.done h1 { margin-bottom:8px; }
.layout.with-chat { display:grid; grid-template-columns:minmax(0,720px) 460px; gap:40px; justify-content:center; padding:0 16px; }
.layout.with-chat main { margin:0; padding-left:0; padding-right:0; }
aside { position:sticky; top:24px; margin-top:24px; height:calc(100vh - 120px); display:flex; flex-direction:column;
  border:1px solid var(--line); border-radius:4px; overflow:hidden; }
aside h2 { font-size:12px; font-weight:600; letter-spacing:.08em; text-transform:uppercase; color:var(--muted); margin:0; padding:14px 16px;
  border-bottom:1px solid var(--line); }
#messages { flex:1; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:10px; }
.msg { padding:8px 12px; border-radius:6px; font-size:14px; white-space:pre-wrap; max-width:90%; }
.msg.user { align-self:flex-end; background:var(--ink); color:var(--paper); }
.msg.agent { align-self:flex-start; background:var(--tint); }
#waiting { color:var(--muted); font-size:13px; padding:0 16px 8px; }
#chat-input { border:0; border-top:1px solid var(--line); border-radius:0; min-height:72px; }
@media (max-width:1000px) { .layout.with-chat { display:block; } aside { position:static; height:420px; margin:0 0 140px; } }
`;

function renderField(f) {
  const id = 'f_' + f.name;
  const top = f.label === '' ? '' : `<div class="top"><label for="${esc(id)}">${esc(f.label || f.name)}</label>${f.required ? '' : `<code>${esc(TEXT.optional)}</code>`}</div>`;
  const help = f.help ? `<p class="help">${esc(f.help)}</p>` : '';
  if (f.type === 'checkbox' || f.type === 'radio') {
    const opts = (f.options || [])
      .map(
        (o, i) => `<label class="opt"><input type="${f.type}" name="${esc(f.name)}" value="${esc(o.value)}"${i ? '' : ` id="${esc(id)}"`}${
          f.type === 'radio' && f.required ? ' required' : ''
        }${f.value === o.value ? ' checked' : ''}>
  <span><span>${esc(o.label || o.value)}</span>${o.help ? `<span class="opt-help">${esc(o.help)}</span>` : ''}</span></label>`,
      )
      .join('\n');
    return `<div class="field"${f.type === 'checkbox' && f.required ? ' data-required-group' : ''}>${top}${help}<div class="opts">${opts}</div></div>`;
  }
  const attrs = `id="${esc(id)}" name="${esc(f.name)}" placeholder="${esc(f.placeholder || '')}"${f.required ? ' required' : ''} autocomplete="off"`;
  const control =
    f.type === 'textarea'
      ? `<textarea ${attrs}>${esc(f.value)}</textarea>`
      : `<input ${attrs} type="text" value="${esc(f.value)}"${f.pattern ? ` pattern="${esc(f.pattern)}"` : ''} spellcheck="false">`;
  return `<div class="field">${top}${control}${help}</div>`;
}

function renderPage() {
  const tabBar = schema.tabs
    ? `<nav class="tabs">${tabs
        .map((t, i) => `<button type="button" data-tab="${i}"${i ? '' : ' class="active"'}>${esc(t.title || String(i + 1))}</button>`)
        .join('')}</nav>`
    : '';
  const renderSection = (s) => `<section${s.title ? ' class="boxed"' : ''}>
  ${s.title ? `<h2>${esc(s.title)}</h2>` : ''}
  ${s.description ? `<header>${esc(s.description)}</header>` : ''}
  ${(s.fields || []).map(renderField).join('\n')}
</section>`;
  const body = tabs
    .map((t, i) => `<div data-panel="${i}"${i ? ' hidden' : ''}>${t.sections.map(renderSection).join('\n')}</div>`)
    .join('\n');

  return `<!doctype html>
<html lang="${esc(TEXT.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(schema.title || TEXT.title)}</title>
<style>${CSS}</style>
</head>
<body>
<div class="layout${schema.chat ? ' with-chat' : ''}">
<main id="main">
  <h1>${esc(schema.title || TEXT.title)}</h1>
  ${schema.intro ? `<p class="intro">${esc(schema.intro)}</p>` : ''}
  ${tabBar}
  <form id="form">${body}</form>
</main>
${
  schema.chat
    ? `<aside id="chat"><h2>${esc(TEXT.chatTitle)}</h2><div id="messages"></div><div id="waiting" hidden>${esc(TEXT.chatWaiting)}</div>
<textarea id="chat-input" placeholder="${esc(TEXT.chatPlaceholder)}"></textarea></aside>`
    : ''
}
</div>
<footer id="bar"><div>
  <button type="button" id="cancel">${esc(TEXT.cancel)}</button>
  <button type="button" id="save" class="primary">${esc(TEXT.save)}</button>
</div></footer>
<script>
  var TEXT = ${JSON.stringify(TEXT).replace(/</g, '\\u003c')};
  var chat = document.getElementById("chat");
  var polling;

  if (chat) {
    var list = document.getElementById("messages");
    var input = document.getElementById("chat-input");
    var seen = 0;
    var poll = function () {
      fetch("/messages?after=" + seen).then(function (r) { return r.json(); }).then(function (msgs) {
        msgs.forEach(function (m) {
          var el = document.createElement("div");
          el.className = "msg " + m.from;
          el.textContent = m.text;
          list.appendChild(el);
          document.getElementById("waiting").hidden = m.from !== "user";
        });
        seen += msgs.length;
        if (msgs.length) list.scrollTop = list.scrollHeight;
      }).catch(function () {});
    };
    polling = setInterval(poll, 1000);
    input.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" || e.shiftKey || e.isComposing) return;
      e.preventDefault();
      var text = input.value.trim();
      if (!text) return;
      input.value = "";
      fetch("/chat", { method: "POST", body: text }).then(poll).catch(function () {});
    });
  }

  document.querySelectorAll("[data-tab]").forEach(function (t) {
    t.addEventListener("click", function () {
      document.querySelectorAll("[data-tab]").forEach(function (o) { o.classList.toggle("active", o === t); });
      document.querySelectorAll("[data-panel]").forEach(function (p) { p.hidden = p.dataset.panel !== t.dataset.tab; });
    });
  });

  function finish(url, title, text) {
    document.getElementById("save").disabled = true;
    document.getElementById("cancel").disabled = true;
    var body = url === "/submit" ? new URLSearchParams(new FormData(document.getElementById("form"))) : "";
    fetch(url, { method: "POST", body: body }).catch(function () {}).then(function () {
      clearInterval(polling);
      document.getElementById("bar").remove();
      if (chat) chat.remove();
      var main = document.getElementById("main");
      main.innerHTML = '<div class="done"><h1></h1><p class="intro"></p></div>';
      main.querySelector("h1").textContent = title;
      main.querySelector("p").textContent = text;
    });
  }

  function showTabOf(el) {
    var panel = el.closest("[data-panel]");
    var tab = panel && document.querySelector('[data-tab="' + panel.dataset.panel + '"]');
    if (tab) tab.click();
  }

  function valid() {
    var groups = document.querySelectorAll("[data-required-group]");
    for (var i = 0; i < groups.length; i++) {
      var boxes = groups[i].querySelectorAll("input");
      boxes[0].setCustomValidity(groups[i].querySelector("input:checked") ? "" : TEXT.checkOne);
    }
    var bad = document.querySelector("#form :invalid");
    if (!bad) return true;
    showTabOf(bad);
    bad.reportValidity();
    return false;
  }

  document.getElementById("save").addEventListener("click", function () {
    if (!valid()) return;
    finish("/submit", TEXT.savedTitle, TEXT.savedText);
  });
  document.getElementById("cancel").addEventListener("click", function () {
    finish("/cancel", TEXT.cancelledTitle, TEXT.cancelledText);
  });
  document.getElementById("form").addEventListener("submit", function (e) { e.preventDefault(); });
</script>
</body>
</html>`;
}

function openBrowser(url) {
  const cmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
  try {
    childProcess.spawn(cmd, [url], { stdio: 'ignore', detached: true, shell: process.platform === 'win32' }).unref();
  } catch {
    /* the URL is printed anyway */
  }
}

const messages = [];

function finish(server, result) {
  console.log('FORM_RESULT_BEGIN');
  console.log(JSON.stringify(result));
  console.log('FORM_RESULT_END');
  setTimeout(() => {
    server.close();
    process.exit(0);
  }, 300);
}

function startServer(port, attemptsLeft) {
  const server = http.createServer((req, res) => {
    // Another site open in the browser, or a DNS-rebound name, could otherwise forge answers.
    const local = (h) => /^(localhost|127\.0\.0\.1):\d+$/.test(h || '');
    if (!local(req.headers.host) || (req.headers.origin && !local(req.headers.origin.replace(/^http:\/\//, '')))) {
      res.writeHead(403);
      return res.end();
    }
    if (req.method === 'GET' && (req.url === '/' || req.url.startsWith('/?'))) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(renderPage());
      return;
    }
    if (req.method === 'GET' && req.url.startsWith('/messages')) {
      const after = parseInt(new URL(req.url, 'http://x').searchParams.get('after'), 10) || 0;
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(messages.slice(after)));
      return;
    }
    if (req.method === 'POST' && ['/submit', '/cancel', '/chat', '/reply'].includes(req.url)) {
      const chunks = [];
      req.on('data', (c) => chunks.push(c));
      req.on('end', () => {
        // Concatenated before decoding, so a multi-byte character split across chunks survives.
        const raw = Buffer.concat(chunks).toString('utf8');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end('{"ok":true}');
        if (req.url === '/chat') {
          messages.push({ from: 'user', text: raw });
          return console.log('FORM_CHAT ' + JSON.stringify({ text: raw }));
        }
        if (req.url === '/reply') return messages.push({ from: 'agent', text: raw.trim() });
        if (req.url === '/cancel') return finish(server, { status: 'cancelled', data: {} });
        finish(server, { status: 'saved', data: formData(new URLSearchParams(raw)) });
      });
      return;
    }
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE' && attemptsLeft > 0) {
      startServer(port + 1, attemptsLeft - 1);
    } else {
      console.error('ERROR: ' + err.message);
      process.exit(1);
    }
  });

  server.listen(port, '127.0.0.1', () => {
    const url = 'http://localhost:' + port;
    console.log('FORM_URL=' + url);
    if (args.open) openBrowser(url);
  });
}

startServer(startPort, 20);
