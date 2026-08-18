import { useEffect, useState } from 'react'
import { fetchCollection } from '../services/api.js'

function formatValue(value) {
  if (Array.isArray(value)) {
    return value.map(formatValue).join(', ')
  }

  if (value && typeof value === 'object') {
    return Object.entries(value)
      .filter(([key]) => key !== '_id')
      .map(([key, nestedValue]) => `${key}: ${formatValue(nestedValue)}`)
      .join('; ')
  }

  return String(value ?? '')
}

function ResourceView({ title, description, resource, columns }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadItems() {
      try {
        setLoading(true)
        setError('')
        const nextItems = await fetchCollection(resource)

        if (active) {
          setItems(nextItems)
        }
      } catch (fetchError) {
        if (active) {
          setError(fetchError instanceof Error ? fetchError.message : 'Unable to load data')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadItems()

    return () => {
      active = false
    }
  }, [resource])

  return (
    <section className="resource-section">
      <div className="section-heading">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <span className="record-count">{items.length} records</span>
      </div>

      {loading && <div className="state-message">Loading {title.toLowerCase()}...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-hover align-middle resource-table">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key} scope="col">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id ?? JSON.stringify(item)}>
                  {columns.map((column) => (
                    <td key={column.key}>{formatValue(item[column.key])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default ResourceView