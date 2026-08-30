import { Check, X } from 'lucide-react'
import './StaticPages.css'

export default function Ethics() {
  return (
    <div className="container static-page fade-in">
      <header className="static-header">
        <h1>Ética y privacidad</h1>
        <p>
          TraceID fue diseñado como una herramienta que aumente tu seguridad digital
          en tiempos donde es complejo saber si un perfil es real o no
        </p>
      </header>

      <div className="ethics-grid">
        <section className="glass static-card">
          <h2 className="do-title">
            <Check size={20} /> Qué hacemos
          </h2>
          <ul className="check-list">
            <li>Analizamos imágenes proporcionadas por el usuario.</li>
            <li>Buscamos coincidencias públicamente disponibles en Internet.</li>
            <li>Mostramos fuentes públicas (dominios, títulos, URLs).</li>
            <li>Utilizamos IA para organizar y explicar resultados de forma neutral.</li>
            <li>Expresamos conclusiones con lenguaje probabilístico.</li>
            <li>Eliminamos las imágenes temporales después del análisis.</li>
          </ul>
        </section>

        <section className="glass static-card">
          <h2 className="dont-title">
            <X size={20} /> Qué NO hacemos
          </h2>
          <ul className="check-list dont">
            <li>No accedemos a cuentas privadas.</li>
            <li>No obtenemos contraseñas ni credenciales.</li>
            <li>No utilizamos bases de datos filtradas.</li>
            <li>No intentamos averiguar información privada.</li>
            <li>No confirmamos identidades mediante reconocimiento facial.</li>
            <li>No garantizamos que dos perfiles pertenezcan a la misma persona.</li>
            <li>No realizamos scraping ilegal ni métodos de hacking.</li>
          </ul>
        </section>
      </div>

      <section className="glass static-card">
        <h2>Principios</h2>
        <p>
          Toda conclusión de TraceID utiliza lenguaje probabilístico:
          «posible coincidencia», «aparentemente», «no se puede confirmar».
          Los resultados son estimaciones orientativas y no constituyen una
          identificación definitiva.
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          Si encontrás perfiles públicos, se muestran únicamente como coincidencias
          halladas en fuentes abiertas. Nunca afirmamos con certeza que dos perfiles
          pertenezcan a la misma persona.
        </p>
      </section>
    </div>
  )
}
