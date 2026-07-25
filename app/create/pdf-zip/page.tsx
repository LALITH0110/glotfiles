import CreateShell from "@/components/create/create-shell"

const config = {
  title: "PDF + ZIP Polyglot",
  description: "Combine a PDF document with a ZIP archive",
  file1: { label: "PDF File", accept: ".pdf", type: "PDF" },
  file2: { label: "ZIP File", accept: ".zip", type: "ZIP" },
}

export default function CreatePdfZipPage() {
  return <CreateShell config={config} type="pdf-zip" />
}
