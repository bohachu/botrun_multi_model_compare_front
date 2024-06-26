import { DownloadData } from "@/types"

type DownloadProps = {
  data: Array<DownloadData>
}

export default function Download({ data }: DownloadProps) {
  const handleDownload = () => {
    const header = "使用者提問,模型,回答,使用者預期的答案,可用性,真實性,完整性,即時性\n"

    const escapeCsvField = (field: string): string => {
      if (typeof field !== "string") return field
      return `"${field.replace(/"/g, '""')}"`
    }

    const csvContent = data
      .map(
        data =>
          `${escapeCsvField(data.question)},${escapeCsvField(data.model)},${escapeCsvField(
            data.answer
          )},,${escapeCsvField(data.availability.toString())},${escapeCsvField(
            data.authenticity.toString()
          )},${escapeCsvField(data.integrity.toString())},${escapeCsvField(
            data.timeliness.toString()
          )}`
      )
      .join("\n")

    const BOM = "\uFEFF"
    const blob = new Blob([BOM + header + csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "answers.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="fn-bar">
      <button id="btn-save" className="br-btn large" onClick={handleDownload}>
        <i className="icon icon-31"></i>
        <span>下載CSV</span>
      </button>
    </div>
  )
}
