# HBSA Spring 2026 Backend Setup Guide

## Quick Setup (5 minutes)

### Step 1: Create Google Spreadsheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it **"HBSA Spring 2026 Applications"**
4. Copy the **Spreadsheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/[THIS_IS_YOUR_SPREADSHEET_ID]/edit
   ```

### Step 2: Create Google Apps Script
1. Go to [Google Apps Script](https://script.google.com)
2. Click **"New Project"**
3. Name it **"HBSA Spring 2026 Handler"**
4. Delete the default code
5. Open `google-apps-script-template.js` from this project
6. Copy and paste the entire contents into Apps Script
7. Replace `YOUR_SPREADSHEET_ID_HERE` with your actual Spreadsheet ID
8. Click **Save** (Ctrl+S)

### Step 3: Deploy as Web App
1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ → Select **"Web app"**
3. Set these options:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**
5. Click **Authorize access** and grant permissions
6. **Copy the Web app URL** (looks like `https://script.google.com/macros/s/.../exec`)

### Step 4: Update Environment Variable
1. Open `.env.local` in your project root
2. Update the Google Apps Script URL:
   ```bash
   NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```

### Step 5: Test the Setup
1. In Google Apps Script, click **Run** → Select `testSetup`
2. Grant permissions when prompted
3. Check your Google Spreadsheet - a test row should appear
4. If it works, you're done! Delete the test row if you want.

---

## Troubleshooting

### "Script not found" or "Permission denied"
- Make sure you deployed as a Web app with "Anyone" access
- Make sure you're using the correct Web app URL (not the script URL)

### "Invalid form data"
- Check browser console for detailed error messages
- Verify all required fields are being sent

### "Failed to write to spreadsheet"
- Verify the SPREADSHEET_ID is correct
- Make sure you have edit access to the spreadsheet

### Test the API locally
```bash
npm run dev
# Then submit a test application through the form
```

---

## Updating for Future Semesters

When you need to set up for a new semester:

1. **Create a new Google Spreadsheet** (or add a new sheet tab)
2. **Update `google-apps-script-template.js`:**
   - Change `SHEET_NAME` to the new semester (e.g., `HBSA_Fall_2026_Applications`)
   - Update committee questions if they changed
3. **Create a new Apps Script deployment** (or update existing)
4. **Update `.env.local`** with the new URL if it changed

---

## Data Structure

| Column | Description |
|--------|-------------|
| Timestamp | When submitted |
| Submission ID | Unique ID |
| First Name | Applicant first name |
| Last Name | Applicant last name |
| Email | Applicant email |
| Graduating Year | Expected graduation |
| Core Value | Haas core value response |
| First Committee | Primary committee choice |
| Second Committee | Secondary committee choice |
| Why Join HBSA | General question response |
| Resume URL | Link to resume |
| [Committee Questions] | Individual responses per committee |

---

## Spring 2026 Committees

The following committees are recruiting this semester:
- Strategic Initiatives
- Tech
- Transfer Development
- Marketing
- DEI
- Entrepreneurship
- Sustainability
- Corporate Relations
- Integration
- Sponsorships
- Student Affairs
- Public Service
- SOAC (Student Organizations Advisory Council)
