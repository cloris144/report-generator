"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Cpu, RefreshCw } from "lucide-react"

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

  const [expandedModels, setExpandedModels] = useState<Record<string, boolean>>({})

  const toggleModelStatus = (id: string) => {
    setModels(
      models.map((model) =>
        model.id === id ? { ...model, status: model.status === "active" ? "inactive" : "active" } : model,
      ),
    )
  }

  const toggleExpanded = (id: string) => {
    setExpandedModels((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div className="space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            重新整理
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
            <CardContent className="p-0">
              <div className="px-6 py-2 border-b flex justify-between items-center">
                <div className="grid grid-cols-3 gap-4 text-sm flex-1">
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
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpanded(model.id)}
                  aria-expanded={expandedModels[model.id]}
                  aria-controls={`content-${model.id}`}
                >
                  {expandedModels[model.id] ? "收起" : "展開"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`ml-2 h-4 w-4 transition-transform ${expandedModels[model.id] ? "rotate-180" : ""}`}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </Button>
              </div>

              {expandedModels[model.id] && (
                <div id={`content-${model.id}`} className="p-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <Tabs defaultValue="params">
                        <TabsList className="grid w-full grid-cols-1">
                          <TabsTrigger value="params">參數設定</TabsTrigger>
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
                        </TabsContent>
                      </Tabs>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-md border p-4">
                        <h3 className="text-sm font-medium mb-2">模型性能</h3>
                        <div className="space-y-2">
                          <div className="space-y-1">
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div
                                className="h-2 rounded-full bg-primary"
                                style={{ width: `${model.accuracy}%` }}
                              ></div>
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
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
