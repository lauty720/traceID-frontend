import { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, Image as ImageIcon, Shield, Search, Fingerprint } from 'lucide-react'
import { getToken } from '../services/auth'
import './Home.css'

const ALLOWED = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const MAX_MB = 10

export default function Home() {
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState('')

  const processFile = useCallback((f) => {
    setError('')
    if (!f) return
    if (!ALLOWED.includes(f.type) && !f.name.match(/\.(jpe?g|png|webp)$/i)) {
      setError('Formato no permitido. Usá JPG, JPEG, PNG o WEBP.')
      return
    }
    if (f.size > MAX_MB * 1024 * 1024) {
      setError(`El archivo supera el límite de ${MAX_MB} MB.`)
      return
    }
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }, [])

  const onDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    processFile(e.dataTransfer.files?.[0])
  }

  const onAnalyze = () => {
    if (!file) return
    if (!getToken()) {
      navigate('/login')
      return
    }
    navigate('/analisis', { state: { file, preview, demo: false } })
  }

  return (
    <div className="home container">
      <div className="home-grid">
        <section className="hero anim anim-1">
          <div className="hero-badge">
            <Shield size={14} />
            <span>Herramienta educativa de ciberseguridad</span>
          </div>
          <h1>¿Esta imagen es realmente lo que parece?</h1>
          <p className="hero-desc">
            Analizá una imagen para detectar posibles contenidos generados por IA,
            encontrar dónde aparece públicamente en Internet y descubrir coincidencias
            relacionadas con su huella digital pública.
          </p>
          <ul className="hero-points">
            <li>Sin reconocimiento facial</li>
            <li>Solo fuentes públicas</li>
            <li>Resultados orientativos</li>
          </ul>
        </section>

        <section className={`upload-section glass anim anim-2`}>
          <div
            className={`dropzone ${dragOver ? 'drag-over' : ''} ${preview ? 'has-preview' : ''}`}
            onDragOver={(e) => {
              e.preventDefault()
              setDragOver(true)
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            onClick={() => !preview && inputRef.current?.click()}
          >
            {preview ? (
              <div className="preview-wrap">
                <img src={preview} alt="Vista previa" />
                <button
                  type="button"
                  className="btn btn-ghost change-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    setFile(null)
                    setPreview(null)
                    setError('')
                  }}
                >
                  Cambiar imagen
                </button>
              </div>
            ) : (
              <div className="dropzone-content">
                <div className="drop-icon">
                  <Upload size={32} strokeWidth={1.5} />
                </div>
                <p className="drop-title">Arrastrá una imagen aquí</p>
                <p className="drop-or">o</p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={(e) => {
                    e.stopPropagation()
                    inputRef.current?.click()
                  }}
                >
                  <ImageIcon size={18} />
                  Seleccionar imagen
                </button>
                <p className="drop-formats">JPG · JPEG · PNG · WEBP — máx. {MAX_MB} MB</p>
              </div>
            )}
            <input
              ref={inputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
              hidden
              onChange={(e) => processFile(e.target.files?.[0])}
            />
          </div>

          {error && <p className="error-msg">{error}</p>}

          <div className="actions">
            <button
              type="button"
              className="btn btn-primary analyze-btn"
              disabled={!file}
              onClick={onAnalyze}
            >
              <Search size={18} />
              Analizar imagen
            </button>
          </div>

          <p className="privacy-notice">
            TraceID analiza únicamente información públicamente accesible. No accede a
            cuentas privadas ni intenta identificar personas mediante reconocimiento
            facial. Los resultados son estimaciones y pueden contener errores.{' '}
            <a href="/privacidad">Ver política de privacidad</a>
          </p>
        </section>
      </div>

      <section className="features">
        <div className="feature glass anim anim-3">
          <div className="feature-icon">
            <Shield size={22} />
          </div>
          <h3>Autenticidad</h3>
          <p>Detectá señales compatibles con contenido generado o manipulado mediante IA.</p>
        </div>
        <div className="feature glass anim anim-4">
          <div className="feature-icon">
            <Search size={22} />
          </div>
          <h3>Búsqueda inversa</h3>
          <p>Encontrá dónde aparece públicamente la imagen en Internet.</p>
        </div>
        <div className="feature glass anim anim-5">
          <div className="feature-icon">
            <Fingerprint size={22} />
          </div>
          <h3>Huella digital</h3>
          <p>Organizá las evidencias públicas y posibles perfiles relacionados.</p>
        </div>
      </section>
    </div>
  )
}
