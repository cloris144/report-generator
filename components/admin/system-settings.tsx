"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Save, RefreshCw, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

export default function SystemSettings() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    systemName: "醫學影像報告系統",
    maxConcurrentJobs: 5,
    defaultModelId: "traditional",
    enableAuditLog: true,
    enableUserTracking: true,
    autoBackup: true,
    backupFrequency: "daily",
    maxStorageDays: 90,
    enablePACS: true,
    enableFHIR: true,
    enableHL7: false,
    maxReportLength: 2000,
    maxImageSize: 10,
    pacsUrl: "https://pacs.hospital.org/api",
    fhirUrl: "https://fhir.hospital.org/api",
  })

  const [showResetDialog, setShowResetDialog] = useState(false)
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [testingPacs, setTestingPacs] = useState(false)
  const [testingFhir, setTestingFhir] = useState(false)
  const [pacsStatus, setPacsStatus] = useState<"idle" | "success" | "error">("idle")
  const [fhirStatus, setFhirStatus] = useState<"idle" | "success" | "error">("idle")
  const [pacsResponseDetails, setPacsResponseDetails] = useState<string | null>(null)
  const [fhirResponseDetails, setFhirResponseDetails] = useState<string | null>(null)

  const handleSaveSettings = () => {
    // 在實際應用中，這裡會發送設定到後端
    console.log("保存設定:", settings)
    setShowSaveDialog(true)
  }

  const handleResetSettings = () => {
    setShowResetDialog(false)
    // Reset settings to default values
    setSettings({
      systemName: "醫學影像報告系統",
      maxConcurrentJobs: 5,
      defaultModelId: "traditional",
      enableAuditLog: true,
      enableUserTracking: true,
      autoBackup: true,
      backupFrequency: "daily",
      maxStorageDays: 90,
      enablePACS: true,
      enableFHIR: true,
      enableHL7: false,
      maxReportLength: 2000,
      maxImageSize: 10,
      pacsUrl: "https://pacs.hospital.org/api",
      fhirUrl: "https://fhir.hospital.org/api",
    })
    setPacsStatus("idle")
    setFhirStatus("idle")
    setPacsResponseDetails(null)
  }

  const testPacsConnection = async () => {
    setTestingPacs(true)
    setPacsStatus("idle")
    setPacsResponseDetails(null)

    try {
      // 實際進行 API 呼叫
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10秒超時

      const response = await fetch(settings.pacsUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      // 獲取響應詳情
      const responseText = await response.text()
      let responseDetails = `狀態碼: ${response.status} ${response.statusText}\n`

      try {
        // 嘗試解析為 JSON 以便更好地顯示
        const responseJson = JSON.parse(responseText)
        responseDetails += `回應內容: ${JSON.stringify(responseJson, null, 2)}`
      } catch (e) {
        // 如果不是 JSON，就顯示原始文本
        responseDetails += `回應內容: ${responseText.substring(0, 500)}${responseText.length > 500 ? "..." : ""}`
      }

      setPacsResponseDetails(responseDetails)

      if (response.ok) {
        setPacsStatus("success")
        toast({
          title: "PACS 連接測試成功",
          description: `成功連接到 PACS 系統 (狀態碼: ${response.status})`,
        })
      } else {
        setPacsStatus("error")
        toast({
          title: "PACS 連接測試失敗",
          description: `伺服器回應錯誤 (狀態碼: ${response.status})`,
          variant: "destructive",
        })
      }
    } catch (error) {
      setPacsStatus("error")

      let errorMessage = "連接失敗"
      if (error instanceof Error) {
        errorMessage = error.message
        if (error.name === "AbortError") {
          errorMessage = "連接超時"
        }
      }

      setPacsResponseDetails(`錯誤: ${errorMessage}`)

      toast({
        title: "PACS 連接測試失敗",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setTestingPacs(false)
    }
  }

  const testFhirConnection = async () => {
    setTestingFhir(true)
    setFhirStatus("idle")
    setFhirResponseDetails(null)

    try {
      // 實際進行 API 呼叫
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10秒超時

      const response = await fetch(settings.fhirUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      // 獲取響應詳情
      const responseText = await response.text()
      let responseDetails = `狀態碼: ${response.status} ${response.statusText}\n`

      try {
        // 嘗試解析為 JSON 以便更好地顯示
        const responseJson = JSON.parse(responseText)
        responseDetails += `回應內容: ${JSON.stringify(responseJson, null, 2)}`
      } catch (e) {
        // 如果不是 JSON，就顯示原始文本
        responseDetails += `回應內容: ${responseText.substring(0, 500)}${responseText.length > 500 ? "..." : ""}`
      }

      setFhirResponseDetails(responseDetails)

      if (response.ok) {
        setFhirStatus("success")
        toast({
          title: "FHIR 連接測試成功",
          description: `成功連接到 FHIR 系統 (狀態碼: ${response.status})`,
        })
      } else {
        setFhirStatus("error")
        toast({
          title: "FHIR 連接測試失敗",
          description: `伺服器回應錯誤 (狀態碼: ${response.status})`,
          variant: "destructive",
        })
      }
    } catch (error) {
      setFhirStatus("error")

      let errorMessage = "連接失敗"
      if (error instanceof Error) {
        errorMessage = error.message
        if (error.name === "AbortError") {
          errorMessage = "連接超時"
        }
      }

      setFhirResponseDetails(`錯誤: ${errorMessage}`)

      toast({
        title: "FHIR 連接測試失敗",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setTestingFhir(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>一般設定</CardTitle>
          <CardDescription>設定系統的基本參數和行為</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="systemName">系統名稱</Label>
              <Input
                id="systemName"
                value={settings.systemName}
                onChange={(e) => setSettings({ ...settings, systemName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="defaultModel">預設模型</Label>
              <select
                id="defaultModel"
                value={settings.defaultModelId}
                onChange={(e) => setSettings({ ...settings, defaultModelId: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="traditional">傳統影像處理 + LLM</option>
                <option value="multimodal">多模態LLM</option>
              </select>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">效能設定</h3>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>最大並行任務數</Label>
                <span className="text-sm">{settings.maxConcurrentJobs}</span>
              </div>
              <Slider
                value={[settings.maxConcurrentJobs]}
                min={1}
                max={10}
                step={1}
                onValueChange={(value) => setSettings({ ...settings, maxConcurrentJobs: value[0] })}
              />
              <p className="text-sm text-muted-foreground">設定系統可同時處理的最大報告生成任務數量</p>
            </div>

            <div className="grid gap-2 ">
              <Label htmlFor="maxReportLength">最大報告長度</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="maxReportLength"
                  type="number"
                  value={settings.maxReportLength}
                  onChange={(e) => setSettings({ ...settings, maxReportLength: Number.parseInt(e.target.value) })}
                />
                <span>字元</span>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">系統整合</h3>

            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">PACS 整合</CardTitle>
                      <Switch
                        id="enablePACS"
                        checked={settings.enablePACS}
                        onCheckedChange={(checked) => setSettings({ ...settings, enablePACS: checked })}
                      />
                    </div>
                    <CardDescription>設定與醫院 PACS 系統的整合</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="pacsUrl">PACS API URL</Label>
                        <div className="flex gap-2">
                          <Input
                            id="pacsUrl"
                            value={settings.pacsUrl}
                            onChange={(e) => setSettings({ ...settings, pacsUrl: e.target.value })}
                            disabled={!settings.enablePACS}
                            placeholder="https://pacs.hospital.org/api"
                          />
                          <Button
                            variant="outline"
                            onClick={testPacsConnection}
                            disabled={!settings.enablePACS || testingPacs}
                          >
                            {testingPacs ? "測試中..." : "測試連接"}
                            {pacsStatus === "success" && <CheckCircle className="ml-2 h-4 w-4 text-green-500" />}
                            {pacsStatus === "error" && <XCircle className="ml-2 h-4 w-4 text-red-500" />}
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">輸入 PACS 系統的 API URL，用於獲取醫學影像</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">FHIR 整合</CardTitle>
                      <Switch
                        id="enableFHIR"
                        checked={settings.enableFHIR}
                        onCheckedChange={(checked) => setSettings({ ...settings, enableFHIR: checked })}
                      />
                    </div>
                    <CardDescription>設定與醫院 FHIR 系統的整合</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fhirUrl">FHIR API URL</Label>
                        <div className="flex gap-2">
                          <Input
                            id="fhirUrl"
                            value={settings.fhirUrl}
                            onChange={(e) => setSettings({ ...settings, fhirUrl: e.target.value })}
                            disabled={!settings.enableFHIR}
                            placeholder="https://fhir.hospital.org/api"
                          />
                          <Button
                            variant="outline"
                            onClick={testFhirConnection}
                            disabled={!settings.enableFHIR || testingFhir}
                          >
                            {testingFhir ? "測試中..." : "測試連接"}
                            {fhirStatus === "success" && <CheckCircle className="ml-2 h-4 w-4 text-green-500" />}
                            {fhirStatus === "error" && <XCircle className="ml-2 h-4 w-4 text-red-500" />}
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          輸入 FHIR 系統的 API URL，用於獲取和提交病患資料
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">安全與隱私</h3>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableUserTracking">用戶行為追蹤</Label>
                  <p className="text-sm text-muted-foreground">追蹤用戶在系統中的行為以改善使用體驗</p>
                </div>
                <Switch
                  id="enableUserTracking"
                  checked={settings.enableUserTracking}
                  onCheckedChange={(checked) => setSettings({ ...settings, enableUserTracking: checked })}
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">備份設定</h3>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="autoBackup">自動備份</Label>
                <p className="text-sm text-muted-foreground">自動定期備份系統數據</p>
              </div>
              <Switch
                id="autoBackup"
                checked={settings.autoBackup}
                onCheckedChange={(checked) => setSettings({ ...settings, autoBackup: checked })}
              />
            </div>

            {settings.autoBackup && (
              <div className="space-y-2">
                <Label htmlFor="backupFrequency">備份頻率</Label>
                <select
                  id="backupFrequency"
                  value={settings.backupFrequency}
                  onChange={(e) => setSettings({ ...settings, backupFrequency: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="hourly">每小時</option>
                  <option value="daily">每日</option>
                  <option value="weekly">每週</option>
                  <option value="monthly">每月</option>
                </select>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>數據保留期限</Label>
                <span className="text-sm">{settings.maxStorageDays} 天</span>
              </div>
              <Slider
                value={[settings.maxStorageDays]}
                min={30}
                max={365}
                step={30}
                onValueChange={(value) => setSettings({ ...settings, maxStorageDays: value[0] })}
              />
              <p className="text-sm text-muted-foreground">設定系統保留數據的最長時間</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              重置設定
            </Button>
          </DialogTrigger>
          <DialogContent aria-describedby="reset-dialog-description">
            <DialogHeader>
              <DialogTitle>重置系統設定</DialogTitle>
              <DialogDescription id="reset-dialog-description">
                您確定要將所有系統設定重置為預設值嗎？此操作無法撤銷。
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowResetDialog(false)}>
                取消
              </Button>
              <Button variant="destructive" onClick={handleResetSettings}>
                確認重置
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button onClick={handleSaveSettings}>
          <Save className="mr-2 h-4 w-4" />
          保存設定
        </Button>

        <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
          <DialogContent aria-describedby="save-dialog-description">
            <DialogHeader>
              <DialogTitle>設定已保存</DialogTitle>
              <DialogDescription id="save-dialog-description">系統設定已成功保存並應用。</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setShowSaveDialog(false)}>確認</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
