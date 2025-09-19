import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "張醫師",
    role: "放射科主任",
    hospital: "台北榮民總醫院",
    content: "本地端部署讓我們完全掌控患者資料，AI 診斷品質穩定，不用擔心網路問題影響工作流程。",
    rating: 5,
    avatar: "/placeholder.svg?height=64&width=64&text=張",
  },
  {
    name: "李主任",
    role: "資訊部主任",
    hospital: "高雄醫學大學附設醫院",
    content: "本地端系統讓我們的資料安全得到最大保障，與現有 PACS 整合順利，完全符合醫院資安政策。",
    rating: 5,
    avatar: "/placeholder.svg?height=64&width=64&text=李",
  },
  {
    name: "陳教授",
    role: "醫學影像研究員",
    hospital: "台灣大學醫學院",
    content: "本地端多模態 LLM 的診斷準確性令人驚艷，而且可以離線運作，對研究工作非常重要。",
    rating: 5,
    avatar: "/placeholder.svg?height=64&width=64&text=陳",
  },
  {
    name: "王醫師",
    role: "急診科醫師",
    hospital: "長庚紀念醫院",
    content: "本地端處理速度很快，30 秒生成報告，而且不受網路狀況影響，對急診環境來說非常可靠。",
    rating: 5,
    avatar: "/placeholder.svg?height=64&width=64&text=王",
  },
  {
    name: "林院長",
    role: "醫院院長",
    hospital: "彰化基督教醫院",
    content: "本地端部署完全符合我們對資料安全的要求，診斷品質提升明顯，患者滿意度也大幅改善。",
    rating: 5,
    avatar: "/placeholder.svg?height=64&width=64&text=林",
  },
  {
    name: "黃博士",
    role: "生醫資訊專家",
    hospital: "中央研究院",
    content: "本地端多模態 LLM 架構非常先進，資料不外流的設計讓醫學研究更加安全可信。",
    rating: 5,
    avatar: "/placeholder.svg?height=64&width=64&text=黃",
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">用戶評價</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            來自全台各大醫療機構的真實回饋，見證 AI 醫學影像診斷的革新力量
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-muted-foreground mb-4 italic">"{testimonial.content}"</blockquote>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.hospital}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-muted-foreground">合作醫院</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">100,000+</div>
            <div className="text-muted-foreground">處理影像</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">92.4%</div>
            <div className="text-muted-foreground">平均準確率</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">30s</div>
            <div className="text-muted-foreground">平均處理時間</div>
          </div>
        </div>
      </div>
    </section>
  )
}
