import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MedReport AI - 本地端多模態 LLM 醫學影像報告系統",
  description:
    "採用本地部署多模態大語言模型的革新 AI 醫學影像診斷解決方案。資料不出院區，確保隱私安全，為醫療機構提供高精度、快速的胸腔 X 光報告生成服務。",
  keywords: "本地端AI, 多模態LLM, 醫學影像, 胸腔X光, 離線診斷, FHIR, PACS整合, 資料安全",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
