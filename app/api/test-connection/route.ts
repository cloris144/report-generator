import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { url, type } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "URL 不能為空" }, { status: 400 })
    }

    // 設置超時
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      // 獲取響應文本
      const responseText = await response.text()

      // 嘗試解析為 JSON
      let responseData
      try {
        responseData = JSON.parse(responseText)
      } catch (e) {
        responseData = responseText
      }

      return NextResponse.json({
        success: response.ok,
        status: response.status,
        statusText: response.statusText,
        data: responseData,
        type: type,
      })
    } catch (error) {
      let errorMessage = "連接失敗"
      if (error instanceof Error) {
        errorMessage = error.message
        if (error.name === "AbortError") {
          errorMessage = "連接超時"
        }
      }

      return NextResponse.json(
        {
          success: false,
          error: errorMessage,
          type: type,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    return NextResponse.json({ error: "請求處理失敗" }, { status: 500 })
  }
}
