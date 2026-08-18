const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const isCodespacesApiConfigured = Boolean(codespaceName)
export const apiBaseUrl = isCodespacesApiConfigured
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

function normalizeItems(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  if (Array.isArray(payload?.items)) {
    return payload.items
  }

  if (Array.isArray(payload?.docs)) {
    return payload.docs
  }

  if (Array.isArray(payload?.data?.results)) {
    return payload.data.results
  }

  if (Array.isArray(payload?.data?.items)) {
    return payload.data.items
  }

  return []
}

export async function fetchCollection(resource) {
  const response = await fetch(`${apiBaseUrl}/${resource}/`)

  if (!response.ok) {
    throw new Error(`Request failed for ${resource}: ${response.status}`)
  }

  const payload = await response.json()

  return normalizeItems(payload)
}