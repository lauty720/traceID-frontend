import { useEffect, useRef } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import {
  Shield, Search, Fingerprint, AlertTriangle, Download,
  RefreshCw, ExternalLink, Info, CheckCircle2, AlertCircle
} from 'lucide-react'
import './Results.css'

function CircularProgress({ value, size = 120 }) {
  const radius = (size - 12) / 2
  const circ = 2 * Math.PI * radius
  const offset = circ - (value / 100) * circ
  const color = '#60a5fa'  // neutro: un solo azul, sin semáforo agresivo

  return (
    <svg width={size} height={size} className="circular-progress">
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth="10"
      />
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke={color} strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 0.8s ease' }}
      />
      <text
        x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
        fill="var(--text-primary)" fontSize="1.5rem" fontWeight="700"
        fontFamily="var(--mono)"
      >
        {value}%
      </text>
    </svg>
  )
}

function ScoreBar({ score }) {
  return (
    <div className="score-bar-wrap">
      <div className="score-bar-track">
        <div className="score-bar-fill" style={{ width: `${score}%` }} />
      </div>
      <span className="score-value">{score} / 100</span>
    </div>
  )
}

function WarningItem({ level, message }) {
  const icons = {
    green: <CheckCircle2 size={18} />,
    yellow: <AlertTriangle size={18} />,
    red: <AlertCircle size={18} />,
  }
  return (
    <div className={`warning-item level-${level}`}>
      <span className="warning-icon">{icons[level] || icons.yellow}</span>
      <span>{message}</span>
    </div>
  )
}

export default function Results() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const reportRef = useRef(null)

  useEffect(() => {
    if (!state?.result) {
      navigate('/', { replace: true })
    }
  }, [state, navigate])

  if (!state?.result) return null

  const {
    is_demo,
    image_analysis,
    reverse_search,
    public_footprint,
    consistency,
    evidence_score,
    summary,
    warnings = [],
  } = state.result

  const handleDownload = () => {
    const text = [
      '=== TraceID — Informe de análisis ===',
      is_demo ? '*** DATOS DE DEMOSTRACIÓN ***' : '',
      '',
      `Resumen: ${summary}`,
      '',
      `Probabilidad IA: ${image_analysis?.ai_probability}% (confianza: ${image_analysis?.confidence})`,
      `Explicación: ${image_analysis?.explanation}`,
      '',
      `Coincidencias públicas: ${reverse_search?.matches_found}`,
      ...(reverse_search?.sources || []).map(
        (s, i) => `  ${i + 1}. [${s.type}] ${s.title} — ${s.url}`
      ),
      '',
      `Perfiles posibles: ${(public_footprint?.possible_profiles || []).length}`,
      ...(public_footprint?.possible_profiles || []).map(
        (p) => `  - ${p.platform}: ${p.public_name} (${p.username}) ${p.url}`
      ),
      '',
      `Consistencia: ${consistency?.level?.toUpperCase()}`,
      consistency?.explanation,
      '',
      `Índice de autenticidad de la evidencia: ${evidence_score?.score}/100`,
      evidence_score?.explanation,
      '',
      'Advertencias:',
      ...warnings.map((w) => `  [${w.level}] ${w.message}`),
      '',
      '---',
      'TraceID analiza únicamente información públicamente accesible.',
      'Los resultados son orientativos y no constituyen identificación definitiva.',
    ].filter(Boolean).join('\n')

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `traceid-informe-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const confLabel = {
    low: 'Baja',
    medium: 'Media',
    high: 'Alta',
  }

  return (
    <div className="container results-page fade-in" ref={reportRef}>
      {is_demo && (
        <div className="demo-banner">
          <Info size={18} />
          <span>DATOS DE DEMOSTRACIÓN — Los resultados son ficticios y solo sirven para ilustrar el funcionamiento de la herramienta.</span>
        </div>
      )}

      <div className="results-header">
        <h1>Resultados del análisis</h1>
        <div className="results-actions">
          <button className="btn btn-secondary" onClick={() => navigate('/')}>
            <RefreshCw size={16} />
            Nuevo análisis
          </button>
          <button className="btn btn-primary" onClick={handleDownload}>
            <Download size={16} />
            Descargar informe
          </button>
        </div>
      </div>

      {/* Summary */}
      <section className="glass card summary-card">
        <h2>Resumen del análisis</h2>
        <p className="summary-text">{summary}</p>
      </section>

      {/* Evidence score */}
      <section className="glass card">
        <h2>Índice de autenticidad de la evidencia</h2>
        <ScoreBar score={evidence_score?.score ?? 0} />
        <p className="card-note">{evidence_score?.explanation}</p>
      </section>

      <div className="cards-grid">
        {/* Card 1 — Authenticity */}
        <section className="glass card">
          <div className="card-title">
            <Shield size={20} />
            <h2>Análisis de autenticidad</h2>
          </div>
          <div className="auth-visual">
            <CircularProgress value={image_analysis?.ai_probability ?? 0} />
            <div className="auth-meta">
              <p className="auth-label">Probabilidad de contenido generado por IA</p>
              <p className="auth-conf">
                Confianza: <strong>{confLabel[image_analysis?.confidence] || image_analysis?.confidence}</strong>
              </p>
            </div>
          </div>
          <p className="card-body">{image_analysis?.explanation}</p>
          {image_analysis?.warning && (
            <p className="card-warning">{image_analysis.warning}</p>
          )}
        </section>

        {/* Card 2 — Reverse search */}
        <section className="glass card">
          <div className="card-title">
            <Search size={20} />
            <h2>Presencia pública de la imagen</h2>
          </div>
          <p className="matches-count">
            Se encontraron <strong>{reverse_search?.matches_found ?? 0}</strong> coincidencias públicas.
          </p>

          {(reverse_search?.sources || []).length === 0 ? (
            <div className="empty-state">
              <p className="empty-title">NO SE ENCONTRARON COINCIDENCIAS</p>
              <p className="card-note">
                Esto no significa que la imagen sea original. Puede existir en sitios que el buscador no haya indexado.
              </p>
            </div>
          ) : (
            <div className="sources-list">
              {reverse_search.sources.map((src, i) => (
                <div key={i} className="source-item">
                  <div className="source-top">
                    <span className="source-type">{src.type}</span>
                    {src.match_type && (
                      <span className={`match-tag ${src.match_type}`}>
                        {src.match_type === 'exact' ? 'Coincidencia exacta' : 'Coincidencia parcial'}
                      </span>
                    )}
                  </div>
                  <p className="source-title">{src.title}</p>
                  <p className="source-domain">{src.domain}</p>
                  {src.date && <p className="source-date">Fecha: {src.date}</p>}
                  <a href={src.url} target="_blank" rel="noopener noreferrer" className="source-link">
                    Ver fuente <ExternalLink size={12} />
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Card 3 — Public footprint */}
      <section className="glass card">
        <div className="card-title">
          <Fingerprint size={20} />
          <h2>Huella digital pública relacionada</h2>
        </div>
        <p className="card-note" style={{ marginBottom: '1rem' }}>
          Esta sección no identifica personas por su rostro. Solo muestra perfiles y plataformas
          encontrados a partir de las fuentes públicas de la búsqueda inversa.
        </p>

        {(public_footprint?.possible_profiles || []).length === 0 ? (
          <div className="empty-state">
            <p className="empty-title">No se extrajeron perfiles públicos</p>
            <p className="card-note">
              {public_footprint?.note || 'Información insuficiente para establecer perfiles relacionados.'}
            </p>
          </div>
        ) : (
          <div className="profiles-grid">
            {public_footprint.possible_profiles.map((p, i) => (
              <div key={i} className="profile-item">
                <div className="profile-header">
                  <span className="platform-badge">{p.platform}</span>
                  <span className="possible-tag">Posible coincidencia</span>
                </div>
                <p className="profile-name">{p.public_name}</p>
                {p.username && <p className="profile-user">{p.username}</p>}
                <p className="profile-source">Fuente: {p.source}</p>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="source-link">
                  Ver perfil público <ExternalLink size={12} />
                </a>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Consistency */}
      <section className="glass card">
        <h2>Consistencia de la huella pública</h2>
        <div className={`consistency-level level-${consistency?.level}`}>
          {(consistency?.level || 'low').toUpperCase()}
        </div>
        <p className="card-body">{consistency?.explanation}</p>
        <p className="card-note">
          Este nivel representa únicamente la consistencia de las fuentes encontradas,
          no un juicio sobre una persona.
        </p>
      </section>

      {/* Warnings */}
      {warnings.length > 0 && (
        <section className="glass card">
          <div className="card-title">
            <AlertTriangle size={20} />
            <h2>Señales de atención</h2>
          </div>
          <div className="warnings-list">
            {warnings.map((w, i) => (
              <WarningItem key={i} level={w.level} message={w.message} />
            ))}
          </div>
        </section>
      )}

      <div className="results-footer-note">
        <p>
          TraceID no identifica personas mediante reconocimiento facial.
          Los resultados son estimaciones basadas en información pública y pueden contener errores.
          {' '}<Link to="/etica">Más sobre ética y privacidad</Link>
        </p>
      </div>
    </div>
  )
}