import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Brain,
  Zap,
  Shield,
  Database,
  FileText,
  Settings,
  Users,
  BarChart3,
  Lock,
  Clock,
  CheckCircle,
  Globe,
} from "lucide-react"

const features = [
  {
    title: "本地端多模態 LLM",
    description: "採用本地部署的多模態大語言模型，確保資料安全與隱私保護，無需依賴外部 API 服務。",
    icon: Brain,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "秒級報告生成",
    description: "本地端 GPU 加速處理，平均 30 秒內完成完整的放射學報告生成，無網路延遲問題。",
    icon: Zap,
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    title: "資料完全私密",
    description: "所有影像和報告處理均在院內完成，患者資料絕不外傳，符合最嚴格的醫療隱私要求。",
    icon: Shield,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "PACS 系統整合",
    description: "直接連接醫院 PACS 系統，自動獲取 DICOM 影像並回傳結構化報告，無需改變現有工作流程。",
    icon: Database,
    gradient: "from-purple-500 to-violet-500",
  },
  {
    title: "離線運作能力",
    description: "系統可完全離線運作，不依賴網際網路連線，確保醫院在任何情況下都能正常使用。",
    icon: FileText,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    title: "智能品質控制",
    description: "內建本地端 AI 品質檢查機制，確保報告的醫學準確性和邏輯一致性。",
    icon: CheckCircle,
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    title: "多用戶管理",
    description: "支援醫師、研究員、管理員等不同角色，提供細緻的權限控制和使用追蹤。",
    icon: Users,
    gradient: "from-teal-500 to-cyan-500",
  },
  {
    title: "即時監控",
    description: "提供詳細的本地端系統監控和使用分析，幫助優化診斷工作流程和硬體資源。",
    icon: BarChart3,
    gradient: "from-red-500 to-pink-500",
  },
  {
    title: "企業級安全",
    description: "本地端加密存儲，多層身份驗證，確保患者隱私和資料安全，符合醫療法規要求。",
    icon: Lock,
    gradient: "from-gray-500 to-slate-500",
  },
  {
    title: "24/7 可用性",
    description: "本地端部署確保系統不受網路中斷影響，提供全天候不間斷的診斷服務支援。",
    icon: Clock,
    gradient: "from-amber-500 to-yellow-500",
  },
  {
    title: "彈性硬體配置",
    description: "支援多種 GPU 配置和硬體規格，可根據醫院規模和需求進行客製化部署。",
    icon: Settings,
    gradient: "from-lime-500 to-green-500",
  },
  {
    title: "持續模型更新",
    description: "定期提供模型更新包，可離線安裝，持續提升診斷準確性和功能完整性。",
    icon: Globe,
    gradient: "from-sky-500 to-blue-500",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">強大功能特色</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            全面的 AI 醫學影像分析解決方案，為現代醫療機構提供智能、準確、高效的診斷支援
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${feature.gradient}`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
