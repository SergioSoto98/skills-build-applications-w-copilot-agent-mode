// Helper to build API base URL using Vite env (Codespaces) with safe fallback.
//
// Expected behavior:
// - When `VITE_CODESPACE_NAME` is defined (e.g. in octofit-tracker/frontend/.env.local),
//   the API base becomes: `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api`.
// - If `VITE_CODESPACE_NAME` is not defined we avoid constructing URLs like
//   `https://undefined-8000.app.github.dev` by using a local fallback that prefers
//   the current host and port 8000 (e.g. `http(s)://<host>:8000/api`) and finally
//   `http://localhost:8000/api` as a last resort.
export function getApiBase() {
  const codespace = import.meta.env.VITE_CODESPACE_NAME
  if (codespace) {
    return `https://${codespace}-8000.app.github.dev/api`
  }

  // Safe fallback: prefer same-host backend on port 8000 when running locally,
  // otherwise default to localhost.
  if (typeof window !== 'undefined' && window.location) {
    const host = window.location.hostname || 'localhost'
    const protocol = window.location.protocol || 'http:'
    return `${protocol}//${host}:8000/api`
  }

  return 'http://localhost:8000/api'
}

// Fetch a list with optional query params (page, limit, filters)
// Returns a normalized object: { items: Array, meta: { page, totalPages, total, perPage } }
export async function fetchList(endpoint, params = {}) {
  const base = getApiBase()
  const url = new URL(`${base}/${endpoint}`)
  Object.entries(params || {}).forEach(([k, v]) => {
    if (v != null) url.searchParams.set(k, String(v))
  })

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  const body = await res.json()

  // Normalize items
  let items = null
  if (Array.isArray(body)) items = body
  else if (body.data && Array.isArray(body.data)) items = body.data
  else if (body.items && Array.isArray(body.items)) items = body.items
  else if (body.results && Array.isArray(body.results)) items = body.results
  else {
    for (const key of Object.keys(body || {})) {
      if (Array.isArray(body[key])) {
        items = body[key]
        break
      }
    }
  }
  if (!items) items = [body]

  // Extract pagination meta if present
  const meta = {}
  if (body.page != null) meta.page = Number(body.page)
  if (body.totalPages != null) meta.totalPages = Number(body.totalPages)
  if (body.total != null) meta.total = Number(body.total)
  if (body.limit != null) meta.limit = Number(body.limit)
  if (body.perPage != null) meta.perPage = Number(body.perPage)
  if (body.meta && typeof body.meta === 'object') Object.assign(meta, body.meta)

  return { items, meta }
}
