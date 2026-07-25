import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield, FileText, Clock, Lock, Users, AlertTriangle } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy & Terms of Service - Polyglot File Generator',
  description: 'Privacy policy and terms of service for the Polyglot File Generator tool',
}

export default function PrivacyTermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy & Terms of Service</h1>
              <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-8">
          
          {/* Privacy Policy Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Shield className="w-6 h-6 text-blue-600" />
                Privacy Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-gray-700 leading-relaxed">
                  This Privacy Policy explains how we collect, use, and protect your information when you use our Polyglot File Generator service. We are committed to protecting your privacy and being transparent about our data practices.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Information We Collect
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Files You Upload</h4>
                    <p className="text-gray-700">
                      We process the files (PDFs, videos, images, ZIPs) that you upload to create polyglot files. <strong>We do not store these files at all</strong> - they are processed in memory only to generate your polyglot file and then immediately discarded.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Usage Data</h4>
                    <p className="text-gray-700">
                      We only collect basic analytics data through Google Analytics to track how many people have generated polyglot files. This includes anonymous usage statistics but no personal information or file content.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">How We Use Your Information</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>To provide the core functionality of generating polyglot files</li>
                  <li>To track basic usage statistics (number of files generated) via Google Analytics</li>
                  <li>To monitor and improve the performance and security of our service</li>
                  <li>To ensure the service operates correctly and securely</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  Data Storage, Retention, and Deletion
                </h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-semibold mb-2">🔒 Your Privacy is Our Priority</p>
                  <p className="text-gray-700">
                    <strong>We do not store your files at all.</strong> All uploaded files are processed in memory only to create your polyglot file and are discarded from our servers within a few seconds of processing to protect your privacy. We only keep basic analytics data (number of files generated) via Google Analytics, temporary processing logs for security and debugging purposes, which are deleted within 24 hours.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  Data Sharing
                </h3>
                <p className="text-gray-700">
                  We do not sell, trade, or share any of your files with any third parties. Since we don't store your files, there is nothing to share. We only share anonymous usage statistics (number of files generated) with Google Analytics, which cannot be used to identify you or your files.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-red-600" />
                  Security
                </h3>
                <p className="text-gray-700">
                  We implement reasonable security measures to protect your data during the upload and processing period. This includes secure file transfer protocols, temporary processing environments, and automatic data deletion policies.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Terms of Service Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <FileText className="w-6 h-6 text-green-600" />
                Terms of Service
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-gray-700 leading-relaxed">
                  These Terms of Service ("Terms") govern your use of our Polyglot File Generator service. By using our service, you agree to be bound by these Terms.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Acceptance of Terms</h3>
                <p className="text-gray-700">
                  By accessing or using our Polyglot File Generator service, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Description of Service</h3>
                <p className="text-gray-700">
                  Our service allows users to upload various file types (PDFs, videos, images, ZIP archives) to generate a single "polyglot" file that is valid in multiple formats simultaneously. This is a free service provided for legitimate use cases.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  User Responsibilities and Prohibited Conduct
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">User Responsibilities</h4>
                    <p className="text-gray-700">
                      You are solely responsible for the content you upload and the files you generate. You must ensure that you have the legal right to process and combine the files you upload.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Prohibited Content</h4>
                    <p className="text-gray-700 mb-2">You may not upload any content that is:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                      <li>Illegal, malicious, or contains viruses, malware, or other harmful code</li>
                      <li>Infringes on copyright, trademark, or other intellectual property rights</li>
                      <li>Pornographic, sexually explicit, or inappropriate</li>
                      <li>Hateful, discriminatory, or promotes violence</li>
                      <li>Spam, unsolicited commercial content, or deceptive</li>
                      <li>Violates any applicable laws or regulations</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Intellectual Property</h3>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <strong>Your Content:</strong> You retain all ownership rights to the content you upload. By uploading files, you grant us a temporary, limited license solely to process the files and provide the service.
                  </p>
                  <p className="text-gray-700">
                    <strong>Our Service:</strong> The Polyglot File Generator service, including its design, functionality, and underlying technology, is protected by intellectual property laws.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Disclaimer of Warranties</h3>
                <p className="text-gray-700">
                  Our service is provided "as is" without any warranties, express or implied. We do not guarantee that the service will be error-free, secure, or always available. We disclaim all warranties including merchantability, fitness for a particular purpose, and non-infringement.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Limitation of Liability</h3>
                <p className="text-gray-700">
                  To the maximum extent permitted by law, we shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages, including but not limited to data loss, business interruption, or loss of profits, arising from your use of our service.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Termination of Use</h3>
                <p className="text-gray-700">
                  We reserve the right to suspend or terminate access to our service for any user who violates these Terms or engages in prohibited conduct. We may also modify or discontinue the service at any time with reasonable notice.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Changes to Terms</h3>
                <p className="text-gray-700">
                  We may update these Terms from time to time. We will notify users of significant changes by updating the "Last updated" date at the top of this page. Your continued use of the service after changes constitutes acceptance of the new Terms.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Contact Information</h3>
                <p className="text-gray-700">
                  If you have any questions about these Terms or our Privacy Policy, please contact us at{" "}
                  <a 
                    href="mailto:lalith.kothuru@gmail.com?subject=[GlotFiles]%20Privacy%20or%20Terms%20Question"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    lalith.kothuru@gmail.com
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Back to Home Button */}
          <div className="text-center pt-8">
            <Link href="/">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white">
                Back to Polyglot Generator
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
