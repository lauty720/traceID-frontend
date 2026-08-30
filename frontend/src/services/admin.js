import { getToken } from './auth'

const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

async function adminFetch(path, options = {}) {
  const token = getToken()
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      ...(options.body && !(options.body instanceof FormData)
        ? { 'Content-Type': 'application/json' }
        : {}),
    },
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(typeof data.detail === 'string' ? data.detail : 'Error de administración')
  }
  return data
}

export function listUsers() {
  return adminFetch('/api/admin/users')
}

export function banUser(id) {
  return adminFetch(`/api/admin/users/${id}/ban`, { method: 'POST' })
}

export function unbanUser(id) {
  return adminFetch(`/api/admin/users/${id}/unban`, { method: 'POST' })
}

export function deleteUser(id) {
  return adminFetch(`/api/admin/users/${id}`, { method: 'DELETE' })
}

export function resetUsage(id) {
  return adminFetch(`/api/admin/users/${id}/reset-usage`, { method: 'POST' })
}

export function setPassword(id, password) {
  return adminFetch(`/api/admin/users/${id}/set-password`, {
    method: 'POST',
    body: JSON.stringify({ password }),
  })
}
