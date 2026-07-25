import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import PolyglotCreator from "@/components/polyglot-creator"

const config = {
  title: "Image + ZIP Polyglot",
  description: "Merge an image file with a ZIP archive",
  file1: { label: "Image File", accept: ".png,.jpg,.jpeg", type: "Image" },
  file2: { label: "ZIP File", accept: ".zip", type: "ZIP" },
}

export default function CreateImageZipPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{config.title}</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{config.description}</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <PolyglotCreator config={config} type="image-zip" />
      </main>
    </div>
  )
} 