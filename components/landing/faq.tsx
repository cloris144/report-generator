"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "如何與現有的醫院資訊系統整合？",
    answer:
      "我們的系統完全支援 HL7 FHIR R4 標準，可以與大多數現代 HIS、PACS 和 EMR 系統無縫整合。我們提供標準的 DICOM 介面用於影像接收，以及 RESTful API 用於資料交換。我們的技術團隊會協助您完成整合過程。",
  },
  {
    question: "資料安全和隱私如何確保？",
    answer:
      "本地端部署確保所有患者資料和影像絕不離開院區。採用 AES-256 本地端加密、離線身份驗證、完整的審計日誌，符合 HIPAA、GDPR 和台灣個資法要求。系統可完全離線運作，無需網際網路連線。",
  },
  {
    question: "如何更新 AI 模型？",
    answer:
      "我們定期提供模型更新包，可透過離線方式安裝。更新包包含改進的模型權重、新的醫學知識和功能增強。更新過程完全在本地端進行，不需要網路連線，確保資料安全。",
  },
  {
    question: "支援哪些類型的醫學影像？",
    answer:
      "目前主要支援胸腔 X 光影像（PA 和 Lateral 投影）。本地端多模態 LLM 可以處理標準的 DICOM 格式檔案，支援大多數常見的 X 光設備。我們正在開發支援 CT、MRI 的版本。",
  },
  {
    question: "離線運作時如何處理系統問題？",
    answer:
      "系統設計為高度自主運作，包含完整的錯誤處理和自我診斷功能。我們提供詳細的操作手冊、本地端日誌分析工具，以及遠端診斷支援（在網路可用時）。關鍵問題可透過電話獲得即時技術支援。",
  },
  {
    question: "如何處理 AI 診斷錯誤的情況？",
    answer:
      "待討論",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">常見問題</h2>
          <p className="text-xl text-muted-foreground">關於 AI 醫學影像報告系統的常見疑問解答</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <CardTitle className="flex items-center justify-between text-lg">
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={cn("h-5 w-5 transition-transform duration-200", {
                      "transform rotate-180": openIndex === index,
                    })}
                  />
                </CardTitle>
              </CardHeader>
              {openIndex === index && (
                <CardContent className="pt-0">
                  <div className="prose prose-sm max-w-none text-muted-foreground">
                    <p>{faq.answer}</p>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        
      </div>
    </section>
  )
}
