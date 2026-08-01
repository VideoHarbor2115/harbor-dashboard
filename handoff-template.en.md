# Handoff Template — Teaching GitHub Copilot How You Work

**What this is:** a reusable setup you copy into every new project. Once it's in place, GitHub Copilot in VS Code follows a consistent set of working habits and — more importantly — keeps a memory of the project that survives between sessions.

**Why it matters:** Copilot starts every session with amnesia. It doesn't remember what you built yesterday, what you already tried and rejected, or which of its own suggestions turned out to be wrong. The fix isn't a better prompt — it's writing that knowledge into two files in the repo and telling Copilot to read them. That's what most of this template is about.

---

## Setup — three steps

### 1. Create the instructions file

In the project root, create `.github/copilot-instructions.md` and paste in all of **Part A** below.

Copilot Chat and Agent mode read this file automatically — you don't have to attach or `@`-mention it every time.

> VS Code also supports an `AGENTS.md` in the project root, same format. Having both is fine, but don't let them drift apart — pick one as the source of truth and make the other a single line pointing at it.

### 2. Add to `.gitignore`

```
FACTS.local.md
```

This one line is load-bearing. See Part A for what goes in that file.

### 3. Turn on the VS Code setting

`Cmd+,` → search `useInstructionFiles` → make sure **GitHub › Copilot › Chat › Code Generation: Use Instruction Files** is checked. Recent versions enable it by default, but check once.

---

## Part A — paste this into `.github/copilot-instructions.md`

Two things to fill in before you use it, both marked `<<< >>>`: your public contact email, and your preferred response language if it isn't English.

````markdown
# Project Instructions

## Language

Respond in English. Code, identifiers, commit messages, and file names stay in English.

<<< If you want replies in another language, change the line above. Code stays English regardless. >>>

## Ambiguity — ask, don't guess

If any instruction is unclear, ambiguous, or underspecified, **stop and ask before proceeding**. Don't guess, don't fill in the blanks with assumptions, don't pick a plausible interpretation and run with it.

**Ambiguous — ask:** multiple reasonable readings (which file, what scope, what output format, where it goes, what to name it); missing required input (paths, identifiers, versions, target environment); signals that conflict with earlier context or project convention; a destructive or irreversible action (delete, overwrite, force-push, drop table, uninstall) where the intent isn't 100% explicit; vague referents — "this", "that file", "the project".

**Not ambiguous — just proceed:** trivial implementation details (variable names, formatting); anything already covered by project convention or this file; standard best practice with nothing signalling otherwise.

Ask only what you actually need to move forward. Phrase questions concretely — exact paths, exact names, concrete options — never "what do you want?". If only one detail is unclear, ask about that one detail; don't block the whole task on it.

**Rule of thumb:** if you catch yourself thinking "I'll assume they meant…" — stop and ask instead.

## Contact email — hard rule

The only email address that may appear in code, docs, README files, privacy policies, marketing copy, commit messages, store listings, or any other committed or published artifact is:

**`<<< your public contact email >>>`**

Never write any other personal, school, or work email address into this repository — not even one you find in an existing file, a template, the git config, or the environment. If you find a different address anywhere in this repo, treat it as a mistake to be replaced, and flag it. When unsure, ask.

## Persistent memory — two files in the project root

You have no memory between sessions. These files are the memory. Read them at the start of every session, before your first substantive answer.

| File | Git | Holds | Answers |
|---|---|---|---|
| `JOURNAL.md` | tracked | History — what happened, session by session | "How did it end up like this?" |
| `FACTS.md` | tracked | Current state — verified facts only | "What is true right now?" |
| `FACTS.local.md` | **ignored** | Same as FACTS.md, but sensitive | (never leaves this machine) |

### JOURNAL.md — the history

**Prepend** — newest entry at the TOP. Never delete or rewrite old entries.

Write an entry when the user signals the session is ending — "that's it for today", "wrap up", "I'm done", "let's stop here", "goodnight", or anything equivalent — and whenever asked directly. Skip it if there was no real work; a short Q&A with no changes and no decisions doesn't earn an entry.

Entry format:

    ## YYYY-MM-DD

    **Session window:** ~HH:MM – HH:MM
    **Branch:** <branch>

    ### Completed
    - ...

    ### Key decisions / lessons
    - ...

    ### Files modified
    | Path | Change |
    |---|---|

    ### Pending / in progress
    - ...

    ### Notes for next session
    - ...

Record judgment calls and dead ends, not just diffs. The diff is already in git. What git can't tell you is *why* it was done that way, and what was tried first that didn't work — that's the part worth writing down.

### FACTS.md / FACTS.local.md — the current state

When a fact changes, **overwrite it in place**. No changelog, no keeping the old value alongside the new one. The story behind the change belongs in JOURNAL.md.

**"Verified" means exactly two things:** (1) a command was run and its output was seen, or (2) the user stated it as fact.

**Not verified — do not write it down:** anything inferred from code, config, README, or docs (documentation goes stale; "the docs say" is not "this is the current state"); anything qualified with "should be", "probably", or "typically"; a note from an earlier session that hasn't been re-checked. If you're unsure whether something counts as verified, it doesn't.

**One wrong fact is worse than no fact at all**, because it will be acted on without being questioned.

Write a fact the moment you verify it — don't save it up for the end of the session.

Every row records how it was verified and when:

    ## Service versions

    | Fact | Value | How verified | Date |
    |---|---|---|---|
    | Web server | nginx 1.24.0 | ran `nginx -v` on prod | 2026-07-16 |

**Which file does it go in?** Ask: if this line were posted to a public GitHub repo, would it make it easier for a stranger to reach or locate a machine, or reveal something private? If yes → `FACTS.local.md`. When unsure, use local.

- `FACTS.md` — service and framework versions, architecture, hardware specs, what each port is for, build and deploy commands, technical decisions
- `FACTS.local.md` — SSH host/user/port, IP addresses, internal URLs, admin console addresses, account names, where a machine physically sits, and *pointers to* where credentials are stored

**Never write the credentials themselves into either file.** `FACTS.local.md` is untracked, but it's still plaintext sitting on the disk. Pointers only — "key at `~/.ssh/id_ed25519`", "password in 1Password under X". No passwords, API keys, tokens, or private keys, ever.

Facts record what was true **when they were verified**, not what's guaranteed true now. The older the date, the more suspect the row. Re-verify before doing anything with consequences — a deploy, a config change, connecting to something.

**First time:** create only the file that actually has content in it. Don't pre-create an empty counterpart.
````

---

## Part B — what Copilot will *not* do on its own

This is the part people get wrong, so read it before you rely on any of the above.

Copilot has no session lifecycle hooks. It cannot notice that a session started or ended, and it cannot run anything on a schedule. That means the memory system only works if **you** open and close the loop:

| | Happens automatically? |
|---|---|
| Reads `.github/copilot-instructions.md` | ✅ yes, every time |
| Reads `JOURNAL.md` / `FACTS.md` at session start | ❌ **you have to ask** |
| Writes `JOURNAL.md` at session end | ❌ **you have to ask** |
| Anything on a timer or schedule | ❌ not supported |

So two habits to build. Open with:

> Read JOURNAL.md and FACTS.md first, summarize where we left off in one line, then we'll start.

Close with:

> That's it for today — add today's entry to JOURNAL.md.

**To avoid retyping those**, save each one as a prompt file — `.github/prompts/resume.prompt.md` and `.github/prompts/wrapup.prompt.md` — and then just type `/resume` and `/wrapup` in Chat.

**One more thing:** Copilot can only create and edit files in **Agent mode**. In Ask mode it will show you suggestions but never touch the disk — so a "wrap up" request in Ask mode produces a nice-looking journal entry that was never actually saved. Check which mode you're in at the top of the Chat panel.

---

## Part C — why the email rule uses a placeholder

`.github/copilot-instructions.md` gets committed to the repository, and possibly published.

That makes a blocklist self-defeating: writing "never use address X" into a committed file *publishes address X*. The listing does the exact thing the rule exists to prevent.

So Part A uses an allowlist instead — it names the one address that's allowed and says nothing about the ones that aren't. **That's deliberate. Don't "complete" it by adding the addresses to avoid.**

The general principle is worth keeping beyond email: a rule written into a public file can only safely name what's permitted, never what's secret.

---

## Part D — new project checklist

- [ ] Create `.github/copilot-instructions.md` — paste Part A
- [ ] Fill in the two `<<< >>>` placeholders (public email, and language if not English)
- [ ] Add `FACTS.local.md` to `.gitignore`
- [ ] Confirm `useInstructionFiles` is enabled in VS Code settings
- [ ] If the project already has an `AGENTS.md`, reduce it to a pointer so the two files can't contradict each other
- [ ] Optional: create `.github/prompts/resume.prompt.md` and `wrapup.prompt.md`
- [ ] Leave `FACTS.md` / `FACTS.local.md` uncreated until you actually verify something — don't pre-create empty files
