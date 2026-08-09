import './StaticPages.css'

export default function Privacy() {
  return (
    <div className="container static-page fade-in">
      <header className="static-header">
        <h1>Política de privacidad</h1>
        <p>Última actualización: agosto 2026</p>
      </header>

      <section className="glass static-card">
        <h2>Datos que procesamos</h2>
        <p>
          Cuando subís una imagen, esta se envía al servidor de TraceID para ser
          analizada. La imagen se almacena de forma temporal únicamente durante el
          proceso de análisis y se elimina automáticamente después.
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          No almacenamos imágenes de forma permanente por defecto.
          No recopilamos información personal identificable del usuario más allá
          de lo estrictamente necesario para el funcionamiento del servicio
          (por ejemplo, dirección IP para limitación de tasa).
        </p>
      </section>

      <section className="glass static-card">
        <h2>Qué no hacemos con tus datos</h2>
        <ul className="check-list dont">
          <li>No vendemos ni compartimos imágenes con terceros con fines comerciales.</li>
          <li>No utilizamos las imágenes para entrenar modelos propios sin consentimiento.</li>
          <li>No accedemos a cuentas privadas ni a información no pública.</li>
          <li>No realizamos reconocimiento facial orientado a identificar personas.</li>
        </ul>
      </section>

      <section className="glass static-card">
        <h2>APIs externas</h2>
        <p>
          Cuando están configuradas, TraceID puede enviar la imagen (o representaciones
          derivadas) a servicios de terceros para detección de contenido generado por IA
          y búsqueda inversa. Esos servicios tienen sus propias políticas de privacidad.
          En modo demostración no se envía ninguna imagen a servicios externos.
        </p>
      </section>

      <section className="glass static-card">
        <h2>Contacto</h2>
        <p>
          Este es un proyecto educativo. Si tenés consultas sobre el tratamiento de datos,
          podés revisar el código fuente y la documentación del repositorio.
        </p>
      </section>
    </div>
  )
}