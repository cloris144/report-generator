import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RagManagement from "@/components/admin/rag-management"

export default function RagPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">知識圖譜管理</h1>
      </div>
      <RagManagement />
    </div>
  )
}
