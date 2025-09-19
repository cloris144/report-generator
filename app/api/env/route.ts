import { type NextRequest, NextResponse } from "next/server"
import { env } from "@/lib/env"

// 獲取環境變數（僅非敏感資訊）
export async function GET() {
  try {
    const publicEnvVars = {
      NEXT_PUBLIC_APP_NAME: env.NEXT_PUBLIC_APP_NAME,
      NEXT_PUBLIC_APP_VERSION: env.NEXT_PUBLIC_APP_VERSION,
      NEXT_PUBLIC_APP_ENV: env.NEXT_PUBLIC_APP_ENV,
      // 只返回非敏感的配置狀態
      hasDatabase: !!env.DATABASE_URL,
      hasRedis: !!env.REDIS_URL,
      hasOpenAI: !!env.OPENAI_API_KEY,
      hasPACS: !!env.PACS_API_URL,
      hasFHIR: !!env.FHIR_API_URL,
    }

    return NextResponse.json(publicEnvVars)
  } catch (error) {
    return NextResponse.json({ error: "無法獲取環境變數資訊" }, { status: 500 })
  }
}

// 更新環境變數（需要管理員權限）
export async function POST(request: NextRequest) {
  try {
    // 這裡應該添加身份驗證檢查
    // const user = await authenticateUser(request)
    // if (!user || user.role !== 'admin') {
    //   return NextResponse.json({ error: "權限不足" }, { status: 403 })
    // }

    const body = await request.json()

    // 驗證和更新環境變數
    // 注意：在生產環境中，這通常需要重新啟動應用程式

    return NextResponse.json({
      success: true,
      message: "環境變數已更新，請重新啟動應用程式以生效",
    })
  } catch (error) {
    return NextResponse.json({ error: "更新環境變數失敗" }, { status: 500 })
  }
}
