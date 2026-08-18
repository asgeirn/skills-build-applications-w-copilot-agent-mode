# Octofit Tracker Frontend

React 19 presentation tier for the Octofit Tracker multi-tier application.

## Environment

When running in GitHub Codespaces, define `VITE_CODESPACE_NAME` in `.env.local` so the frontend can call the backend on port `8000`:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend builds API endpoints with this pattern:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

If `VITE_CODESPACE_NAME` is unset, the app safely falls back to `http://localhost:8000/api` instead of building an `https://undefined-8000...` URL.

## Scripts

```bash
npm --prefix octofit-tracker/frontend run dev
npm --prefix octofit-tracker/frontend run build
npm --prefix octofit-tracker/frontend run preview
```
