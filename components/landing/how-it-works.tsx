import { Card, CardContent } from "@/components/ui/card"
import { Upload, Brain, FileCheck, Download } from "lucide-react"

const steps = [
  {
    step: "01",
    title: "影像輸入",
    description: "醫師通過 PACS 系統或直接上傳胸腔 X 光影像，系統在本地端自動擷取 DICOM 資料和患者資訊。",
    icon: Upload,
    color: "bg-blue-500",
  },
  {
    step: "02",
    title: "本地端 AI 分析",
    description: "本地部署的多模態 LLM 在院內 GPU 伺服器上進行影像分析，結合醫學知識進行語義理解。",
    icon: Brain,
    color: "bg-purple-500",
  },
  {
    step: "03",
    title: "報告生成",
    description: "結合本地醫學知識庫，生成符合 FHIR 標準的結構化報告，包含診斷建議和醫學編碼。",
    icon: FileCheck,
    color: "bg-green-500",
  },
  {
    step: "04",
    title: "審核發送",
    description: "醫師可審核、修改並確認報告，系統自動整合至醫院資訊系統，全程資料不離開院區。",
    icon: Download,
    color: "bg-orange-500",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">運作流程</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            簡化的四步驟流程，從影像輸入到報告生成，讓 AI 成為您最可靠的診斷助手
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
                <CardContent className="space-y-4">
                  <div className="relative mx-auto w-16 h-16">
                    <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center`}>
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-background border-2 border-primary text-primary text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>

              {/* Arrow */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Process Illustration */}
        <div className="mt-16 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">智能診斷流程</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span>DICOM 影像本地端解析和預處理</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span>本地端多模態 LLM 影像理解</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span>院內 GPU 加速推理運算</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span>本地醫學知識庫智能檢索</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span>結構化報告本地端生成</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=300&width=400&text=AI診斷流程圖"
                alt="AI診斷流程"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
