import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login, register } from '../services/auth'
import './StaticPages.css'

export default function Login() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('login') // login | register
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'login') {
        await login({ email, password })
      } else {
        await register({ email, password, name })
      }
      navigate('/')
    } catch (err) {
      setError(err.message || 'Error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container static-page fade-in">
      <header className="static-header">
        <h1>{mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}</h1>
        <p>
          Cada cuenta tiene <strong>6 análisis por día</strong>.
          Así repartimos el cupo de búsquedas de la herramienta.
        </p>
      </header>

      <section className="glass static-card" style={{ maxWidth: 420, margin: '0 auto' }}>
        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          {mode === 'register' && (
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Nombre (opcional)
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
                placeholder="Tu nombre"
              />
            </label>
          )}
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              placeholder="tu@email.com"
            />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Contraseña {mode === 'register' ? '(mín. 6 caracteres)' : ''}
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              placeholder="••••••••"
            />
          </label>

          {error && (
            <p style={{ color: 'var(--danger)', fontSize: '0.9rem', margin: 0 }}>{error}</p>
          )}

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Esperá…' : mode === 'login' ? 'Entrar' : 'Registrarme'}
          </button>
        </form>

        <p style={{ marginTop: '1.25rem', fontSize: '0.88rem', color: 'var(--text-muted)', textAlign: 'center' }}>
          {mode === 'login' ? (
            <>
              ¿No tenés cuenta?{' '}
              <button type="button" className="btn btn-ghost" onClick={() => setMode('register')}>
                Registrate
              </button>
            </>
          ) : (
            <>
              ¿Ya tenés cuenta?{' '}
              <button type="button" className="btn btn-ghost" onClick={() => setMode('login')}>
                Iniciá sesión
              </button>
            </>
          )}
        </p>
      </section>

      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        <Link to="/">← Volver al inicio</Link>
      </p>
    </div>
  )
}

const inputStyle = {
  padding: '0.7rem 0.85rem',
  borderRadius: 10,
  border: '1px solid rgba(148,163,184,0.25)',
  background: 'rgba(15,23,42,0.7)',
  color: '#f1f5f9',
  fontSize: '1rem',
}
