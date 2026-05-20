import { tokenManager } from '../../../services/tokenManager'

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
const FOLDER = import.meta.env.VITE_CLOUDINARY_FOLDER

const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

export interface CloudinaryUploadResult {
  secureUrl: string
  status: number
}

export async function uploadImageToCloudinary(file: File): Promise<CloudinaryUploadResult> {
  if (!tokenManager.isValid()) throw new Error('No autorizado — iniciá sesión para subir imágenes')

  const form = new FormData()
  form.append('file', file)
  form.append('upload_preset', UPLOAD_PRESET)
  form.append('folder', FOLDER)

  const response = await fetch(UPLOAD_URL, { method: 'POST', body: form })
  const data = await response.json()

  if (data.error) throw new Error(data.error.message)

  return {
    secureUrl: data.secure_url,
    status: response.status,
  }
}
