# Incident Desk

Responsive incident monitoring desk built for the Frontend Engineer Challenge.

## Run

```bash
npm start
```

Open `http://localhost:4173`.

## Test

```bash
npm test
```

## What Is Included

- 22 realistic incident records loaded through a mocked asynchronous function.
- Search, severity/status filters, sorting, and selected incident state in the URL via `?incident=INC-2401`.
- Status updates saved to `localStorage`, so changes remain after refresh.
- Loading, empty, simulated error with retry, and success toast states.
- Responsive layouts checked for 360 px, 768 px, and 1440 px widths.
- Keyboard-accessible controls with visible focus states and semantic HTML.
- Motion details for loading and save feedback that respect `prefers-reduced-motion`.

## Tested Browsers

- Microsoft Edge on Windows
- Chromium-compatible browser expected

## Manual Accessibility Checks

- Tabbed through search, filters, list items, retry action, and status update controls.
- Verified visible focus on interactive controls.
- Checked text/background contrast choices against WCAG AA targets for normal text.
- Confirmed the interface remains usable at 360 px width without horizontal scrolling.
- Confirmed animations are disabled through the `prefers-reduced-motion` media query.

## Time Spent

About 3 hours.

## Known Gaps

- Backend integration is mocked only, per the challenge allowance.
- Automated coverage focuses on state and persistence logic rather than browser rendering because the project intentionally avoids external dependencies.

## Next Improvement

Add an end-to-end browser test for the full filter, select, update, refresh flow.

## GitHub Submission Steps

Run these from `C:\Users\gabri\Desktop\Frontend_Engineer_Challenge_Work`:

```bash
git init
git add .
git commit -m "Build responsive incident desk"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/incident-desk.git
git push -u origin main
```

Then create the repository on GitHub first if it does not already exist, replacing `YOUR_USERNAME` with your GitHub username.
