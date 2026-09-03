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
