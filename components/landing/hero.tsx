import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Shield, Zap, Users } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          {/* Badge */}

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            本地端多模態 LLM
            <span className="block text-primary">胸腔 X 光報告</span>
            智能生成系統
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            採用本地部署的多模態大語言模型，結合先進的醫學影像處理技術，為醫療機構提供安全、私密、高精度的放射學報告生成解決方案。資料不出院區，符合
            FHIR 標準，無縫整合 PACS 系統。
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium">本地模態
</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium">30 秒生成報告</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-500" />
              <span className="text-sm font-medium">人性化介面</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/demo">
              <Button size="lg" className="px-8 py-3 text-lg">
                立即試用
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg bg-transparent">
              <Play className="mr-2 h-5 w-5" />
              觀看演示
            </Button>
          </div>

          {/* Hero Image */}
          <div className="relative mx-auto max-w-5xl">
            <div className="rounded-lg bg-gradient-to-r from-primary/20 to-purple-500/20 p-1">
              <div className="rounded-lg bg-background p-8">
                <img
                  src="/placeholder.svg?height=600&width=800&text=醫學影像報告系統介面"
                  alt="醫學影像報告系統界面"
                  className="w-full h-auto rounded-md shadow-2xl"
                />
              </div>
            </div>

            {/* Floating Cards */}
            

            
          </div>
        </div>
      </div>
    </section>
  )
}
