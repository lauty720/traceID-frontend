import { getToken } from './auth'

const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

async function wakeBackend() {
  try {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 45000)
    await fetch(`${API_BASE}/api/health`, { signal: ctrl.signal })
    clearTimeout(t)
  } catch {
    // ignore
  }
}

export async function analyzeImage(file, demo = false) {
  if (!demo) {
    await wakeBackend()
  }

  const form = new FormData()
  if (file) {
    form.append('file', file)
  }

  const url = `${API_BASE}/api/analyze?demo=${demo ? 'true' : 'false'}`
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), 90000)

  const headers = {}
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`

  try {
    const res = await fetch(url, {
      method: 'POST',
      body: form,
      signal: ctrl.signal,
      headers,
    })

    if (!res.ok) {
      let detail = 'Error al analizar la imagen.'
      try {
        const data = await res.json()
        detail = data.detail || detail
      } catch {}
      throw new Error(typeof detail === 'string' ? detail : 'Error al analizar la imagen.')
    }

    return res.json()
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error(
        'El análisis tardó demasiado. Probá con una imagen más liviana o reintentá en unos segundos.'
      )
    }
    if (err.message === 'Failed to fetch' || err.name === 'TypeError') {
      throw new Error(
        'No se pudo conectar con el servidor. Volvé al menú principal, reninicia la pagina y reintentá.'
      )
    }
    throw err
  } finally {
    clearTimeout(timer)
  }
}

export async function checkHealth() {
  const res = await fetch(`${API_BASE}/api/health`)
  if (!res.ok) throw new Error('Backend no disponible')
  return res.json()
}
