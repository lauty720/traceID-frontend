import './StaticPages.css'

export default function About() {
  return (
    <div className="container static-page fade-in">
      <header className="static-header">
        <h1>Sobre el proyecto</h1>
        <p>
          TraceID es un proyecto educativo relacionado con ciudadanía digital,
          identidad digital, ciberseguridad, inteligencia artificial, privacidad
          y OSINT ético.
        </p>
      </header>

      <section className="glass static-card">
        <h2>Objetivo</h2>
        <p>
          El objetivo de TraceID no es investigar personas, sino enseñar a
          reconocer cómo una imagen puede dejar una huella pública en Internet.
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          En un mundo donde las fotografías circulan, se reutilizan y a veces se
          generan sintéticamente, es importante desarrollar una mirada crítica
          sobre la autenticidad y la trazabilidad pública de las imágenes.
        </p>
      </section>

      <section className="glass static-card">
        <h2>Temas que aborda</h2>
        <ul className="check-list">
          <li><strong>Ciudadanía digital</strong> — comprender los rastros que dejamos en línea.</li>
          <li><strong>Identidad digital</strong> — cómo las imágenes se asocian a perfiles públicos.</li>
          <li><strong>Ciberseguridad</strong> — verificación de autenticidad y detección de manipulación.</li>
          <li><strong>Inteligencia artificial</strong> — límites y capacidades de los detectores de contenido sintético.</li>
          <li><strong>Privacidad</strong> — distinción entre información pública y privada.</li>
          <li><strong>OSINT ético</strong> — uso responsable de fuentes abiertas sin invadir la privacidad.</li>
        </ul>
      </section>

      <section className="glass static-card">
        <h2>Limitaciones</h2>
        <p>
          TraceID es una herramienta de demostración y aprendizaje. Los detectores
          de IA no son infalibles. Las búsquedas inversas dependen de lo que los
          motores de búsqueda hayan indexado. Ningún resultado debe tomarse como
          prueba definitiva de identidad o autenticidad.
        </p>
      </section>
    </div>
  )
}