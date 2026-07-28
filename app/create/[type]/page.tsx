import type { Metadata } from "next"
import { notFound } from "next/navigation"
import CreateShell from "@/components/create/create-shell"
import { SITE_URL } from "@/app/layout"

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

/** Pre-render every combination at build time instead of on first request. */
export function generateStaticParams() {
  return Object.keys(polyglotConfigs).map((type) => ({ type }))
}

/**
 * Each combination gets its own title, description and canonical. Previously all
 * of these pages inherited the root layout's metadata, so every one of them
 * shipped an identical <title> and description, leaving Google no way to tell
 * them apart. The strings already existed in polyglotConfigs; they just weren't
 * wired up.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type } = await params
  const config = polyglotConfigs[type as keyof typeof polyglotConfigs]

  if (!config) {
    return { title: 'Combination not found' }
  }

  const url = `/create/${type}`
  // The layout template appends " · glotfiles", so keep the raw combo title here.
  const title = config.title
  const description = `${config.description}. Free, in your browser, with no account, no installs, and your files are never stored.`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      siteName: 'glotfiles',
      url,
      title: `${title} · glotfiles`,
      description,
      // Declaring `openGraph` on a page stops Next inheriting the root
      // app/opengraph-image.tsx, so point at it explicitly.
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: `${title} · glotfiles` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} · glotfiles`,
      description,
      images: ['/opengraph-image'],
    },
  }
}

export default async function CreatePage({ params }: PageProps) {
  const { type } = await params
  const config = polyglotConfigs[type as keyof typeof polyglotConfigs]

  if (!config) {
    notFound()
  }

  /* Coming Soon UI - uncomment when needed
  if (type === "pdf-html") {
    return <ComingSoon title="HTML + PDF" />
  }
  */

  const pageUrl = `${SITE_URL}/create/${type}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: config.title, item: pageUrl },
        ],
      },
      {
        '@type': 'WebApplication',
        '@id': `${pageUrl}#software`,
        name: config.title,
        url: pageUrl,
        description: config.description,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any (runs entirely in the browser)',
        isPartOf: { '@id': `${SITE_URL}/#software` },
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CreateShell config={config} type={type} />
    </>
  )
}
