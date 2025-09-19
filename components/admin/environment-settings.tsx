"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Save,
  RefreshCw,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Key,
  Database,
  Cloud,
  Settings,
  Shield,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface EnvVar {
  key: string
  value: string
  category: string
  required: boolean
  sensitive: boolean
  description: string
  status: "set" | "missing" | "invalid"
}

export default function EnvironmentSettings() {
  const { toast } = useToast()
  const [envVars, setEnvVars] = useState<EnvVar[]>([])
  const [showSensitive, setShowSensitive] = useState<Record<string, boolean>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    loadEnvironmentVariables()
  }, [])

  const loadEnvironmentVariables = async () => {
    setIsLoading(true)

    // 模擬從 API 載入環境變數
    const mockEnvVars: EnvVar[] = [
      // 應用程式設定
      {
        key: "NEXT_PUBLIC_APP_NAME",
        value: "醫學影像報告系統",
        category: "app",
        required: false,
        sensitive: false,
        description: "應用程式名稱",
        status: "set",
      },
      {
        key: "NEXT_PUBLIC_APP_VERSION",
        value: "1.0.0",
        category: "app",
        required: false,
        sensitive: false,
        description: "應用程式版本",
        status: "set",
      },
      {
        key: "NEXT_PUBLIC_APP_ENV",
        value: "development",
        category: "app",
        required: false,
        sensitive: false,
        description: "運行環境",
        status: "set",
      },

      // 資料庫設定
      {
        key: "DATABASE_URL",
        value: "postgresql://username:password@localhost:5432/medical_reports",
        category: "database",
        required: true,
        sensitive: true,
        description: "PostgreSQL 資料庫連接字串",
        status: "set",
      },
      {
        key: "REDIS_URL",
        value: "redis://localhost:6379",
        category: "database",
        required: true,
        sensitive: false,
        description: "Redis 快取資料庫連接字串",
        status: "set",
      },

      // AI 模型設定
      {
        key: "OPENAI_API_KEY",
        value: "sk-proj-***************************",
        category: "ai",
        required: true,
        sensitive: true,
        description: "OpenAI API 金鑰",
        status: "set",
      },
      {
        key: "OPENAI_MODEL",
        value: "gpt-4o",
        category: "ai",
        required: false,
        sensitive: false,
        description: "OpenAI 模型名稱",
        status: "set",
      },
      {
        key: "GROQ_API_KEY",
        value: "",
        category: "ai",
        required: false,
        sensitive: true,
        description: "Groq API 金鑰",
        status: "missing",
      },

      // 醫療系統整合
      {
        key: "PACS_API_URL",
        value: "https://pacs.hospital.org/api",
        category: "medical",
        required: false,
        sensitive: false,
        description: "PACS 系統 API URL",
        status: "set",
      },
      {
        key: "PACS_API_KEY",
        value: "pacs_***************",
        category: "medical",
        required: false,
        sensitive: true,
        description: "PACS 系統 API 金鑰",
        status: "set",
      },
      {
        key: "FHIR_API_URL",
        value: "https://fhir.hospital.org/api",
        category: "medical",
        required: false,
        sensitive: false,
        description: "FHIR 系統 API URL",
        status: "set",
      },
      {
        key: "FHIR_CLIENT_ID",
        value: "",
        category: "medical",
        required: false,
        sensitive: true,
        description: "FHIR 客戶端 ID",
        status: "missing",
      },

      // 安全設定
      {
        key: "JWT_SECRET",
        value: "your-jwt-secret-key-here-32-chars-min",
        category: "security",
        required: true,
        sensitive: true,
        description: "JWT 簽名密鑰",
        status: "set",
      },
      {
        key: "ENCRYPTION_KEY",
        value: "your-encryption-key-here-32-chars-min",
        category: "security",
        required: true,
        sensitive: true,
        description: "資料加密密鑰",
        status: "set",
      },

      // 雲端儲存
      {
        key: "AWS_ACCESS_KEY_ID",
        value: "",
        category: "storage",
        required: false,
        sensitive: true,
        description: "AWS 存取金鑰 ID",
        status: "missing",
      },
      {
        key: "AWS_SECRET_ACCESS_KEY",
        value: "",
        category: "storage",
        required: false,
        sensitive: true,
        description: "AWS 秘密存取金鑰",
        status: "missing",
      },
    ]

    setEnvVars(mockEnvVars)
    setIsLoading(false)
  }

  const handleSaveEnvironment = async () => {
    setIsSaving(true)

    try {
      // 模擬保存環境變數
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "環境變數已保存",
        description: "所有環境變數設定已成功保存",
      })
    } catch (error) {
      toast({
        title: "保存失敗",
        description: "環境變數保存時發生錯誤",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleTestConnection = async (category: string) => {
    toast({
      title: "測試連接中...",
      description: `正在測試 ${getCategoryName(category)} 相關服務的連接`,
    })

    // 模擬連接測試
    setTimeout(() => {
      toast({
        title: "連接測試完成",
        description: "所有服務連接正常",
      })
    }, 2000)
  }

  const toggleSensitiveVisibility = (key: string) => {
    setShowSensitive((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const updateEnvVar = (key: string, value: string) => {
    setEnvVars((prev) =>
      prev.map((env) => (env.key === key ? { ...env, value, status: value ? "set" : "missing" } : env)),
    )
  }

  const getCategoryName = (category: string) => {
    const names: Record<string, string> = {
      app: "應用程式",
      database: "資料庫",
      ai: "AI 模型",
      medical: "醫療系統",
      security: "安全設定",
      storage: "雲端儲存",
    }
    return names[category] || category
  }

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, React.ReactNode> = {
      app: <Settings className="h-4 w-4" />,
      database: <Database className="h-4 w-4" />,
      ai: <Key className="h-4 w-4" />,
      medical: <Shield className="h-4 w-4" />,
      security: <Shield className="h-4 w-4" />,
      storage: <Cloud className="h-4 w-4" />,
    }
    return icons[category] || <Settings className="h-4 w-4" />
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "set":
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="h-3 w-3 mr-1" />
            已設定
          </Badge>
        )
      case "missing":
        return (
          <Badge className="bg-red-500">
            <XCircle className="h-3 w-3 mr-1" />
            未設定
          </Badge>
        )
      case "invalid":
        return (
          <Badge className="bg-yellow-500">
            <AlertTriangle className="h-3 w-3 mr-1" />
            無效
          </Badge>
        )
      default:
        return <Badge className="bg-gray-500">未知</Badge>
    }
  }

  const getEnvVarsByCategory = (category: string) => {
    return envVars.filter((env) => env.category === category)
  }

  const categories = [...new Set(envVars.map((env) => env.category))]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 概覽統計 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">總環境變數</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{envVars.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">已設定</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {envVars.filter((env) => env.status === "set").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">未設定</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {envVars.filter((env) => env.status === "missing").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">必要變數</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{envVars.filter((env) => env.required).length}</div>
          </CardContent>
        </Card>
      </div>

      {/* 環境變數設定 */}
      <Card>
        <CardHeader>
          <CardTitle>環境變數設定</CardTitle>
          <CardDescription>管理系統的環境變數配置</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={categories[0]}>
            <TabsList className="grid w-full grid-cols-6">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="flex items-center gap-1">
                  {getCategoryIcon(category)}
                  {getCategoryName(category)}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category} value={category} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">{getCategoryName(category)} 設定</h3>
                  <Button variant="outline" size="sm" onClick={() => handleTestConnection(category)}>
                    測試連接
                  </Button>
                </div>

                <div className="space-y-4">
                  {getEnvVarsByCategory(category).map((envVar) => (
                    <div key={envVar.key} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Label className="font-medium">{envVar.key}</Label>
                          {envVar.required && (
                            <Badge variant="outline" className="text-xs">
                              必要
                            </Badge>
                          )}
                          {getStatusBadge(envVar.status)}
                        </div>
                        {envVar.sensitive && (
                          <Button variant="ghost" size="sm" onClick={() => toggleSensitiveVisibility(envVar.key)}>
                            {showSensitive[envVar.key] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        )}
                      </div>

                      <Input
                        type={envVar.sensitive && !showSensitive[envVar.key] ? "password" : "text"}
                        value={envVar.value}
                        onChange={(e) => updateEnvVar(envVar.key, e.target.value)}
                        placeholder={`輸入 ${envVar.key}`}
                        className="mb-2"
                      />

                      <p className="text-sm text-muted-foreground">{envVar.description}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* 警告訊息 */}
      {envVars.some((env) => env.required && env.status === "missing") && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            有必要的環境變數尚未設定，這可能會影響系統正常運作。請檢查並設定所有必要的環境變數。
          </AlertDescription>
        </Alert>
      )}

      {/* 操作按鈕 */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={loadEnvironmentVariables}>
          <RefreshCw className="mr-2 h-4 w-4" />
          重新載入
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "保存中..." : "保存設定"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>確認保存環境變數</DialogTitle>
              <DialogDescription>您確定要保存這些環境變數設定嗎？這將會重新啟動相關服務。</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline">取消</Button>
              <Button onClick={handleSaveEnvironment}>確認保存</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
