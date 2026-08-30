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
    fetchMe()
      .then((u) => {
        if (u) setUser(u)
      })
      .catch(() => {})
  }, [])

  const logout = () => {
    clearSession()
    setUser(null)
    setOpen(false)
    navigate('/login')
  }

  const close = () => setOpen(false)

  return (
    <header className="navbar">
      <div className="container">
        <Link to="/" className="logo" onClick={close}>
          <Fingerprint size={22} strokeWidth={2} />
          <span>TraceID</span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-label="Menú"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          <NavLink to="/" end onClick={close}>
            Inicio
          </NavLink>
          <NavLink to="/como-funciona" onClick={close}>
            Cómo funciona
          </NavLink>
          <NavLink to="/etica" onClick={close}>
            Ética
          </NavLink>
          <NavLink to="/sobre" onClick={close}>
            Sobre
          </NavLink>
          {user?.is_admin && (
            <NavLink to="/admin" onClick={close}>
              Admin
            </NavLink>
          )}
          {user ? (
            <>
              <span className="nav-quota">
                {user.is_admin ? 'Admin' : `${user.used_today ?? 0}/${user.daily_limit ?? 6} hoy`}
              </span>
              <button type="button" className="btn btn-ghost" onClick={logout}>
                Salir
              </button>
            </>
          ) : (
            <NavLink to="/login" className="nav-login" onClick={close}>
              Entrar
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  )
}
