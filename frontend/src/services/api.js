const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

/**
 * Analyze an image.
 * @param {File|null} file
 * @param {boolean} demo
 */
export async function analyzeImage(file, demo = false) {
  const form = new FormData()
  if (file) {
    form.append('file', file)
  }

  const url = `${API_BASE}/api/analyze?demo=${demo ? 'true' : 'false'}`

  const res = await fetch(url, {
    method: 'POST',
    body: form,
  })

  if (!res.ok) {
    let detail = 'Error al analizar la imagen.'
    try {
      const data = await res.json()
      detail = data.detail || detail
    } catch {
      // ignore
    }
    throw new Error(typeof detail === 'string' ? detail : 'Error al analizar la imagen.')
  }

  return res.json()
}

export async function checkHealth() {
  const res = await fetch(`${API_BASE}/api/health`)
  if (!res.ok) throw new Error('Backend no disponible')
  return res.json()
}
