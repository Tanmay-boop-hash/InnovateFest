const events = [
  { time: 'Day 1 — 9:00 AM', title: 'Opening Ceremony', desc: 'Kickoff, rules, and team formation.' },
  { time: 'Day 1 — 11:00 AM', title: 'Hacking Begins', desc: 'Build, prototype, and iterate.' },
  { time: 'Day 1 — 9:00 PM', title: 'Mentor Sessions', desc: 'One-on-one sessions with industry mentors.' },
  { time: 'Day 2 — 9:00 AM', title: 'Final Submissions', desc: 'Code freeze and submission portal opens.' },
  { time: 'Day 2 — 11:00 AM', title: 'Presentations', desc: 'Demo your project to the judges.' },
  { time: 'Day 2 — 4:00 PM', title: 'Closing & Awards', desc: 'Winners announced and prizes distributed.' },
]

function Schedule() {
  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Schedule</h2>
      <div style={styles.timeline}>
        {events.map((event, index) => (
          <div key={index} style={styles.item}>
            <div style={styles.dot} />
            <div style={styles.content}>
              <div style={styles.time}>{event.time}</div>
              <div style={styles.title}>{event.title}</div>
              <div style={styles.desc}>{event.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

const styles = {
  section: {
    padding: '5rem 2rem',
    maxWidth: '700px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '3rem',
    textAlign: 'center',
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    borderLeft: '2px solid #7c3aed',
    paddingLeft: '2rem',
  },
  item: {
    position: 'relative',
  },
  dot: {
    position: 'absolute',
    left: '-2.45rem',
    top: '0.3rem',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: '#7c3aed',
  },
  time: {
    color: '#7c3aed',
    fontSize: '0.85rem',
    fontWeight: '600',
    marginBottom: '0.3rem',
  },
  title: {
    fontWeight: '700',
    fontSize: '1.05rem',
    marginBottom: '0.3rem',
  },
  desc: {
    color: '#aaa',
    fontSize: '0.95rem',
  }
}

export default Schedule