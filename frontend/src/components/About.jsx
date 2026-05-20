function About() {
  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>About the Event</h2>
      <p style={styles.text}>
        InnovateFest is a 48-hour hackathon bringing together the brightest minds from campuses across the country. Whether you're a coder, designer, or domain expert — if you have an idea and the drive to build it, this is your stage.
      </p>
      <div style={styles.grid}>
        {[
          { stat: '500+', label: 'Participants' },
          { stat: '48hrs', label: 'To Build' },
          { stat: '₹2L+', label: 'In Prizes' },
          { stat: '20+', label: 'Colleges' },
        ].map((item) => (
          <div key={item.label} style={styles.card}>
            <div style={styles.stat}>{item.stat}</div>
            <div style={styles.label}>{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

const styles = {
  section: {
    padding: '5rem 2rem',
    maxWidth: '900px',
    margin: '0 auto',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
  },
  text: {
    color: '#aaa',
    fontSize: '1.05rem',
    lineHeight: 1.8,
    marginBottom: '3rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    backgroundColor: '#111',
    border: '1px solid #222',
    borderRadius: '10px',
    padding: '1.5rem',
  },
  stat: {
    fontSize: '2rem',
    fontWeight: '800',
    color: '#7c3aed',
  },
  label: {
    color: '#aaa',
    marginTop: '0.4rem',
  }
}

export default About