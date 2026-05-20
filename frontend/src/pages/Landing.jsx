import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Schedule from '../components/Schedule'
import FAQ from '../components/FAQ'

function Landing() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Schedule />
      <FAQ />
    </div>
  )
}

export default Landing