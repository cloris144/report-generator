import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RagManagement from "@/components/admin/rag-management"

export default function RagPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">知識圖譜管理</h1>
      </div>

      <Tabs defaultValue="graph">
        <TabsList>
          <TabsTrigger value="graph">知識圖譜</TabsTrigger>
          <TabsTrigger value="sources">知識來源</TabsTrigger>
          <TabsTrigger value="integration">模型整合</TabsTrigger>
          <TabsTrigger value="analytics">效能分析</TabsTrigger>
        </TabsList>

        <TabsContent value="graph">
          <RagManagement />
        </TabsContent>

        <TabsContent value="sources">
          <Card>
            <CardHeader>
              <CardTitle>知識來源管理</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center text-muted-foreground">知識來源管理內容將顯示在這裡</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration">
          <Card>
            <CardHeader>
              <CardTitle>模型整合設定</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center text-muted-foreground">模型整合設定內容將顯示在這裡</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>效能分析</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center text-muted-foreground">效能分析內容將顯示在這裡</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

