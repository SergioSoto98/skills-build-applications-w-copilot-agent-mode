Frontend (Vite + React 19)

Environment
- This frontend expects a Codespaces environment variable named `VITE_CODESPACE_NAME` when running inside GitHub Codespaces so it can build the API base URL used by the app.

Create a local override file `.env.local` at the project root (`octofit-tracker/frontend/.env.local`) with this content when developing in Codespaces:

VITE_CODESPACE_NAME=your-codespace-name

How the app builds the API URL
- If `VITE_CODESPACE_NAME` is provided, the app will use:
  `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/...`
- If it's not provided, the app falls back to the current host with port 8000 (`http(s)://<host>:8000/api`) or `http://localhost:8000/api` as a last resort.

Notes
- Do not commit `.env.local` to git; keep it local.
- We use `import.meta.env.VITE_CODESPACE_NAME` (Vite) to read the variable.
