import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { registerUser } from '../model/registerApi'
import type { RegisterPayload } from '../model/registerApi'

export type ValidUserType = 'persona' | 'clinica' | 'refugio'

const VALID_TYPES: ValidUserType[] = ['persona', 'clinica', 'refugio']

export const useRegisterController = () => {
  const { userType } = useParams<{ userType: string }>()
  const navigate = useNavigate()
  const [serverError, setServerError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    if (!success) return
    setCountdown(5)
    const interval = setInterval(() => setCountdown(prev => prev - 1), 1000)
    return () => clearInterval(interval)
  }, [success])

  useEffect(() => {
    if (countdown === 0) navigate('/')
  }, [countdown, navigate])

  const resolvedType: ValidUserType = VALID_TYPES.includes(userType as ValidUserType)
    ? (userType as ValidUserType)
    : 'persona'

  const onSubmit = async (data: RegisterPayload) => {
    setServerError(null)
    setIsSubmitting(true)
    try {
      const res = await registerUser(data)
      if (res.status === 201) setSuccess(true)
    } catch {
      setServerError('Ocurrió un error al registrarse. Intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const goBack = () => navigate('/rol-selector')

  return { userType: resolvedType, onSubmit, goBack, serverError, isSubmitting, success, countdown }
}
