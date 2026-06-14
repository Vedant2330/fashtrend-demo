'use client'

import { useState, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { Upload, X } from 'lucide-react'

interface PrintUploadProps {
  printFile: File | null
  onFileChange: (file: File | null) => void
  onRemove: () => void
  className?: string
}

export function PrintUpload({ printFile, onFileChange, onRemove, className }: PrintUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = useCallback((file: File | null) => {
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB')
        return
      }
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    } else {
      setPreviewUrl(null)
    }
    onFileChange(file)
  }, [onFileChange])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }, [handleFileSelect])

  const clearFile = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(null)
    onRemove()
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    handleFileSelect(file)
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-cream">Custom Print</h3>
        <span className="text-xs text-cream/50">PNG, JPG, WebP • Max 10MB</span>
      </div>

      <div
        className={cn(
          'relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200',
          'bg-white/5 backdrop-blur-sm',
          dragActive && 'border-electric-blue bg-electric-blue/10',
          !dragActive && 'border-gray-600 hover:border-gray-500'
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {printFile && previewUrl ? (
          <div className="relative">
            <div className="aspect-square max-h-64 overflow-hidden rounded-xl">
              <img 
                src={previewUrl} 
                alt="Print preview" 
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={clearFile}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500/90 text-white flex items-center justify-center hover:bg-red-500 transition-colors"
              aria-label="Remove print"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="mt-4 flex items-center justify-center gap-2 text-cream/70">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm">Print uploaded successfully</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Upload print design"
            />
            <div className="flex flex-col items-center gap-4">
              <div className={cn(
                'w-16 h-16 rounded-full flex items-center justify-center mx-auto transition-colors',
                dragActive ? 'bg-electric-blue/20 text-electric-blue' : 'bg-white/5 text-cream/50'
              )}>
                <Upload className="w-8 h-8" />
              </div>
              <div className="text-center">
                <p className="text-cream font-medium">Drag &amp; drop your design</p>
                <p className="text-cream/50 text-sm">or click to browse</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {previewUrl && (
        <p className="text-center text-xs text-cream/40">
          Your print will be applied to the selected placement areas on the 3D model
        </p>
      )}
    </div>
  )
}