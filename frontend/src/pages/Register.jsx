import { useState } from 'react'
import axios from 'axios'

const SKILLS_OPTIONS = [
  'React', 'Node.js', 'Python', 'Machine Learning', 'UI/UX Design',
  'PostgreSQL', 'MongoDB', 'DevOps', 'Blockchain', 'Android', 'iOS'
]

function Register() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    college: '',
    year_of_study: '',
    skills: [],
    motivation: ''
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState('')

  const validate = () => {
    const newErrors = {}
    if (!formData.full_name.trim()) newErrors.full_name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    if (!formData.college.trim()) newErrors.college = 'College is required'
    if (!formData.year_of_study) newErrors.year_of_study = 'Year of study is required'
    if (formData.skills.length === 0) newErrors.skills = 'Select at least one skill'
    if (!formData.motivation.trim()) {
      newErrors.motivation = 'Motivation statement is required'
    } else if (formData.motivation.length > 500) {
      newErrors.motivation = 'Must be under 500 characters'
    }
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const toggleSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
    setErrors(prev => ({ ...prev, skills: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError('')

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    try {
      await axios.post('http://localhost:3000/api/registrations', {
        ...formData,
        year_of_study: parseInt(formData.year_of_study)
      })
      setSuccess(true)
    } catch (err) {
      setServerError(err.response?.data?.error || 'Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div style={styles.successWrapper}>
        <div style={styles.successBox}>
          <div style={styles.checkmark}>✓</div>
          <h2 style={styles.successTitle}>You're registered!</h2>
          <p style={styles.successText}>We'll be in touch with further details. See you at InnovateFest.</p>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h1 style={styles.title}>Register for InnovateFest</h1>
        <p style={styles.subtitle}>Fill in your details to secure your spot.</p>

        <form onSubmit={handleSubmit} style={styles.form}>

          <Field label="Full Name" error={errors.full_name}>
            <input
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Name"
              style={inputStyle(errors.full_name)}
            />
          </Field>

          <Field label="Email" error={errors.email}>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="College mail id"
              style={inputStyle(errors.email)}
            />
          </Field>

          <Field label="College" error={errors.college}>
            <input
              name="college"
              value={formData.college}
              onChange={handleChange}
              placeholder="College name"
              style={inputStyle(errors.college)}
            />
          </Field>

          <Field label="Year of Study" error={errors.year_of_study}>
            <select
              name="year_of_study"
              value={formData.year_of_study}
              onChange={handleChange}
              style={inputStyle(errors.year_of_study)}
            >
              <option value="">Select year</option>
              {[1,2,3,4,5,6].map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </Field>

          <Field label="Skills / Interests" error={errors.skills}>
            <div style={styles.skillsGrid}>
              {SKILLS_OPTIONS.map(skill => (
                <button
                  type="button"
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  style={skillBtnStyle(formData.skills.includes(skill))}
                >
                  {skill}
                </button>
              ))}
            </div>
          </Field>

          <Field
            label={`Motivation Statement (${formData.motivation.length}/500)`}
            error={errors.motivation}
          >
            <textarea
              name="motivation"
              value={formData.motivation}
              onChange={handleChange}
              placeholder="Why do you want to participate? What do you hope to build?"
              rows={4}
              style={{ ...inputStyle(errors.motivation), resize: 'vertical' }}
            />
          </Field>

          {serverError && (
            <div style={styles.serverError}>{serverError}</div>
          )}

          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? 'Submitting...' : 'Register Now'}
          </button>

        </form>
      </div>
    </div>
  )
}

// Small reusable wrapper for label + input + error message
function Field({ label, error, children }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <label style={styles.label}>{label}</label>
      {children}
      {error && <p style={styles.errorText}>{error}</p>}
    </div>
  )
}

const inputStyle = (error) => ({
  width: '100%',
  padding: '0.75rem 1rem',
  backgroundColor: '#111',
  border: `1px solid ${error ? '#ef4444' : '#333'}`,
  borderRadius: '6px',
  color: '#fff',
  fontSize: '1rem',
  outline: 'none',
  boxSizing: 'border-box',
})

const skillBtnStyle = (selected) => ({
  padding: '0.4rem 0.9rem',
  borderRadius: '20px',
  border: `1px solid ${selected ? '#7c3aed' : '#333'}`,
  backgroundColor: selected ? '#7c3aed22' : 'transparent',
  color: selected ? '#a78bfa' : '#aaa',
  cursor: 'pointer',
  fontSize: '0.85rem',
  transition: 'all 0.2s',
})

const styles = {
  wrapper: {
    minHeight: '100vh',
    backgroundColor: '#0a0a0a',
    padding: '4rem 1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  container: {
    width: '100%',
    maxWidth: '580px',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '800',
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: '#aaa',
    marginBottom: '2.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#ccc',
  },
  errorText: {
    color: '#ef4444',
    fontSize: '0.8rem',
    marginTop: '0.3rem',
  },
  serverError: {
    backgroundColor: '#ef444422',
    border: '1px solid #ef4444',
    color: '#ef4444',
    padding: '0.75rem 1rem',
    borderRadius: '6px',
    marginBottom: '1rem',
    fontSize: '0.9rem',
  },
  submitBtn: {
    padding: '0.85rem',
    backgroundColor: '#7c3aed',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '0.5rem',
  },
  skillsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  successWrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0a0a0a',
  },
  successBox: {
    textAlign: 'center',
    padding: '3rem',
  },
  checkmark: {
    fontSize: '3rem',
    color: '#7c3aed',
    marginBottom: '1rem',
  },
  successTitle: {
    fontSize: '2rem',
    fontWeight: '800',
    marginBottom: '1rem',
  },
  successText: {
    color: '#aaa',
    fontSize: '1.05rem',
  }
}

export default Register