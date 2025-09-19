import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ModelManagement from "@/components/admin/model-management"

export default function ModelsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">模型管理</h1>
      </div>

      <Tabs defaultValue="models">
        <TabsContent value="models">
          <ModelManagement />
        </TabsContent>
        <TabsContent value="settings">
        </TabsContent>
      </Tabs>
    </div>
  )
}
