import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileImage, Archive, FileText, Video, Music, Volume2, Github, ExternalLink, Mail } from 'lucide-react'

const polyglotTypes = [
  {
    id: "pdf-video-image-zip",
    title: "PDF + Video + Image + ZIP",
    description: "Quadruple polyglot combining PDF, video, image, and ZIP files",
    icon: FileText,
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    id: "pdf-video-zip",
    title: "PDF + Video + ZIP",
    description: "Triple polyglot combining PDF documents, MP4 videos, and ZIP archives",
    icon: Music,
    gradient: "from-emerald-500 to-green-600",
  },
  {
    id: "zip-video-image",
    title: "ZIP + Video + Image",
    description: "Triple polyglot combining ZIP archives, video files, and images",
    icon: Archive,
    gradient: "from-yellow-500 to-orange-600",
  },
  {
    id: "image-video-pdf",
    title: "Image + Video + PDF",
    description: "Triple polyglot combining image files, MP4 videos, and PDF documents",
    icon: Music,
    gradient: "from-teal-500 to-cyan-600",
  },
  {
    id: "pdf-image",
    title: "PDF + Image",
    description: "Combine PDF documents with PNG/JPG images",
    icon: FileText,
    gradient: "from-blue-500 to-purple-600",
  },
  {
    id: "image-zip",
    title: "Image + ZIP",
    description: "Merge images with ZIP archives",
    icon: FileImage,
    gradient: "from-green-500 to-teal-600",
  },
  {
    id: "pdf-zip",
    title: "PDF + ZIP",
    description: "Combine PDF files with ZIP archives",
    icon: Archive,
    gradient: "from-orange-500 to-red-600",
  },
  {
    id: "pdf-mp4",
    title: "PDF + Video",
    description: "Combine PDF documents with MP4 video files",
    icon: Video,
    gradient: "from-purple-500 to-pink-600",
  },
  {
    id: "zip-mp4",
    title: "ZIP + Video",
    description: "Merge ZIP archives with MP4 video files",
    icon: Archive,
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    id: "image-mp4",
    title: "Image + Video",
    description: "Combine image files with MP4 videos",
    icon: FileImage,
    gradient: "from-rose-500 to-orange-600",
  },
  {
    id: "pdf-html",
    title: "HTML + PDF",
    description: "Combine HTML files with PDF documents",
    icon: FileText,
    gradient: "from-fuchsia-500 to-pink-600",
  },
  // Commented out for now - advanced feature not implemented in web interface yet
  // {
  //   id: "pdf-image-video-zip-html",
  //   title: "PDF + Image + Video + ZIP + HTML",
  //   description: "Ultimate 5-file polyglot with HTML embedded in MP4 skip atom",
  //   icon: FileText,
  //   gradient: "from-violet-500 to-purple-600",
  // },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Polyglot File Generator</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create files that are valid in multiple formats. Choose your combination and get started in seconds.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {polyglotTypes.map((type) => {
            const IconComponent = type.icon
            return (
              <Card
                key={type.id}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden flex flex-col h-full"
              >
                <div className={`h-2 bg-gradient-to-r ${type.gradient}`} />
                <CardHeader className="text-center pb-4 flex-grow">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${type.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">{type.title}</CardTitle>
                  <CardDescription className="text-gray-600 text-base">{type.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0 mt-auto">
                  <Link href={`/create/${type.id}`} className="block">
                    <Button
                      className={`w-full bg-gradient-to-r ${type.gradient} hover:opacity-90 text-white font-semibold py-3 text-lg group-hover:scale-105 transition-transform duration-300`}
                      size="lg"
                    >
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Features Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose Polyglot Files?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multi-Format</h3>
              <p className="text-gray-600">Files that work in multiple applications and contexts</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Archive className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Space Efficient</h3>
              <p className="text-gray-600">One downloadable file instead of multiple attachments</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileImage className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
              <p className="text-gray-600">Simple drag-and-drop interface for quick file generation</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-3">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span>© {new Date().getFullYear()} Made by</span>
              <Link
                href="https://www.lalithkothuru.com/?utm_source=glotfiles-website&utm_medium=referral&utm_campaign=glotfiles-project"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 transition-colors"
              >
                Lalith Kothuru
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="https://github.com/LALITH0110/glotfiles"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </Link>
              <span className="text-gray-400">|</span>
              <Link
                href="mailto:lalith.kothuru@gmail.com?subject=[GlotFiles]%20"
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Contact Me
              </Link>
              <span className="text-gray-400">|</span>
              <Link href="/privacy-terms" className="hover:text-gray-900 transition-colors">
                Privacy & Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
