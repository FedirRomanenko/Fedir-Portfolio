# Remaining Projects Pages Implementation Plan

> **For agentic workers:** Use the host's available task-by-task implementation workflow. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add four translated project pages, their real image galleries, and four entries in the portfolio catalogue.

**Architecture:** Each static page follows `projects/project-template.html` and loads the shared local translator. `projects.html` receives one card per project. A compact shared CSS rule provides a responsive advantages/limitations section.

**Tech Stack:** Static HTML, CSS, JavaScript, GitHub Pages, PowerShell, Git.

## Global Constraints

- Use only owner-confirmed facts recorded in `docs/specs/2026-09-20-remaining-projects-design.md`.
- Keep the existing header, flags and template structure.
- Use only local RU/EN/PT translations; no external translation service.
- Each page contains a gallery and «Плюсы и минусы» section.

---

### Task 1: Organise supplied media

**Files:**
- Create: `assets/images/alarm-*.jpeg`, `assets/images/powerbank-*.jpeg`, `assets/images/pet-recycler-*.jpeg`, `assets/images/fm-radio-*.jpeg`
- Test: PowerShell `Test-Path` check for all imported images

**Interfaces:**
- Consumes: supplied source photographs in `C:\Users\HP\Desktop\вид\`.
- Produces: stable image names used by HTML pages.

- [x] **Step 1: Add the focused failing test** — check the 16 target paths before import; all should be absent.
- [x] **Step 2: Verify the relevant failure** — run `Test-Path assets/images/alarm-01.jpeg`; expected `False`.
- [x] **Step 3: Implement the minimum behavior** — copy five alarm, three powerbank, six PET recycler and two FM radio images without altering them.
- [x] **Step 4: Verify the focused pass** — check every target with `Test-Path` and nonzero `Length`; expected all `True`.
- [x] **Step 5: Run the affected integration check** — list `assets/images/*-*.jpeg`; expected 16 new grouped files.
- [x] **Step 6: Commit the passing deliverable** — `git add assets/images` and commit `feat: add media for remaining projects`.

### Task 2: Build pages using the existing template

**Files:**
- Create: `projects/alarm.html`, `projects/powerbank.html`, `projects/pet-recycler.html`, `projects/fm-radio.html`
- Modify: `assets/css/main.css`
- Test: static HTML-content and image-reference checks

**Interfaces:**
- Consumes: Task 1 images and exact facts in the approved specification.
- Produces: four pages that load `../assets/js/i18n.js`, use the shared language flags, and include `.project-tradeoffs` with advantages and limitations.

- [x] **Step 1: Add the focused failing test** — check four target page paths and search for `project-tradeoffs`; expected absent.
- [x] **Step 2: Verify the relevant failure** — run `Test-Path projects/alarm.html`; expected `False`.
- [x] **Step 3: Implement the minimum behavior** — fill the template with confirmed descriptions, capabilities, specifications, gallery and factual plus/minus cards. PET recycler must state its confirmed work-in-progress constraints; no unconfirmed claims are added.
- [x] **Step 4: Verify the focused pass** — assert each page contains `project-tradeoffs`, `../assets/js/i18n.js`, and `../assets/images/`; expected all pass.
- [x] **Step 5: Run the affected integration check** — search all four pages for their image prefixes and confirm the paths exist.
- [x] **Step 6: Commit the passing deliverable** — stage those pages plus CSS and commit `feat: add remaining project pages`.

### Task 3: Add catalogue cards and translation entries

**Files:**
- Modify: `projects.html`
- Modify: `assets/js/i18n.js`
- Test: `node --check` and local link checks

**Interfaces:**
- Consumes: page names and all new Russian strings.
- Produces: four working catalogue links and EN/PT values for each newly visible Russian phrase.

- [x] **Step 1: Add the focused failing test** — search `projects.html` for all four page names; expected no matches.
- [x] **Step 2: Verify the relevant failure** — run `rg -n "alarm.html|powerbank.html|pet-recycler.html|fm-radio.html" projects.html`; expected no output.
- [x] **Step 3: Implement the minimum behavior** — add four image cards and add their exact strings to the local catalogue. Translation keys remain the original Russian text.
- [x] **Step 4: Verify the focused pass** — run `node --check assets/js/i18n.js`; expected exit code 0. Repeat the link search; expected four usable links.
- [x] **Step 5: Run the affected integration check** — extract new local links and image URLs; expected all targets exist and are nonempty.
- [x] **Step 6: Commit the passing deliverable** — stage `projects.html` and `assets/js/i18n.js`, then commit `feat: add remaining projects to catalogue`.

### Task 4: Final verification and publication

**Files:**
- Modify: `docs/specs/2026-09-20-remaining-projects-design.md`
- Modify: `docs/plans/2026-09-20-remaining-projects.md`
- Test: repository-wide static checks

**Interfaces:**
- Consumes: all new media, pages, CSS, catalogue and translations.
- Produces: a verified commit pushed to `origin/main`.

- [x] **Step 1: Add the focused failing test** — run `git diff --check` before final commit.
- [x] **Step 2: Verify the relevant failure** — if whitespace errors appear, correct only reported lines; if none appear, retain files unchanged.
- [x] **Step 3: Implement the minimum behavior** — mark plan tasks complete only after their checks pass.
- [x] **Step 4: Verify the focused pass** — run `node --check assets/js/i18n.js; git diff --check`; expected both clean.
- [x] **Step 5: Run the affected integration check** — verify each new catalogue card resolves to a new page and every referenced project image exists.
- [x] **Step 6: Commit the passing deliverable** — stage docs and remaining intended files, commit `docs: record remaining projects delivery`, then run `git push origin main`.

## Unresolved externally observable decisions

None. The user approved the exact page structure, photo grouping, confirmed facts, local translations, plus/minus section and publication.
