import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>InnovateFest</div>
      <button style={styles.button} onClick={() => navigate('/register')}>
        Register Now
      </button>
    </nav>
  )
}

const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: 'rgba(10,10,10,0.85)',
    backdropFilter: 'blur(10px)',
    zIndex: 100,
    boxSizing: 'border-box',
  },
  logo: {
    fontSize: '1.4rem',
    fontWeight: '700',
    color: '#7c3aed',
  },
  button: {
    padding: '0.5rem 1.2rem',
    backgroundColor: '#7c3aed',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
  }
}

export default Navbar