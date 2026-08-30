import './DonationBar.css'

const DONATE_URL = 'https://link.mercadopago.com.ar/traceid'

export default function DonationBar() {
  return (
    <div className="donation-bar">
      <div className="container donation-bar-inner">
        <p className="donation-bar-text">
          TraceID es un proyecto educativo independiente. Si te sirve, podés apoyar con una donación.
        </p>
        <a
          className="donation-bar-btn"
          href={DONATE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Donar
        </a>
      </div>
    </div>
  )
}
