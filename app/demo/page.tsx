"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Upload, Brain, FileText, Download } from "lucide-react"
import Link from "next/link"

export default function DemoPage() {
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFileUpload = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setStep(2)
      setIsProcessing(false)
    }, 2000)
  }

  const generateReport = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setStep(3)
      setIsProcessing(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回首頁
            </Link>
            <h1 className="text-2xl font-bold">AI 醫學影像報告 - 免費體驗</h1>
            <div></div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>
              <div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${step >= 1 ? "border-primary bg-primary text-white" : "border-muted-foreground"}`}
              >
                1
              </div>
              <span className="ml-2">上傳影像</span>
            </div>
            <div className="w-8 h-px bg-muted-foreground"></div>
            <div className={`flex items-center ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>
              <div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${step >= 2 ? "border-primary bg-primary text-white" : "border-muted-foreground"}`}
              >
                2
              </div>
              <span className="ml-2">AI 分析</span>
            </div>
            <div className="w-8 h-px bg-muted-foreground"></div>
            <div className={`flex items-center ${step >= 3 ? "text-primary" : "text-muted-foreground"}`}>
              <div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${step >= 3 ? "border-primary bg-primary text-white" : "border-muted-foreground"}`}
              >
                3
              </div>
              <span className="ml-2">生成報告</span>
            </div>
          </div>
        </div>

        {/* Step 1: Upload */}
        {step === 1 && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="h-5 w-5 mr-2" />
                上傳胸腔 X 光影像
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">拖放 DICOM 或 JPEG 檔案至此</p>
                <p className="text-muted-foreground mb-4">或點擊選擇檔案</p>
                <Button onClick={handleFileUpload} disabled={isProcessing}>
                  {isProcessing ? "處理中..." : "選擇檔案"}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="patientId">患者 ID</Label>
                  <Input id="patientId" placeholder="例如：P001234" />
                </div>
                <div>
                  <Label htmlFor="patientName">患者姓名</Label>
                  <Input id="patientName" placeholder="例如：王小明" />
                </div>
              </div>

              <div>
                <Label htmlFor="clinicalInfo">臨床資訊</Label>
                <Textarea id="clinicalInfo" placeholder="請輸入相關的臨床症狀或檢查原因..." rows={3} />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: AI Analysis */}
        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2" />
                  AI 影像分析
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <img
                    src="/placeholder.svg?height=300&width=300&text=胸腔X光影像"
                    alt="胸腔X光影像"
                    className="max-w-full h-auto"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>影像品質檢測</span>
                    <span className="text-green-600 font-medium">優良</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>病灶檢測</span>
                    <span className="text-blue-600 font-medium">進行中...</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>解剖結構分析</span>
                    <span className="text-gray-500">等待中</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>分析進度</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>本地端影像預處理</span>
                      <span>85%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>多模態 LLM 分析</span>
                      <span>72%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: "72%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>本地知識庫檢索</span>
                      <span>45%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Button onClick={generateReport} disabled={isProcessing}>
                    {isProcessing ? "生成報告中..." : "生成報告"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Generated Report */}
        {step === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>影像與標註</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <img
                    src="/placeholder.svg?height=300&width=300&text=標註後的X光影像"
                    alt="標註後的胸腔X光影像"
                    className="max-w-full h-auto"
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>✓ 肺野清晰</p>
                  <p>✓ 心臟大小正常</p>
                  <p>✓ 無明顯異常</p>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    AI 生成報告
                  </span>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    下載報告
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 p-6 rounded-lg space-y-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-base mb-2">胸腔 X 光檢查報告</h4>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>患者 ID: P001234</div>
                      <div>檢查日期: 2025-01-20</div>
                      <div>患者姓名: 王小明</div>
                      <div>報告生成時間: 14:25:30</div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-2">【影像描述】</h5>
                    <p className="leading-relaxed">
                      肺野：雙側肺野透明度正常，無明顯浸潤性病變或結節影。 肺紋理分布正常，無明顯增強或紊亂。
                    </p>
                    <p className="leading-relaxed mt-2">
                      心臟及縱隔：心臟大小正常，心胸比例約為0.48。 主動脈結正常，無明顯擴張。縱隔無明顯腫塊或擴大。
                    </p>
                  </div>

                  <div>
                    <h5 className="font-medium mb-2">【診斷結果】</h5>
                    <p>正常胸部 X 光表現，無明顯異常發現。</p>
                  </div>

                  <div>
                    <h5 className="font-medium mb-2">【建議】</h5>
                    <p>目前無需進一步影像學檢查。建議根據臨床需要進行定期追蹤。</p>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="text-xs text-muted-foreground">本地端 LLM 信心度: 94.2% | 處理時間: 28 秒</div>
                    <div className="text-xs text-muted-foreground">報告 ID: RPT2025012014253001</div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-muted-foreground mb-4">
                    這是 AI 生成的示範報告。實際使用時，所有報告都需要由專業醫師審核確認。
                  </p>
                  <div className="space-x-4">
                    <Link href="/contact">
                      <Button>聯繫我們</Button>
                    </Link>
                    <Button variant="outline" onClick={() => setStep(1)}>
                      重新體驗
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
