import CreateShell from "@/components/create/create-shell"

const config = {
  title: "Image + ZIP Polyglot",
  description: "Merge an image file with a ZIP archive",
  file1: { label: "Image File", accept: ".png,.jpg,.jpeg", type: "Image" },
  file2: { label: "ZIP File", accept: ".zip", type: "ZIP" },
}

export default function CreateImageZipPage() {
  return <CreateShell config={config} type="image-zip" />
}
