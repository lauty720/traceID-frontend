import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Shield, Search, Fingerprint, Loader2 } from 'lucide-react'
import { analyzeImage } from '../services/api'
import './Analysis.css'

const STAGES = [
  {
    id: 1,
    title: '01 — Autenticidad',
    desc: 'Analizando si la imagen presenta señales compatibles con contenido generado o manipulado mediante IA.',
    icon: Shield,
  },
  {
    id: 2,
    title: '02 — Búsqueda inversa',
    desc: 'Buscando coincidencias públicas de esta imagen en Internet.',
    icon: Search,
  },
  {
    id: 3,
    title: '03 — Huella digital',
    desc: 'Analizando las páginas y perfiles públicos encontrados.',
    icon: Fingerprint,
  },
]

export default function Analysis() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [currentStage, setCurrentStage] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!state?.demo && !state?.file) {
      navigate('/', { replace: true })
      return
    }

    let cancelled = false
    const run = async () => {
      // Animate stages while the request is in flight
      const stageTimers = [
        setTimeout(() => !cancelled && setCurrentStage(1), 800),
        setTimeout(() => !cancelled && setCurrentStage(2), 2200),
        setTimeout(() => !cancelled && setCurrentStage(3), 3800),
      ]

      try {
        const result = await analyzeImage(state.file, state.demo === true)
        if (cancelled) return
        // Keep last stage visible briefly
        await new Promise((r) => setTimeout(r, 600))
        navigate('/resultados', {
          replace: true,
          state: { result, preview: state.preview },
        })
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Error durante el análisis.')
        }
      } finally {
        stageTimers.forEach(clearTimeout)
      }
    }

    run()
    return () => { cancelled = true }
  }, [state, navigate])

  if (error) {
    return (
      <div className="container analysis-page fade-in">
        <div className="glass analysis-card error-card">
          <h2>No se pudo completar el análisis</h2>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Volver al inicio
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container analysis-page fade-in">
      <div className="glass analysis-card">
        <div className="analysis-header">
          <Loader2 className="spinner" size={28} />
          <h2>Analizando imagen…</h2>
          <p>Esto puede tardar unos segundos. No inventamos resultados mientras procesamos.</p>
        </div>

        <div className="stages">
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon
            const active = currentStage >= stage.id
            const current = currentStage === stage.id
            return (
              <div
                key={stage.id}
                className={`stage ${active ? 'active' : ''} ${current ? 'current' : ''}`}
              >
                <div className="stage-icon">
                  <Icon size={20} />
                </div>
                <div className="stage-text">
                  <h3>{stage.title}</h3>
                  <p>{stage.desc}</p>
                </div>
                {current && <div className="stage-pulse" />}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}