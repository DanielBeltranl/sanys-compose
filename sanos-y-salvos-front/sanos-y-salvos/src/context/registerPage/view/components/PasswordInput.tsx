import { useState } from 'react'
import { inputClassName } from '../../../commons/components/formField/FormField'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export function PasswordInput({ ...props }: Props) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="relative">
      <input
        {...props}
        type={visible ? 'text' : 'password'}
        className={`${inputClassName} pr-11`}
      />
      <button
        type="button"
        onClick={() => setVisible(v => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0f52ba] transition-colors"
        tabIndex={-1}
      >
        {visible ? (
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
            <path d="M2 5.27 3.28 4 20 20.72 18.73 22l-3.08-3.08c-1.15.38-2.37.58-3.65.58-5 0-9.27-3.11-11-7.5.69-1.76 1.79-3.31 3.19-4.54L2 5.27zM12 4.5c5 0 9.27 3.11 11 7.5a11.79 11.79 0 0 1-4 5.19l-1.42-1.43A9.862 9.862 0 0 0 20.82 12 9.821 9.821 0 0 0 12 6.5c-.88 0-1.74.13-2.55.37L7.97 5.38A11.816 11.816 0 0 1 12 4.5zm0 3a4.5 4.5 0 0 1 4.5 4.5c0 .65-.14 1.27-.38 1.83l-1.54-1.54A2.503 2.503 0 0 0 12 9.5c-.17 0-.34.02-.5.05L9.97 8.02A4.476 4.476 0 0 1 12 7.5zm-4.14.97 1.5 1.5A2.503 2.503 0 0 0 9.5 12c0 1.38 1.12 2.5 2.5 2.5.34 0 .67-.07.97-.18l1.5 1.5A4.465 4.465 0 0 1 12 16.5 4.5 4.5 0 0 1 7.5 12c0-.82.22-1.58.61-2.24l-.25-.29z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
          </svg>
        )}
      </button>
    </div>
  )
}
