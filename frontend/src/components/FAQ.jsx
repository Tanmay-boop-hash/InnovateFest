import { useState } from 'react'

const faqs = [
  { q: 'Who can participate?', a: 'Any student currently enrolled in an undergraduate or postgraduate program.' },
  { q: 'What is the team size?', a: 'Teams of 2 to 4 members. Solo participation is not allowed.' },
  { q: 'Do I need prior hackathon experience?', a: 'Not at all. Beginners are welcome and we have mentors to guide you.' },
  { q: 'Is there a registration fee?', a: 'No, participation is completely free.' },
  { q: 'What should I bring?', a: 'Your laptop, charger, valid student ID, and lots of enthusiasm.' },
]

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Frequently Asked Questions (FAQs)</h2>
      <div style={styles.list}>
        {faqs.map((faq, index) => (
          <div key={index} style={styles.item}>
            <button style={styles.question} onClick={() => toggle(index)}>
              {faq.q}
              <span>{openIndex === index ? '−' : '+'}</span>
            </button>
            {openIndex === index && (
              <div style={styles.answer}>{faq.a}</div>
            )}
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
    marginBottom: '2rem',
    textAlign: 'center',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  item: {
    border: '1px solid #222',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  question: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 1.2rem',
    backgroundColor: '#111',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    textAlign: 'left',
  },
  answer: {
    padding: '1rem 1.2rem',
    color: '#aaa',
    backgroundColor: '#0d0d0d',
    fontSize: '0.95rem',
    lineHeight: 1.7,
  }
}

export default FAQ