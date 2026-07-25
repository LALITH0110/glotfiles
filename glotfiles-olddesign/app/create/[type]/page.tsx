import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Clock } from 'lucide-react'
import PolyglotCreator from "@/components/polyglot-creator"

const polyglotConfigs = {
  "pdf-image": {
    title: "PDF + Image Polyglot",
    description: "Combine a PDF document with a PNG or JPG image",
    file1: { label: "PDF File", accept: ".pdf", type: "PDF" },
    file2: { label: "Image File", accept: ".png,.jpg,.jpeg", type: "Image" },
  },
  "image-zip": {
    title: "Image + ZIP Polyglot",
    description: "Merge an image file with a ZIP archive",
    file1: { label: "Image File", accept: ".png,.jpg,.jpeg", type: "Image" },
    file2: { label: "ZIP File", accept: ".zip", type: "ZIP" },
  },
  "pdf-zip": {
    title: "PDF + ZIP Polyglot",
    description: "Combine a PDF document with a ZIP archive",
    file1: { label: "PDF File", accept: ".pdf", type: "PDF" },
    file2: { label: "ZIP File", accept: ".zip", type: "ZIP" },
  },
  "pdf-mp4": {
    title: "PDF + Video Polyglot",
    description: "Combine a PDF document with an MP4 video file",
    file1: { label: "PDF File", accept: ".pdf", type: "PDF" },
    file2: { label: "Video File", accept: ".mp4,.mov,.avi", type: "Video" },
  },
  "pdf-video-image-zip": {
    title: "PDF + Video + Image + ZIP Polyglot",
    description: "Quadruple polyglot combining PDF, video, image, and ZIP files",
    file1: { label: "PDF File", accept: ".pdf", type: "PDF" },
    file2: { label: "Video File", accept: ".mp4,.mov,.avi", type: "Video" },
    file3: { label: "Image File", accept: ".png,.jpg,.jpeg", type: "Image" },
    file4: { label: "ZIP File", accept: ".zip", type: "ZIP" },
  },
  // Commented out for now - advanced feature not implemented in web interface yet
  // "pdf-image-video-zip-html": {
  //   title: "PDF + Image + Video + ZIP + HTML Polyglot",
  //   description: "Ultimate 5-file polyglot with HTML embedded in MP4 skip atom",
  //   file1: { label: "PDF File", accept: ".pdf", type: "PDF" },
  //   file2: { label: "Image File", accept: ".png,.jpg,.jpeg", type: "Image" },
  //   file3: { label: "Video File", accept: ".mp4,.mov,.avi", type: "Video" },
  //   file4: { label: "ZIP File", accept: ".zip", type: "ZIP" },
  //   file5: { label: "HTML File", accept: ".html,.htm", type: "HTML" },
  // },
  "zip-mp4": {
    title: "ZIP + Video Polyglot",
    description: "Merge a ZIP archive with an MP4 video file",
    file1: { label: "ZIP File", accept: ".zip", type: "ZIP" },
    file2: { label: "Video File", accept: ".mp4,.mov,.avi", type: "Video" },
  },
  "image-mp4": {
    title: "Image + Video Polyglot",
    description: "Combine an image file with an MP4 video",
    file1: { label: "Image File", accept: ".png,.jpg,.jpeg", type: "Image" },
    file2: { label: "Video File", accept: ".mp4,.mov,.avi", type: "Video" },
  },
  "pdf-video-zip": {
    title: "PDF + Video + ZIP Polyglot",
    description: "Combine a PDF document, MP4 video, and ZIP archive",
    file1: { label: "PDF File", accept: ".pdf", type: "PDF" },
    file2: { label: "Video File", accept: ".mp4,.mov,.avi", type: "Video" },
    file3: { label: "ZIP File", accept: ".zip", type: "ZIP" },
  },
  "zip-video-image": {
    title: "ZIP + Video + Image Polyglot",
    description: "Triple polyglot combining ZIP archives, video files, and images",
    file1: { label: "ZIP File", accept: ".zip", type: "ZIP" },
    file2: { label: "Video File", accept: ".mp4,.mov,.avi", type: "Video" },
    file3: { label: "Image File", accept: ".png,.jpg,.jpeg", type: "Image" },
  },
  "image-video-pdf": {
    title: "Image + Video + PDF Polyglot",
    description: "Combine an image file, MP4 video, and PDF document",
    file1: { label: "Image File", accept: ".png,.jpg,.jpeg", type: "Image" },
    file2: { label: "Video File", accept: ".mp4,.mov,.avi", type: "Video" },
    file3: { label: "PDF File", accept: ".pdf", type: "PDF" },
  },
  "pdf-html": {
    title: "HTML + PDF Polyglot",
    description: "Combine a PDF document with an HTML file",
    file1: { label: "PDF File", accept: ".pdf", type: "PDF" },
    file2: { label: "HTML File", accept: ".html,.htm", type: "HTML" },
  },
}

interface PageProps {
  params: Promise<{ type: string }>
}

export default async function CreatePage({ params }: PageProps) {
  const { type } = await params
  const config = polyglotConfigs[type as keyof typeof polyglotConfigs]

  if (!config) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="secondary" size="sm" className="gap-2 bg-white/80 hover:bg-white border shadow-sm">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{config.title}</h1>
              <p className="text-lg text-gray-600">{config.description}</p>
            </div>
            <div className="w-24" /> {/* Spacer to balance the layout */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Coming Soon UI - uncomment when needed
        {type === "pdf-html" ? (
          <Card className="max-w-2xl mx-auto border-0 shadow-lg">
            <CardContent className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-600 flex items-center justify-center">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon</h2>
              <p className="text-lg text-gray-600 mb-8">
                We're working on bringing you HTML + PDF polyglot support. Stay tuned!
              </p>
              <Link href="/">
                <Button variant="outline" size="lg">
                  Back to Home
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <PolyglotCreator config={config} type={type} />
        )}
        */}
        <PolyglotCreator config={config} type={type} />
      </main>
    </div>
  )
}
