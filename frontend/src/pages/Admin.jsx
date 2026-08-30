import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getStoredUser, fetchMe } from '../services/auth'
import {
  listUsers,
  banUser,
  unbanUser,
  deleteUser,
  resetUsage,
  setPassword,
} from '../services/admin'
import './StaticPages.css'

export default function Admin() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setError('')
    setLoading(true)
    try {
      const me = await fetchMe()
      if (!me || !me.is_admin) {
        navigate('/login')
        return
      }
      const data = await listUsers()
      setUsers(data)
    } catch (e) {
      setError(e.message || 'No se pudo cargar el panel')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const u = getStoredUser()
    if (!u) {
      navigate('/login')
      return
    }
    load()
  }, [])

  const run = async (fn, okText) => {
    setMsg('')
    setError('')
    try {
      const r = await fn()
      setMsg(r.detail || okText || 'Listo')
      await load()
    } catch (e) {
      setError(e.message)
    }
  }

  const onSetPassword = async (id, email) => {
    const password = window.prompt(`Nueva contraseña para ${email} (mín. 6 caracteres):`)
    if (!password) return
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }
    await run(() => setPassword(id, password), 'Contraseña actualizada')
  }

  return (
    <div className="container static-page fade-in">
      <header className="static-header">
        <h1>Panel de administración</h1>
        <p>Usuarios registrados, baneos, uso diario y contraseñas.</p>
      </header>

      {error && (
        <p style={{ color: 'var(--danger)', textAlign: 'center' }}>{error}</p>
      )}
      {msg && (
        <p style={{ color: 'var(--accent)', textAlign: 'center' }}>{msg}</p>
      )}

      <section className="glass static-card" style={{ overflowX: 'auto' }}>
        {loading ? (
          <p style={{ color: 'var(--text-muted)' }}>Cargando…</p>
        ) : users.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No hay usuarios.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--text-muted)' }}>
                <th style={th}>ID</th>
                <th style={th}>Email</th>
                <th style={th}>Nombre</th>
                <th style={th}>Hoy</th>
                <th style={th}>Estado</th>
                <th style={th}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} style={{ borderTop: '1px solid rgba(148,163,184,0.15)' }}>
                  <td style={td}>{u.id}</td>
                  <td style={td}>
                    {u.email}
                    {u.is_admin ? ' · admin' : ''}
                  </td>
                  <td style={td}>{u.name || '—'}</td>
                  <td style={td}>
                    {u.used_today}/{u.daily_limit}
                  </td>
                  <td style={td}>
                    {u.is_banned ? (
                      <span style={{ color: 'var(--danger)' }}>Baneado</span>
                    ) : (
                      <span style={{ color: 'var(--accent)' }}>Activo</span>
                    )}
                  </td>
                  <td style={{ ...td, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {u.is_banned ? (
                      <button type="button" className="btn btn-ghost" onClick={() => run(() => unbanUser(u.id))}>
                        Desbanear
                      </button>
                    ) : (
                      !u.is_admin && (
                        <button type="button" className="btn btn-ghost" onClick={() => run(() => banUser(u.id))}>
                          Banear
                        </button>
                      )
                    )}
                    <button type="button" className="btn btn-ghost" onClick={() => run(() => resetUsage(u.id))}>
                      Reset uso
                    </button>
                    <button type="button" className="btn btn-ghost" onClick={() => onSetPassword(u.id, u.email)}>
                      Clave
                    </button>
                    {!u.is_admin && (
                      <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={() => {
                          if (window.confirm(`¿Eliminar a ${u.email}?`)) {
                            run(() => deleteUser(u.id))
                          }
                        }}
                      >
                        Eliminar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        <Link to="/">← Volver al inicio</Link>
      </p>
    </div>
  )
}

const th = { padding: '0.5rem 0.4rem', fontWeight: 500 }
const td = { padding: '0.65rem 0.4rem', verticalAlign: 'middle' }
