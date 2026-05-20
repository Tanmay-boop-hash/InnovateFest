import { useState, useEffect } from 'react'
import axios from 'axios'

function Admin() {
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('created_at')
  const [sortOrder, setSortOrder] = useState('desc')
  const [selectedYear, setSelectedYear] = useState('')

  const fetchRegistrations = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/registrations')
      setRegistrations(res.data.registrations)
    } catch (err) {
      setError('Failed to fetch registrations')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRegistrations()
  }, [])
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this registration?')) return
    try {
      await axios.delete(`http://localhost:3000/api/registrations/${id}`)
      setRegistrations(prev => prev.filter(r => r.id !== id))
    } catch (err) {
      alert('Failed to delete')
      console.error(err)
    }
  }

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  // Derive filtered + sorted list from state
  const filtered = registrations
    .filter(r => {
      const matchesSearch =
        r.full_name.toLowerCase().includes(search.toLowerCase()) ||
        r.college.toLowerCase().includes(search.toLowerCase()) ||
        r.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
      const matchesYear = selectedYear ? r.year_of_study === parseInt(selectedYear) : true
      return matchesSearch && matchesYear
    })
    .sort((a, b) => {
      let valA = a[sortBy]
      let valB = b[sortBy]
      if (sortBy === 'created_at') {
        valA = new Date(valA)
        valB = new Date(valB)
      }
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

  const exportCSV = () => {
    const headers = ['ID', 'Full Name', 'Email', 'College', 'Year', 'Skills', 'Motivation', 'Registered At']
    const rows = filtered.map(r => [
      r.id,
      r.full_name,
      r.email,
      r.college,
      r.year_of_study,
      r.skills.join('; '),
      `"${r.motivation.replace(/"/g, '""')}"`,
      new Date(r.created_at).toLocaleString()
    ])
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'registrations.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) return <div style={styles.center}>Loading...</div>
  if (error) return <div style={styles.center}>{error}</div>

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Admin Dashboard</h1>
          <p style={styles.subtitle}>
            {filtered.length} of {registrations.length} registrations
          </p>
        </div>
        <button onClick={exportCSV} style={styles.exportBtn}>
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div style={styles.filters}>
        <input
          placeholder="Search by name, college, or skill..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={styles.searchInput}
        />
        <select
          value={selectedYear}
          onChange={e => setSelectedYear(e.target.value)}
          style={styles.select}
        >
          <option value="">All Years</option>
          {[1,2,3,4,5,6].map(y => (
            <option key={y} value={y}>Year {y}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div style={styles.empty}>No registrations found.</div>
      ) : (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                {[
                  { key: 'full_name', label: 'Name' },
                  { key: 'email', label: 'Email' },
                  { key: 'college', label: 'College' },
                  { key: 'year_of_study', label: 'Year' },
                  { key: 'skills', label: 'Skills' },
                  { key: 'created_at', label: 'Registered At' },
                ].map(col => (
                  <th
                    key={col.key}
                    style={styles.th}
                    onClick={() => col.key !== 'skills' && handleSort(col.key)}
                  >
                    {col.label}
                    {sortBy === col.key ? (sortOrder === 'asc' ? ' ↑' : ' ↓') : ''}
                  </th>
                ))}
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} style={styles.tr}>
                  <td style={styles.td}>{r.full_name}</td>
                  <td style={styles.td}>{r.email}</td>
                  <td style={styles.td}>{r.college}</td>
                  <td style={styles.td}>{r.year_of_study}</td>
                  <td style={styles.td}>
                    <div style={styles.skillTags}>
                      {r.skills.map(s => (
                        <span key={s} style={styles.tag}>{s}</span>
                      ))}
                    </div>
                  </td>
                  <td style={styles.td}>
                    {new Date(r.created_at).toLocaleDateString()}
                  </td>
                  <td style={styles.td}>
                    <button
                      onClick={() => handleDelete(r.id)}
                      style={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

const styles = {
  wrapper: {
    padding: '2rem',
    minHeight: '100vh',
    backgroundColor: '#0a0a0a',
    color: '#fff',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: '800',
  },
  subtitle: {
    color: '#aaa',
    marginTop: '0.3rem',
  },
  exportBtn: {
    padding: '0.6rem 1.2rem',
    backgroundColor: '#7c3aed',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  filters: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
  },
  searchInput: {
    flex: 1,
    minWidth: '200px',
    padding: '0.7rem 1rem',
    backgroundColor: '#111',
    border: '1px solid #333',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '0.95rem',
    outline: 'none',
  },
  select: {
    padding: '0.7rem 1rem',
    backgroundColor: '#111',
    border: '1px solid #333',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '0.95rem',
    outline: 'none',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.9rem',
  },
  th: {
    textAlign: 'left',
    padding: '0.75rem 1rem',
    backgroundColor: '#111',
    color: '#aaa',
    fontWeight: '600',
    borderBottom: '1px solid #222',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  tr: {
    borderBottom: '1px solid #1a1a1a',
  },
  td: {
    padding: '0.75rem 1rem',
    verticalAlign: 'top',
    color: '#ddd',
  },
  skillTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.3rem',
  },
  tag: {
    padding: '0.2rem 0.5rem',
    backgroundColor: '#7c3aed22',
    color: '#a78bfa',
    borderRadius: '4px',
    fontSize: '0.75rem',
  },
  deleteBtn: {
    padding: '0.3rem 0.7rem',
    backgroundColor: 'transparent',
    border: '1px solid #ef4444',
    color: '#ef4444',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.8rem',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    color: '#aaa',
    backgroundColor: '#0a0a0a',
  },
  empty: {
    textAlign: 'center',
    color: '#aaa',
    padding: '3rem',
  }
}

export default Admin