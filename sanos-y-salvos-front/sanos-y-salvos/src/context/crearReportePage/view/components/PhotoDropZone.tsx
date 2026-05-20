import { usePhotoDropZone } from './usePhotoDropZone'

interface Props {
  onFileChange: (file: File | null) => void
  onUploadComplete?: (url: string) => void
}

export const PhotoDropZone = ({ onFileChange, onUploadComplete }: Props) => {
  const {
    isDragging,
    preview,
    fileName,
    inputRef,
    uploading,
    uploadResult,
    uploadError,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleInputChange,
    handleClear,
  } = usePhotoDropZone(onFileChange, onUploadComplete)

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-[#191c1e] font-manrope">
        Foto de la mascota <span className="text-[#505f76] font-normal">(opcional)</span>
      </span>

      {!preview ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`
            relative flex flex-col items-center justify-center gap-3
            rounded-xl border-2 border-dashed cursor-pointer
            py-10 px-6 text-center select-none
            transition-all duration-300 ease-in-out
            ${isDragging
              ? 'border-[#0f52ba] bg-[#f0f4ff] scale-[1.015]'
              : 'border-slate-300 bg-white hover:border-[#0f52ba] hover:bg-[#f0f4ff]/50'
            }
          `}
        >
          <div className={`
            w-14 h-14 rounded-full flex items-center justify-center
            transition-all duration-300
            ${isDragging ? 'bg-[#0f52ba] scale-110' : 'bg-[#f0f4ff]'}
          `}>
            {isDragging ? (
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 16V7.85l-2.6 2.6L7 9l5-5 5 5-1.4 1.45-2.6-2.6V16h-2zm-5 4q-.825 0-1.412-.587Q4 18.825 4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413Q18.825 20 18 20H6z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-[#0f52ba]" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
              </svg>
            )}
          </div>

          <div>
            <p className={`text-sm font-semibold font-manrope transition-colors duration-300 ${isDragging ? 'text-[#0f52ba]' : 'text-[#191c1e]'}`}>
              {isDragging ? 'Suelta la imagen aquí' : 'Arrastra una foto aquí'}
            </p>
            <p className="text-xs text-[#505f76] font-inter mt-1">
              o <span className="text-[#0f52ba] underline underline-offset-2">haz clic para seleccionar</span>
            </p>
          </div>

          <span className="text-xs text-[#505f76]/70 font-inter">JPG, PNG, WEBP</span>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleInputChange}
          />

          {isDragging && (
            <span className="absolute inset-0 rounded-xl border-2 border-[#0f52ba] animate-ping opacity-20 pointer-events-none" />
          )}
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden border border-slate-200 group">
          <img
            src={preview}
            alt="Preview mascota"
            className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all duration-300 flex items-center justify-center">
            <button
              type="button"
              onClick={handleClear}
              className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 bg-white text-[#191c1e] text-xs font-semibold font-manrope px-4 py-2 rounded-lg shadow-lg hover:bg-red-50 hover:text-red-600 flex items-center gap-2"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
              Cambiar foto
            </button>
          </div>

          <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm text-white text-xs font-inter px-3 py-1 rounded-full max-w-[70%] truncate">
            {fileName}
          </div>

          <div className="absolute top-2 right-2">
            {uploading && (
              <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-inter px-3 py-1.5 rounded-full">
                <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Subiendo...
              </span>
            )}
            {uploadResult && !uploading && (
              <span className="flex items-center gap-1.5 bg-emerald-500 text-white text-xs font-semibold font-inter px-3 py-1.5 rounded-full shadow-md">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                Foto subida · {uploadResult.status}
              </span>
            )}
            {uploadError && !uploading && (
              <span className="flex items-center gap-1.5 bg-red-500 text-white text-xs font-semibold font-inter px-3 py-1.5 rounded-full shadow-md">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
                Error al subir
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
