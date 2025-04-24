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
        <TabsList>
          <TabsTrigger value="models">模型列表</TabsTrigger>
          <TabsTrigger value="settings">模型設定</TabsTrigger>
        </TabsList>

        <TabsContent value="models">
          <ModelManagement />
        </TabsContent>


        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>模型設定</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center text-muted-foreground">模型設定內容將顯示在這裡</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

