import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

export function useUnauthorizedController() {
  const navigate = useNavigate()
  const [segundos, setSegundos] = useState(5)

  useEffect(() => {
    if (segundos === 0) {
      navigate('/')
      return
    }
    const timer = setTimeout(() => setSegundos(s => s - 1), 1000)
    return () => clearTimeout(timer)
  }, [segundos, navigate])

  return { segundos }
}
