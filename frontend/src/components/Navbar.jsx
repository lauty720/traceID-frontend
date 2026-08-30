import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Fingerprint } from 'lucide-react'
import { getStoredUser, clearSession, fetchMe } from '../services/auth'
import './Navbar.css'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState(getStoredUser())
  const navigate = useNavigate()

  useEffect(() => {
    fetchMe().then((u) => {
      if (u) setUser(u)
    }).catch(() => {})
  }, [])

  const logout = () => {
    clearSession()
    setUser(null)
    navigate('/login')
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="logo" onClick={() => setOpen(false)}>
          <Fingerprint size={28} strokeWidth={1.8} />
          <span>TraceID</span>
        </Link>

        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Menú">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          <NavLink to="/" end onClick={() => setOpen(false)}>Inicio</NavLink>
          <NavLink to="/como-funciona" onClick={() => setOpen(false)}>Cómo funciona</NavLink>
          <NavLink to="/etica" onClick={() => setOpen(false)}>Ética</NavLink>
          <NavLink to="/sobre" onClick={() => setOpen(false)}>Sobre el proyecto</NavLink>
          {user?.is_admin && (
            <NavLink to="/admin" onClick={() => setOpen(false)}>Admin</NavLink>
          )}
          {user ? (
            <>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                {user.is_admin ? '∞' : `${user.used_today ?? 0}/${user.daily_limit ?? 6}`} hoy
              </span>
              <button type="button" className="btn btn-ghost" onClick={logout}>
                Salir
              </button>
            </>
          ) : (
            <NavLink to="/login" onClick={() => setOpen(false)}>Entrar</NavLink>
          )}
        </nav>
      </div>
    </header>
  )
}
