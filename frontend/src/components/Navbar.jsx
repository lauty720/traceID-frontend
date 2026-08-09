import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Fingerprint } from 'lucide-react'
import './Navbar.css'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="logo" onClick={() => setOpen(false)}>
          <Fingerprint size={28} strokeWidth={1.8} />
          <span>TraceID</span>
        </Link>

        <button
          className="nav-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          <NavLink to="/" end onClick={() => setOpen(false)}>Inicio</NavLink>
          <NavLink to="/como-funciona" onClick={() => setOpen(false)}>Cómo funciona</NavLink>
          <NavLink to="/etica" onClick={() => setOpen(false)}>Ética</NavLink>
          <NavLink to="/sobre" onClick={() => setOpen(false)}>Sobre el proyecto</NavLink>
        </nav>
      </div>
    </header>
  )
}