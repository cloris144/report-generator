import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Star } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "基礎版",
    price: "19,900",
    period: "月",
    description: "適合小型診所和單一科室使用",
    features: [
      "每月 1,000 張影像處理",
      "基礎 AI 報告生成",
      "DICOM 影像支援",
      "基礎 FHIR 整合",
      "電子郵件技術支援",
      "基礎使用者管理",
    ],
    popular: false,
    buttonText: "開始試用",
    buttonVariant: "outline" as const,
  },
  {
    name: "專業版",
    price: "49,900",
    period: "月",
    description: "適合中型醫院和多科室使用",
    features: [
      "每月 5,000 張影像處理",
      "雙模型 AI 診斷",
      "完整 PACS 系統整合",
      "進階 FHIR R4 支援",
      "24/7 電話技術支援",
      "多用戶權限管理",
      "自定義報告範本",
      "API 介接支援",
      "資料分析儀表板",
    ],
    popular: true,
    buttonText: "立即購買",
    buttonVariant: "default" as const,
  },
  {
    name: "企業版",
    price: "客製化",
    period: "報價",
    description: "適合大型醫學中心和醫院集團",
    features: [
      "無限影像處理",
      "完整 AI 模型套件",
      "私有雲部署選項",
      "完整系統客製化",
      "專屬技術支援團隊",
      "進階安全與合規",
      "多院區統一管理",
      "AI 模型訓練服務",
      "研究合作支援",
      "SLA 服務保證",
    ],
    popular: false,
    buttonText: "聯繫銷售",
    buttonVariant: "outline" as const,
  },
]

export default function Pricing() {
  return (
    null
  )
}
