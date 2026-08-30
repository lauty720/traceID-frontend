import './StaticPages.css'

export default function About() {
  return (
    <div className="container static-page fade-in">
      <header className="static-header">
        <h1>Sobre el proyecto</h1>
        <p>
          TraceID es una herramienta web de verificación de imágenes: analiza
          señales compatibles con contenido generado por IA, busca coincidencias
          públicas en Internet y organiza la huella digital visible de una foto.
        </p>
      </header>

      <section className="glass static-card">
        <h2>Qué es</h2>
        <p>
          El proyecto nació en un contexto educativo y hoy se mantiene como
          iniciativa independiente. No está pensado para espiar personas ni para
          armar perfiles privados: trabaja solo con lo que ya es accesible en
          fuentes públicas y deja claro que los resultados son orientativos.
        </p>
        <p style={{ marginTop: '0.85rem' }}>
          Sirve para quien quiera comprobar si una imagen parece sintética, si
          circula en la web o qué rastros públicos deja, con un lenguaje de
          probabilidad en lugar de certezas absolutas.
        </p>
      </section>

      <section className="glass static-card">
        <h2>Enfoque</h2>
        <ul className="check-list">
          <li>
            <strong>Autenticidad</strong> — estimación de señales asociadas a
            generación o manipulación por IA.
          </li>
          <li>
            <strong>Búsqueda inversa</strong> — coincidencias indexadas en
            Internet a partir de la propia imagen.
          </li>
          <li>
            <strong>Huella pública</strong> — dominios, páginas y posibles
            perfiles solo cuando aparecen en resultados públicos.
          </li>
          <li>
            <strong>Privacidad por diseño</strong> — sin reconocimiento facial
            automático, sin acceso a cuentas privadas y sin afirmar identidades
            con certeza.
          </li>
        </ul>
      </section>

      <section className="glass static-card">
        <h2>Límites</h2>
        <p>
          Los detectores de IA pueden fallar. La búsqueda inversa depende de lo que los
          motores hayan indexado. Una coincidencia visual no prueba que dos
          perfiles sean la misma persona. TraceID no reemplaza pericias formales
          ni investigaciones oficiales: es una ayuda para mirar con más cuidado
          lo que ya está a la vista en la red.
        </p>
      </section>
    </div>
  )
}
