Frontend (Vite + React 19)

Environment
- This frontend expects a Codespaces environment variable named `VITE_CODESPACE_NAME` when running inside GitHub Codespaces so it can build the API base URL used by the app.

Create a local override file `.env.local` at the frontend folder (`octofit-tracker/frontend/.env.local`) when developing in Codespaces. This file must define `VITE_CODESPACE_NAME` so the app can construct the API URL used by the frontend.

Example `octofit-tracker/frontend/.env.local`:

VITE_CODESPACE_NAME=your-codespace-name

Replace `your-codespace-name` with the actual Codespace value (you can find it in the Codespaces UI). Do NOT commit `.env.local` to git.

How the app builds the API URL
- If `VITE_CODESPACE_NAME` is provided, the app will use:
  `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/...`
- If it's not provided, the app falls back to the current host with port 8000 (`http(s)://<host>:8000/api`) or `http://localhost:8000/api` as a last resort.

Notes
- Do not commit `.env.local` to git; keep it local.
- We use `import.meta.env.VITE_CODESPACE_NAME` (Vite) to read the variable.
