"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Cpu, RefreshCw, Download, Upload, Plus, Settings, BarChart } from "lucide-react"

export default function ModelManagement() {
  const [models, setModels] = useState([
    {
      id: "traditional",
      name: "傳統影像處理 + LLM",
      type: "hybrid",
      status: "active",
      accuracy: 92.4,
      lastUpdated: "2025-02-28",
      version: "1.2.0",
    },
    {
      id: "multimodal",
      name: "多模態LLM",
      type: "multimodal",
      status: "active",
      accuracy: 89.1,
      lastUpdated: "2025-03-01",
      version: "1.0.5",
    },
  ])

  const toggleModelStatus = (id: string) => {
    setModels(
      models.map((model) =>
        model.id === id ? { ...model, status: model.status === "active" ? "inactive" : "active" } : model,
      ),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div className="space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            重新整理
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
             
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {models.map((model) => (
          <Card key={model.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl flex items-center">
                  <Cpu className="mr-2 h-5 w-5" />
                  {model.name}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`model-status-${model.id}`}
                    checked={model.status === "active"}
                    onCheckedChange={() => toggleModelStatus(model.id)}
                  />
                  <Label htmlFor={`model-status-${model.id}`}>{model.status === "active" ? "啟用" : "停用"}</Label>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">模型類型:</span>
                      <span className="ml-2">{model.type === "hybrid" ? "混合型" : "多模態"}</span>
                    </div>
                    <div>
                      <span className="font-medium">版本:</span>
                      <span className="ml-2">{model.version}</span>
                    </div>
                    <div>
                      <span className="font-medium">最後更新:</span>
                      <span className="ml-2">{model.lastUpdated}</span>
                    </div>
                  </div>

                  <Tabs defaultValue="params">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="params">參數設定</TabsTrigger>
                      <TabsTrigger value="knowledge">知識庫</TabsTrigger>
                    </TabsList>

                    <TabsContent value="params" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>溫度 (Temperature)</Label>
                          <span className="text-sm">0.7</span>
                        </div>
                        <Slider defaultValue={[0.7]} max={1} step={0.1} />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>最大長度 (Max Length)</Label>
                          <span className="text-sm">2048</span>
                        </div>
                        <Slider defaultValue={[2048]} max={4096} step={256} />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Top-P 採樣</Label>
                          <span className="text-sm">0.9</span>
                        </div>
                        <Slider defaultValue={[0.9]} max={1} step={0.05} />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch id={`graphrag-${model.id}`} defaultChecked />
                        <Label htmlFor={`graphrag-${model.id}`}>啟用 GraphRAG 知識增強</Label>
                      </div>
                    </TabsContent>

                    <TabsContent value="knowledge" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label>知識庫更新頻率</Label>
                        <select className="w-full rounded-md border p-2">
                          <option>每日</option>
                          <option>每週</option>
                          <option>每月</option>
                          <option>手動</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label>知識來源</Label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="source-pubmed" defaultChecked />
                            <label htmlFor="source-pubmed">PubMed</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="source-journals" defaultChecked />
                            <label htmlFor="source-journals">醫學期刊</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="source-guidelines" defaultChecked />
                            <label htmlFor="source-guidelines">臨床指南</label>
                          </div>
                        </div>
                      </div>

                      <Button variant="outline" size="sm">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        更新知識庫
                      </Button>
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <h3 className="text-sm font-medium mb-2">模型性能</h3>
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-primary" style={{ width: `${model.accuracy}%` }}></div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>精確度 (Precision)</span>
                          <span>{(model.accuracy - 2).toFixed(1)}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-primary"
                            style={{ width: `${model.accuracy - 2}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>召回率 (Recall)</span>
                          <span>{(model.accuracy - 3).toFixed(1)}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-primary"
                            style={{ width: `${model.accuracy - 3}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Settings className="mr-2 h-4 w-4" />
                      詳細設定
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <BarChart className="mr-2 h-4 w-4" />
                      性能分析
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label>模型更新</Label>
                    <div className="flex gap-2">
                      <Input type="file" className="flex-1" />
                      <Button>
                        <Upload className="mr-2 h-4 w-4" />
                        上傳
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

