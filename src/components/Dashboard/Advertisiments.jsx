import React, { useEffect, useState } from 'react'
import axios from 'axios'
import getConfig from '../../utils/getConfig'

const typeClass = (type) => {
  switch (type) {
    case 'event': return 'alert-success'
    case 'alert': return 'alert-danger'
    case 'info':
    default: return 'alert-info'
  }
}

const sanitizeHtml = (html) => {
  if (!html) return ''
  return String(html)
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/\son\w+\s*=\s*"[^"]*"/gi, '')
    .replace(/\son\w+\s*=\s*'[^']*'/gi, '')
    .replace(/javascript:/gi, '')
}

const Advertisiments = () => {
  const [advices, setAdvices] = useState([])
  const [dismissed, setDismissed] = useState(new Set())

  useEffect(() => {
    const fetch = async () => {
      try {
        const url = `${import.meta.env.VITE_API_SERVER}/api/v1/advice`
        const res = await axios.get(url, getConfig())
        const data = res.data
        let arr = []
        if (Array.isArray(data)) arr = data
        else if (data && Array.isArray(data.rows)) arr = data.rows
        else if (data && data.id) arr = [data]
        // show only active by default
        arr = arr.filter(a => a.active)
        setAdvices(arr)
      } catch (err) {
        console.error('Error fetching advices', err)
      }
    }
    fetch()
  }, [])

  const handleClose = (id) => {
    setDismissed(prev => new Set([...Array.from(prev), id]))
  }

  return (
    <>
      {advices.length > 0 && (
        advices.map(advice => (
          !dismissed.has(advice.id) && (
            <div key={advice.id} className={`alert ${typeClass(advice.type)} alert-dismissible`} role="alert">
              <button type="button" className="close" aria-label="Cerrar" onClick={() => handleClose(advice.id)}>
                <span aria-hidden="true">×</span>
              </button>
              <h5><i className="fas fa-bullhorn"></i> {advice.title}</h5>
              <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(advice.message) }} />
            </div>
          )
        ))
      )}
    </>
  )
}

export default Advertisiments