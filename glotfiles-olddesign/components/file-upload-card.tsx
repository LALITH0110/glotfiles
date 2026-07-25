"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, X, CheckCircle, type LucideIcon } from "lucide-react"

interface FileUploadCardProps {
  label: string
  accept: string
  file: File | null
  onFileSelect: (file: File | null) => void
  icon: LucideIcon
}

export default function FileUploadCard({ label, accept, file, onFileSelect, icon: Icon }: FileUploadCardProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      onFileSelect(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      onFileSelect(files[0])
    }
  }

  const handleBrowse = () => {
    fileInputRef.current?.click()
  }

  const handleRemove = () => {
    onFileSelect(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <Card
      className={`border-2 border-dashed transition-all duration-300 ${
        isDragOver
          ? "border-blue-400 bg-blue-50"
          : file
            ? "border-green-400 bg-green-50"
            : "border-gray-300 hover:border-gray-400"
      }`}
    >
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-lg font-semibold flex items-center justify-center gap-2">
          <Icon className="w-5 h-5" />
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`relative p-8 text-center rounded-lg transition-colors ${
            isDragOver ? "bg-blue-100" : "bg-gray-50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input ref={fileInputRef} type="file" accept={accept} onChange={handleFileSelect} className="hidden" />

          {!file ? (
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-700 mb-2">Drop your file here</p>
                <p className="text-sm text-gray-500 mb-4">or click to browse</p>
                <Button
                  onClick={handleBrowse}
                  variant="outline"
                  className="border-2 border-dashed border-gray-300 hover:border-gray-400 bg-transparent"
                >
                  Browse Files
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">{file.name}</p>
                <p className="text-sm text-gray-500 mb-4">{formatFileSize(file.size)}</p>
                <div className="flex gap-2 justify-center">
                  <Button onClick={handleBrowse} variant="outline" size="sm">
                    Replace
                  </Button>
                  <Button onClick={handleRemove} variant="outline" size="sm">
                    <X className="w-4 h-4 mr-1" />
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
