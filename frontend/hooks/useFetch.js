import { useEffect, useState } from 'react'

export function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true

    async function load() {
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`)
        }
        const payload = await response.json()
        if (active) {
          setData(payload)
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : 'Unknown error')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      active = false
    }
  }, [url])

  return { data, loading, error }
}
