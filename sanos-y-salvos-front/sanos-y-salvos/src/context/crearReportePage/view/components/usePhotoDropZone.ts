import { useState, useRef, useCallback } from 'react'
import { useCloudinaryUpload } from './useCloudinaryUpload'

export const usePhotoDropZone = (
  onFileChange: (file: File | null) => void,
  onUploadComplete?: (url: string) => void,
) => {
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { upload, uploading, result, error } = useCloudinaryUpload()

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) return
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)
    setFileName(file.name)
    onFileChange(file)
    const uploadResult = await upload(file)
    if (uploadResult) onUploadComplete?.(uploadResult.secureUrl)
  }, [onFileChange, upload, onUploadComplete])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleClear = () => {
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
    setFileName(null)
    onFileChange(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return {
    isDragging,
    preview,
    fileName,
    inputRef,
    uploading,
    uploadResult: result,
    uploadError: error,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleInputChange,
    handleClear,
  }
}
