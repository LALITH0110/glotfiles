import CreateShell from "@/components/create/create-shell"

const config = {
  title: "PDF + Image Polyglot",
  description: "Combine a PDF document with a PNG or JPG image",
  file1: { label: "PDF File", accept: ".pdf", type: "PDF" },
  file2: { label: "Image File", accept: ".png,.jpg,.jpeg", type: "Image" },
}

export default function CreatePdfImagePage() {
  return <CreateShell config={config} type="pdf-image" />
}
