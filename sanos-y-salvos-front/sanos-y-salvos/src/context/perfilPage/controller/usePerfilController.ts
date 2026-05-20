import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import type { PerfilUsuario } from '../model/perfilTypes'
import { mapApiUsuarioToPerfil } from '../model/perfilTypes'
import { fetchUsuarioById } from '../model/perfilApi'
import { tokenManager } from '../../../services/tokenManager'

export function usePerfilController() {
  const navigate = useNavigate()
  const [perfil, setPerfil] = useState<PerfilUsuario | null>(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const payload = tokenManager.decode() as { sub?: string; email?: string } | null
    const id = payload?.sub
    const email = payload?.email ?? ''

    if (!id) {
      navigate('/')
      return
    }

    fetchUsuarioById(id)
      .then((apiUsuario) => setPerfil(mapApiUsuarioToPerfil(apiUsuario, email)))
      .catch(() => {})
      .finally(() => setCargando(false))
  }, [navigate])

  const logout = () => {
    tokenManager.clear()
    navigate('/')
  }

  return { perfil, cargando, logout }
}
