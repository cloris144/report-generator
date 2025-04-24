"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Save, RefreshCw } from "lucide-react"

export default function SystemSettings() {
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
  })

  const handleSaveSettings = () => {
    // 在實際應用中，這裡會發送設定到後端
    console.log("保存設定:", settings)
    // 顯示成功訊息
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

            <div className="">
              <div className="space-y-2">
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
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">系統整合</h3>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enablePACS">PACS 整合</Label>
                  <p className="text-sm text-muted-foreground">啟用與醫院PACS系統的整合</p>
                </div>
                <Switch
                  id="enablePACS"
                  checked={settings.enablePACS}
                  onCheckedChange={(checked) => setSettings({ ...settings, enablePACS: checked })}
                />
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
        <Button variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          重置設定
        </Button>
        <Button onClick={handleSaveSettings}>
          <Save className="mr-2 h-4 w-4" />
          保存設定
        </Button>
      </div>
    </div>
  )
}

