import { useState } from 'react'
import { uploadImageToCloudinary, type CloudinaryUploadResult } from '../../model/cloudinaryApi'

interface UploadState {
  uploading: boolean
  result: CloudinaryUploadResult | null
  error: string | null
}

export const useCloudinaryUpload = () => {
  const [state, setState] = useState<UploadState>({
    uploading: false,
    result: null,
    error: null,
  })

  const upload = async (file: File) => {
    setState({ uploading: true, result: null, error: null })
    try {
      const result = await uploadImageToCloudinary(file)
      setState({ uploading: false, result, error: null })
      return result
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al subir la imagen'
      setState({ uploading: false, result: null, error: message })
      return null
    }
  }

  const reset = () => setState({ uploading: false, result: null, error: null })

  return {
    upload,
    reset,
    uploading: state.uploading,
    result: state.result,
    error: state.error,
  }
}
