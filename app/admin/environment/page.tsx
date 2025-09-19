import EnvironmentSettings from "@/components/admin/environment-settings"

export default function EnvironmentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">環境變數管理</h1>
      </div>
      <EnvironmentSettings />
    </div>
  )
}
