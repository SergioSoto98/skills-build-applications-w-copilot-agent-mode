// Helper to build API base URL using Vite env (Codespaces) with safe fallback
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

export async function fetchList(endpoint) {
  const base = getApiBase()
  const res = await fetch(`${base}/${endpoint}`)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  const body = await res.json()

  // Normalize paginated and array responses
  if (Array.isArray(body)) return body
  if (body.data && Array.isArray(body.data)) return body.data
  if (body.items && Array.isArray(body.items)) return body.items
  if (body.results && Array.isArray(body.results)) return body.results
  // Fallback to scanning for the first array value
  for (const key of Object.keys(body || {})) {
    if (Array.isArray(body[key])) return body[key]
  }
  // If no array found, wrap the body as single-item array
  return [body]
}
