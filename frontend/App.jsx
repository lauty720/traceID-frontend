import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Analysis from './pages/Analysis'
import Results from './pages/Results'
import HowItWorks from './pages/HowItWorks'
import Ethics from './pages/Ethics'
import About from './pages/About'
import Login from './pages/Login'
import Privacy from './pages/Privacy'

export default function App() {
  return (
    <>
      <Navbar />
      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analisis" element={<Analysis />} />
          <Route path="/resultados" element={<Results />} />
          <Route path="/como-funciona" element={<HowItWorks />} />
          <Route path="/etica" element={<Ethics />} />
          <Route path="/privacidad" element={<Privacy />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}