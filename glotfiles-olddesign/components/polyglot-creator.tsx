"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Upload, Download, CheckCircle, FileText, FileImage, Archive, Video, Music, AlertTriangle } from 'lucide-react'
import FileUploadCard from "@/components/file-upload-card"
import { incrementPolyglotCounter } from "@/lib/firebase"

// Conservative file size limits (in bytes)
const FILE_SIZE_LIMITS = {
  PDF: 50 * 1024 * 1024,      // 50MB
  Image: 25 * 1024 * 1024,    // 25MB  
  Video: 100 * 1024 * 1024,   // 100MB (updated from 200MB)
  ZIP: 100 * 1024 * 1024,     // 100MB
  HTML: 1 * 1024 * 1024,      // 1MB
  Audio: 50 * 1024 * 1024,    // 50MB (for any future audio types)
}

// Helper function to format file size
const formatFileSize = (bytes: number): string => {
  if (bytes >= 1024 * 1024) {
    return `${Math.round(bytes / (1024 * 1024))}MB`
  } else if (bytes >= 1024) {
    return `${Math.round(bytes / 1024)}KB`
  }
  return `${bytes}B`
}

// Helper function to get file size limit for a file type
const getFileSizeLimit = (fileType: string): number => {
  // Normalize the file type to match our FILE_SIZE_LIMITS keys exactly
  const normalizedType = fileType.charAt(0).toUpperCase() + fileType.slice(1).toLowerCase()
  const limit = FILE_SIZE_LIMITS[normalizedType as keyof typeof FILE_SIZE_LIMITS]
  
  // Debug logging to help troubleshoot
  console.log(`Getting size limit for fileType: "${fileType}" -> "${normalizedType}", limit: ${limit ? formatFileSize(limit) : 'not found'}`)
  
  return limit || 25 * 1024 * 1024 // Default to 25MB
}

// Helper function to validate file size
const validateFileSize = (file: File, fileType: string): { valid: boolean; message?: string } => {
  const limit = getFileSizeLimit(fileType)
  if (file.size > limit) {
    return {
      valid: false,
      message: `${fileType} file is too large (${formatFileSize(file.size)}). Maximum allowed size is ${formatFileSize(limit)}.`
    }
  }
  return { valid: true }
}

interface PolyglotConfig {
  title: string
  description: string
  file1: { label: string; accept: string; type: string }
  file2: { label: string; accept: string; type: string }
  file3?: { label: string; accept: string; type: string }
  file4?: { label: string; accept: string; type: string }
  file5?: { label: string; accept: string; type: string }
}

interface PolyglotCreatorProps {
  config: PolyglotConfig
  type: string
}

export default function PolyglotCreator({ config, type }: PolyglotCreatorProps) {
  const [file1, setFile1] = useState<File | null>(null)
  const [file2, setFile2] = useState<File | null>(null)
  const [file3, setFile3] = useState<File | null>(null)
  const [file4, setFile4] = useState<File | null>(null)
  const [file5, setFile5] = useState<File | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [downloadFilename, setDownloadFilename] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [showWarningModal, setShowWarningModal] = useState(false)
  const [showLongWaitMessage, setShowLongWaitMessage] = useState(false)

  // Wrapper functions for file selection with validation
  const handleFileSelect = (
    file: File | null, 
    fileType: string, 
    setter: (file: File | null) => void
  ) => {
    setErrorMessage("") // Clear any existing errors
    
    if (!file) {
      setter(null)
      return
    }
    
    const validation = validateFileSize(file, fileType)
    if (!validation.valid) {
      setErrorMessage(validation.message!)
      return
    }
    
    setter(file)
  }

  const canGenerate = file1 && file2 && (!config.file3 || file3) && (!config.file4 || file4) && (!config.file5 || file5) && !isGenerating && !errorMessage

  const handleGenerate = async () => {
    if (!canGenerate) return

    setIsGenerating(true)
    setErrorMessage("") // Clear any existing errors
    setShowLongWaitMessage(false)

    // Show message after 5 seconds if still generating
    const longWaitTimer = setTimeout(() => {
      setShowLongWaitMessage(true)
    }, 5000)

    try {
      const formData = new FormData()
      formData.append("file1", file1)
      formData.append("file2", file2)
      if (file3) formData.append("file3", file3)
      if (file4) formData.append("file4", file4)
      if (file5) formData.append("file5", file5)
      formData.append("type", type)

      let response
      try {
        response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/generate-polyglot`, {
          method: 'POST',
          body: formData
        })
      } catch (fetchError) {
        // Network errors, CORS errors, server unreachable, etc.
        throw new Error("SERVICE_UNAVAILABLE")
      }

      if (!response.ok) {
        if (response.status >= 500) {
          // Server errors (5xx)
          throw new Error("SERVICE_UNAVAILABLE")
        } else {
          // Client errors (4xx) - try to get specific error message
          try {
            const errorData = await response.json()
            throw new Error(errorData.detail || 'Failed to generate polyglot file')
          } catch (jsonError) {
            throw new Error('Failed to generate polyglot file')
          }
        }
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setDownloadUrl(url)

      // Get filename from response headers
      const contentDisposition = response.headers.get('content-disposition')
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/)
        if (filenameMatch) {
          setDownloadFilename(filenameMatch[1])
        }
      }

      // Increment the global counter after successful generation
      try {
        await incrementPolyglotCounter()
        console.log(`Global counter incremented for successful ${type} polyglot generation`)
      } catch (counterError) {
        console.error("Error incrementing counter:", counterError)
        // Don't fail the generation process if counter fails
      }
    } catch (error) {
      console.error("Error generating polyglot:", error)
      
      // Handle different types of errors
      if (error instanceof Error && error.message === "SERVICE_UNAVAILABLE") {
        // Network/connection errors or server errors (5xx)
        setErrorMessage("Our servers are currently experiencing a high volume of requests.\nPlease try again in a few minutes.")
      } else if (error instanceof Error) {
        // Server responded with a specific error message
        setErrorMessage(error.message)
      } else {
        // Generic fallback
        setErrorMessage("Failed to generate polyglot file. Please try again.")
      }
    } finally {
      clearTimeout(longWaitTimer)
      setIsGenerating(false)
      setShowLongWaitMessage(false)
    }
  }

  const handleDownload = () => {
    setShowWarningModal(true)
  }

  const proceedWithDownload = () => {
    if (downloadUrl) {
      const a = document.createElement("a")
      a.href = downloadUrl
      a.download = downloadFilename || `polyglot-${type}-${Date.now()}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
    setShowWarningModal(false)
  }

  const getIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case "pdf":
        return FileText
      case "image":
        return FileImage
      case "zip":
        return Archive
      case "video":
        return Video
      case "audio":
        return Music
      case "html":
        return FileText
      default:
        return Upload
    }
  }

  return (
    <div className={`mx-auto ${type === 'pdf-video-image-zip' ? 'max-w-7xl' : 'max-w-4xl'}`}>
      {/* Upload Section */}
      <div className={`grid mb-12 ${
        config.file5 ? 'gap-8 md:grid-cols-5' : 
        config.file4 ? (type === 'pdf-video-image-zip' ? 'gap-10 md:grid-cols-2 lg:grid-cols-4' : 'gap-8 md:grid-cols-4') : 
        config.file3 ? 'gap-8 md:grid-cols-3' : 
        'gap-8 md:grid-cols-2'
      }`}>
        <FileUploadCard
          label={config.file1.label}
          accept={config.file1.accept}
          file={file1}
          onFileSelect={(file) => handleFileSelect(file, config.file1.type, setFile1)}
          icon={getIcon(config.file1.type)}
        />
        <FileUploadCard
          label={config.file2.label}
          accept={config.file2.accept}
          file={file2}
          onFileSelect={(file) => handleFileSelect(file, config.file2.type, setFile2)}
          icon={getIcon(config.file2.type)}
        />
        {config.file3 && (
          <FileUploadCard
            label={config.file3.label}
            accept={config.file3.accept}
            file={file3}
            onFileSelect={(file) => handleFileSelect(file, config.file3?.type || '', setFile3)}
            icon={getIcon(config.file3.type)}
          />
        )}
        {config.file4 && (
          <FileUploadCard
            label={config.file4.label}
            accept={config.file4.accept}
            file={file4}
            onFileSelect={(file) => handleFileSelect(file, config.file4?.type || '', setFile4)}
            icon={getIcon(config.file4.type)}
          />
        )}
        {config.file5 && (
          <FileUploadCard
            label={config.file5.label}
            accept={config.file5.accept}
            file={file5}
            onFileSelect={(file) => handleFileSelect(file, config.file5?.type || '', setFile5)}
            icon={getIcon(config.file5.type)}
          />
        )}
      </div>

      {/* Generate Section */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Generate Polyglot File</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          {/* Error Message Display */}
          {errorMessage && (
            <div className="flex items-center justify-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-sm font-medium">{errorMessage}</span>
            </div>
          )}

          {/* Long Wait Info Message */}
          {showLongWaitMessage && isGenerating && (
            <div className="flex items-center justify-center gap-2 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-700">
              <span className="text-sm font-medium">Hang tight! This usually takes 1-2 minutes. We're crafting your polyglot file with care.</span>
            </div>
          )}
          
          {!downloadUrl ? (
            <Button
              onClick={handleGenerate}
              disabled={!canGenerate}
              size="lg"
              className="px-12 py-3 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5 mr-2" />
                  Generate Polyglot
                </>
              )}
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-green-600">
                <CheckCircle className="w-6 h-6" />
                <span className="text-lg font-semibold">Polyglot file generated successfully!</span>
              </div>
              <Button
                onClick={handleDownload}
                size="lg"
                className="px-12 py-3 text-lg font-semibold bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700"
              >
                <Download className="w-5 h-5 mr-2" />
                Download File
              </Button>
              
              {/* General usage instructions for all polyglots */}
              <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <h4 className="font-semibold text-amber-800 mb-2">How to use polyglot files:</h4>
                <div className="text-sm text-amber-700 space-y-2 text-left">
                  <p>• To access different file types, simply rename the file extension (e.g., .zip, .mp4, .jpg, etc.).</p>
                  <p>• If your computer can't open .zip files, try using the command line: <code className="bg-amber-100 px-1 rounded">unzip filename.zip</code></p>
                  <p>• .mp4 files may not play in some video players, but work fine with popular ones like VLC or QuickTime Player.</p>
                  <p>• These files are polyglots and may behave differently depending on the software used to open them.</p>
                </div>
              </div>
            </div>
          )}

          {!canGenerate && !isGenerating && (
            <div className="space-y-2">
              <p className="text-gray-500 text-sm">
                Please upload {config.file4 ? 'all four files' : config.file3 ? 'all three files' : 'both files'} to generate your polyglot file
              </p>
              <div className="text-xs text-gray-400 space-y-1">
                <p><strong>File size limits:</strong></p>
                <p>PDF: 50MB • Image: 25MB • Video: 100MB • ZIP: 100MB • HTML: 1MB</p>
              </div>
            </div>
          )}

          {/* Instructions for specific polyglot types */}
          {(type === 'pdf-zip' || type === 'pdf-image' || type === 'image-mp4') && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">📋 How to use your polyglot file:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                {type === 'pdf-zip' && (
                  <>
                    <li>• <strong>As PDF:</strong> Rename to <code>.pdf</code> extension and open in any PDF viewer</li>
                    <li>• <strong>As ZIP:</strong> Rename to <code>.zip</code> extension and use Terminal: <code>unzip filename.zip</code></li>
                    <li>• <strong>Note:</strong> Use Terminal for ZIP extraction - macOS Archive Utility may not work</li>
                  </>
                )}
                {type === 'pdf-image' && (
                  <>
                    <li>• <strong>As Image:</strong> Rename to <code>.png</code> or <code>.jpg</code> extension and open in any image viewer</li>
                    <li>• <strong>As PDF:</strong> Rename to <code>.pdf</code> extension and open in any PDF viewer</li>
                    <li>• <strong>Note:</strong> The file works as both image and PDF depending on the extension</li>
                  </>
                )}
                {type === 'image-mp4' && (
                  <>
                    <li>• <strong>As Video:</strong> Rename to <code>.mp4</code> extension and open in any video player</li>
                    <li>• <strong>As Image:</strong> Rename to <code>.ico</code> extension and open in any image viewer</li>
                    <li>• <strong>Note:</strong> Both formats work simultaneously - true polyglot!</li>
                  </>
                )}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Warning Modal */}
      <Dialog open={showWarningModal} onOpenChange={setShowWarningModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Important Security Warning
            </DialogTitle>
            <DialogDescription className="text-left space-y-4 pt-4">
              <p>
                These files may be interpreted differently by different programs and can potentially be used to bypass filters or security mechanisms.
              </p>
              <p className="font-semibold">
                By using this tool, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use it only for educational, research, or testing purposes.</li>
                <li>Not use the output for malicious purposes, phishing, or exploiting vulnerabilities.</li>
                <li>Take full responsibility for any consequences of using the generated files.</li>
              </ul>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-4 sm:gap-4">
            <Button variant="outline" onClick={() => setShowWarningModal(false)}>
              Cancel
            </Button>
            <Button onClick={proceedWithDownload} className="bg-orange-500 hover:bg-orange-600">
              I Understand, Proceed
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
