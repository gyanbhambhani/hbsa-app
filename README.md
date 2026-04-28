# HBSA Application Portal

Next.js application for **Haas Business Student Association (HBSA)** associate recruiting. Applicants complete a multi-step form; submissions are stored in **Google Sheets** via **Google Apps Script**.

This README is written for the **Director of Technology** (or whoever owns the stack) to run, deploy, and update the portal each cycle.

---

## Stack

| Layer | Technology |
|--------|------------|
| Framework | [Next.js](https://nextjs.org/) 15 (App Router) |
| UI | React 19, Tailwind CSS 4, Framer Motion, Heroicons |
| Client state | [Zustand](https://zustand-demo.pmnd.rs/) (`src/store/formStore.ts`) |
| Submissions | `POST /api/submit` → Google Apps Script → Google Sheet |

---

## Local development

**Requirements:** Node.js 20+ (LTS recommended), npm.

```bash
npm install
cp .env.example .env.local   # then fill in values (see below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | Purpose |
|--------|---------|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Run production build locally |
| `npm run lint` | ESLint |

---

## Environment variables

Create **`.env.local`** in the project root (never commit real secrets).

| Variable | Required | Where it’s used |
|----------|----------|------------------|
| `NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL` | **Yes** (for live submissions) | `src/lib/googleSheets.ts` — web app URL from Apps Script deployment |

> **`NEXT_PUBLIC_*`** is exposed to the browser bundle. The script URL is not a secret in the same way as an API key, but treat your Google project access carefully.

See **`.env.example`** for a template.

---

## Backend: Google Sheets + Apps Script

Submissions do **not** hit a traditional database. Flow:

1. Browser sends JSON to **`POST /api/submit`** (`src/app/api/submit/route.ts`).
2. Server validates the payload and calls **`submitToGoogleSheets()`** in `src/lib/googleSheets.ts`.
3. That function `POST`s JSON to your **Google Apps Script** web app URL.
4. Apps Script validates again and **appends a row** to the configured spreadsheet.

### First-time setup (checklist)

Detailed steps live in **[`BACKEND_SETUP.md`](./BACKEND_SETUP.md)**. Summary:

1. Create a **Google Spreadsheet** for applications.
2. Create a **Google Apps Script** project, paste code from **`google-apps-script-template.js`**, set `SPREADSHEET_ID` and `SHEET_NAME`.
3. **Deploy** → **Web app** → Execute as **Me**, access **Anyone**.
4. Put the **Web app URL** (ends in `/exec`) in `.env.local` as `NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL`.
5. Run the script’s **`testSetup`** once (see template comments) and confirm a test row appears.

### Payload shape (must stay aligned)

The API sends nested JSON (see `formatFormDataForSheets` in `src/lib/googleSheets.ts`):

- `basicInfo` — `firstName`, `lastName`, `email`, `graduatingYear`, `coreValue`
- `selectedCommittees` — array of committee **IDs** (strings)
- `committeeResponses` — `{ [committeeId]: { [questionId]: string } }`
- `generalResponses` — `{ whyJoinHBSA: string }`
- `resumeUrl` — HTTPS link (e.g. Google Doc)

Apps Script **`validateFormData`** and **`writeToSheet`** / **`headerToIds`** in `google-apps-script-template.js` must accept the same structure and committee/question IDs.

---

## Updating questions & committees for a new cycle

You usually touch **three places** so the UI, validation, and sheet columns stay in sync.

### 1. Frontend: `src/data/committees.ts`

- Each **committee** has `id`, `label`, `description`, and `questions[]`.
- Each **question** has `id`, `label`, `required`, optional `wordLimit`, and `type` (`text` | `textarea` | `url` | `select` | `multiselect`).

The form renders from this file (`src/app/form/committees`, `src/app/form/questions/[committee]`).

### 2. Client state (if you add general questions)

- **`src/store/formStore.ts`** — extend `GeneralResponses` and `initialState` if you add fields beyond `whyJoinHBSA`.
- **`src/app/form/general/page.tsx`** — add inputs and validation.
- **`src/lib/googleSheets.ts`** — extend `FormSubmission` and validation in `validateFormSubmission` / `formatFormDataForSheets`.

### 3. Google Apps Script: `google-apps-script-template.js`

- **`getCommitteeQuestionHeaders()`** and **`headerToIds`** (and any related maps) must match **committee IDs** and **question IDs** from `committees.ts`.
- **`setupSheetHeaders`** defines spreadsheet columns; new questions → new columns.
- Update **`SHEET_NAME`** (and optionally a new spreadsheet) per semester so you don’t mix cohorts.

### Copy & branding in the UI

Search the repo for semester strings (e.g. **“Spring 2026”**) in:

- `src/app/page.tsx`
- `src/app/form/**/page.tsx`
- `src/components/FormWrapper.tsx` (if used)

Update deadlines and messaging on the home page CTA.

### Closing / reopening applications

**`src/lib/config.ts`**

```ts
export const APPLICATION_CLOSED = true  // false when applications open
```

When `true`:

- Home page shows “applications closed.”
- `/form/basic-info` and `/form/submit` show a closed message (no new starts / no submits).
- **`POST /api/submit`** returns **410** and does not call Google.

Set to `false` when you’re ready to accept applications again.

---

## Deployment (e.g. Vercel)

Typical setup for Next.js:

1. **Repository** — Push this repo to GitHub (or GitLab) under the org/account HBSA controls.
2. **Vercel** — Import project, framework **Next.js**, root directory default, build `npm run build`, output default.
3. **Environment variables** — In Vercel project settings → Environment Variables, add **`NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL`** for *Production* (and *Preview* if you want staging to submit to a test sheet).
4. **Redeploy** after changing env vars.

**Google Apps Script:** deployment URL must stay valid; if you create a **new deployment**, the URL can change — update Vercel + `.env.local` to match.

**Custom domain** (optional): Configure in Vercel → Domains; add DNS records as instructed.

---

## Operating & managing the portal

| Task | What to do |
|------|------------|
| **Monitor submissions** | Open the Google Sheet; filter/sort as needed. |
| **Export / share with committees** | Use Sheets sharing + export to CSV, or duplicate tab per round. |
| **Debug failed submits** | Vercel (or local) **function logs** for `/api/submit`; Apps Script **Executions** log in script.google.com. |
| **Timeouts** | Apps Script can be slow; `googleSheets.ts` uses `AbortController` with a configurable timeout. Rows may still append after a client timeout — verify in the Sheet before assuming failure. |
| **Security** | Keep spreadsheet access limited to board/tech; Apps Script runs as the deployer — use a dedicated HBSA Google account if possible. |
| **Dependencies** | Run `npm audit` periodically; bump Next/React after testing (`npm run build`). |

---

## Project map

```
src/app/
  page.tsx                 # Landing / start application (respects APPLICATION_CLOSED)
  form/
    basic-info/            # Step 1
    general/               # Step 2 (general questions)
    committees/            # Step 3 (committee selection)
    questions/[committee]/ # Dynamic per-committee questions
    submit/                # Review + resume link + submit
  api/submit/route.ts      # Server handler → Google Sheets
src/data/committees.ts     # Committees + questions (primary content config)
src/store/formStore.ts     # Applicant progress in browser (lost if they clear site data)
src/lib/
  googleSheets.ts          # Submit + validation + formatting
  config.ts                # APPLICATION_CLOSED flag
google-apps-script-template.js  # Copy into Google Apps Script project
BACKEND_SETUP.md           # Detailed Google setup walkthrough
```

---

## Handoff checklist for the next tech lead

- [ ] Access to **GitHub** (or host) repo and **Vercel** (or host) project  
- [ ] **Google account** that owns the Sheet + Apps Script deployment  
- [ ] `.env.local` / Vercel: **`NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL`** documented  
- [ ] Read **`BACKEND_SETUP.md`** and run a **test submission** after any backend change  
- [ ] Know how to flip **`APPLICATION_CLOSED`** in `src/lib/config.ts`  
- [ ] For each new cycle: update **`committees.ts`**, Apps Script **headers/maps**, UI copy, and Sheet name / spreadsheet as needed  

---

## License / usage

Private repository for HBSA. Adjust this section if the org adds a formal license.
