import { useNavigate } from 'react-router-dom'

function Hero() {
  const navigate = useNavigate()

  return (
    <section style={styles.section}>
      <p style={styles.tag}>48 Hours. Infinite Ideas.</p>
      <h1 style={styles.title}>Welcome to<br /><span style={styles.highlight}>InnovateFest</span></h1>
      <p style={styles.subtitle}>
        A flagship weekend hackathon where students build, break, and ship real products.
        Join hundreds of developers, designers, and problem solvers.
      </p>
      <button style={styles.button} onClick={() => navigate('/register')}>
        Register Now →
      </button>
    </section>
  )
}

const styles = {
  section: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '6rem 2rem 4rem',
    background: 'radial-gradient(ellipse at top, #1e0a3c 0%, #0a0a0a 70%)',
  },
  tag: {
    color: '#7c3aed',
    fontWeight: '600',
    letterSpacing: '0.1em',
    marginBottom: '1rem',
    fontSize: '0.95rem',
  },
  title: {
    fontSize: 'clamp(2.5rem, 8vw, 5rem)',
    fontWeight: '800',
    lineHeight: 1.1,
    marginBottom: '1.5rem',
  },
  highlight: {
    color: '#7c3aed',
  },
  subtitle: {
    maxWidth: '600px',
    color: '#aaa',
    fontSize: '1.1rem',
    lineHeight: 1.7,
    marginBottom: '2rem',
  },
  button: {
    padding: '0.85rem 2rem',
    backgroundColor: '#7c3aed',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
  }
}

export default Hero