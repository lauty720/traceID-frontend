import { Upload, Shield, Search, Fingerprint } from 'lucide-react'
import './StaticPages.css'

const STEPS = [
  {
    num: '01',
    icon: Upload,
    title: 'Subís una imagen',
    desc: 'Seleccionás o arrastrás una fotografía (JPG, PNG o WEBP). La imagen se procesa de forma temporal y se elimina después del análisis.',
  },
  {
    num: '02',
    icon: Shield,
    title: 'Analizamos señales de contenido generado por IA',
    desc: 'Un detector especializado busca patrones visuales compatibles con imágenes generadas o manipuladas mediante inteligencia artificial. El resultado se expresa como probabilidad y nivel de confianza, nunca como afirmación absoluta.',
  },
  {
    num: '03',
    icon: Search,
    title: 'Buscamos dónde aparece públicamente',
    desc: 'Realizamos una búsqueda inversa de la imagen en Internet y recopilamos únicamente coincidencias públicamente indexadas: dominios, títulos, fechas y tipos de sitio.',
  },
  {
    num: '04',
    icon: Fingerprint,
    title: 'Organizamos las evidencias encontradas',
    desc: 'A partir de las fuentes públicas, extraemos posibles perfiles y plataformas relacionadas. Generamos un resumen neutral y señales de atención respaldadas por los datos.',
  },
]

export default function HowItWorks() {
  return (
    <div className="container static-page fade-in">
      <header className="static-header">
        <h1>Cómo funciona TraceID</h1>
        <p>
          TraceID no identifica personas mediante reconocimiento facial.
          Analiza la presencia pública de una imagen y las fuentes relacionadas
          que pueden encontrarse en Internet.
        </p>
      </header>

      <div className="steps">
        {STEPS.map((s) => {
          const Icon = s.icon
          return (
            <div key={s.num} className="step glass">
              <div className="step-num">{s.num}</div>
              <div className="step-icon"><Icon size={24} /></div>
              <h2>{s.title}</h2>
              <p>{s.desc}</p>
            </div>
          )
        })}
      </div>

      <section className="glass static-card">
        <h2>Qué debés tener en cuenta</h2>
        <ul className="check-list">
          <li>Los resultados son orientativos y pueden contener errores (falsos positivos o negativos).</li>
          <li>No encontrar coincidencias no significa que la imagen sea original.</li>
          <li>Dos perfiles que usan imágenes similares no necesariamente pertenecen a la misma persona.</li>
          <li>TraceID solo utiliza información públicamente accesible.</li>
          <li>Las imágenes se eliminan del servidor después del análisis; no se almacenan de forma permanente por defecto.</li>
        </ul>
      </section>
    </div>
  )
}