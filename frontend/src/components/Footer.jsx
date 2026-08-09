import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <strong>TraceID</strong>
          <p>Herramienta educativa de ciberseguridad y huella digital.</p>
        </div>
        <div className="footer-links">
          <Link to="/privacidad">Política de privacidad</Link>
          <Link to="/etica">Ética</Link>
          <Link to="/como-funciona">Cómo funciona</Link>
          <Link to="/sobre">Sobre el proyecto</Link>
        </div>
        <p className="footer-note">
          Los resultados son orientativos y no constituyen identificación definitiva.
          Solo se utiliza información públicamente accesible.
        </p>
      </div>
    </footer>
  )
}