import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Fingerprint } from 'lucide-react'
import { getStoredUser, clearSession, fetchMe } from '../services/auth'
import './Navbar.css'

export default function Navbar() {
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
    navigate('/login')
  }

  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-inner">
          <Link to="/" className="logo">
            <Fingerprint size={26} strokeWidth={1.8} />
            <span>TraceID</span>
          </Link>

          <nav className="nav-links">
            <NavLink to="/" end>
              Inicio
            </NavLink>
            <NavLink to="/como-funciona">Cómo funciona</NavLink>
            <NavLink to="/etica">Ética</NavLink>
            <NavLink to="/sobre">Sobre</NavLink>
            {user?.is_admin && <NavLink to="/admin">Admin</NavLink>}
            {user ? (
              <>
                <span className="nav-quota">
                  {user.is_admin ? '∞' : `${user.used_today ?? 0}/${user.daily_limit ?? 6}`}
                </span>
                <button type="button" className="btn btn-ghost" onClick={logout}>
                  Salir
                </button>
              </>
            ) : (
              <NavLink to="/login" className="nav-login">
                Entrar
              </NavLink>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
