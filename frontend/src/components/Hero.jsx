import { useNavigate } from 'react-router-dom'

function Hero() {
  const navigate = useNavigate()

  return (
    <section style={styles.section}>
      {/* Animated blobs */}
      <div style={styles.blob1} />
      <div style={styles.blob2} />
      <div style={styles.blob3} />

      {/* Content */}
      <div style={styles.content}>
        <p style={styles.tag}>48 Hours. Infinite Ideas.</p>
        <h1 style={styles.title}>
          Welcome to<br />
          <span style={styles.highlight}>InnovateFest</span>
        </h1>
        <p style={styles.subtitle}>
          A flagship weekend hackathon where students build, break, and ship real products.
          Join hundreds of developers, designers, and problem solvers.
        </p>
        <button style={styles.button} onClick={() => navigate('/register')}>
          Register Now →
        </button>
      </div>
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
    backgroundColor: '#0a0a0a',
    position: 'relative',
    overflow: 'hidden',
  },
  blob1: {
    position: 'absolute',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, #7c3aed55, transparent 70%)',
    top: '-100px',
    left: '-150px',
    animation: 'float1 8s ease-in-out infinite',
  },
  blob2: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, #2563eb44, transparent 70%)',
    bottom: '-80px',
    right: '-100px',
    animation: 'float2 10s ease-in-out infinite',
  },
  blob3: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, #7c3aed33, transparent 70%)',
    top: '40%',
    right: '20%',
    animation: 'float1 12s ease-in-out infinite reverse',
  },
  content: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  tag: {
    color: '#a78bfa',
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
    background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
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
    background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
  }
}

export default Hero