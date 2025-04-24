import ReportGenerator from "@/components/dashboard/report-generator"

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">報告生成</h1>
      </div>

      <ReportGenerator />
    </div>
  )
}

