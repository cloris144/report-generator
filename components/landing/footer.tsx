import Link from "next/link"
import { Stethoscope, Mail, Phone, MapPin } from "lucide-react"

const footerLinks = {
  產品: [
    { name: "功能特色", href: "#features" },
    { name: "技術架構", href: "#tech-stack" },
    { name: "方案價格", href: "#pricing" },
    { name: "API 文檔", href: "/docs" },
  ],
  解決方案: [
    { name: "醫院整合", href: "/solutions/hospital" },
    { name: "診所方案", href: "/solutions/clinic" },
    { name: "研究機構", href: "/solutions/research" },
    { name: "客製開發", href: "/solutions/custom" },
  ],
  支援: [
    { name: "技術支援", href: "/support" },
    { name: "使用手冊", href: "/docs/manual" },
    { name: "常見問題", href: "#faq" },
    { name: "聯繫我們", href: "/contact" },
  ],
  公司: [
    { name: "關於我們", href: "/about" },
    { name: "新聞資訊", href: "/news" },
    { name: "職涯機會", href: "/careers" },
    { name: "合作夥伴", href: "/partners" },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Stethoscope className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">ＣhickadeeX</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-sm">
              領先的 AI 醫學影像診斷解決方案，為醫療機構提供智能、準確、高效的診斷支援。
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>02-1234-5678</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>contact@medreport-ai.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>台北市北投區明德路365號</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            null
          ))}
        </div>

        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-muted-foreground text-sm mb-4 md:mb-0">© 2025 ＣhickadeeX. 保留所有權利。</div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                隱私政策
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                服務條款
              </Link>
              <Link href="/security" className="text-muted-foreground hover:text-primary transition-colors">
                資安政策
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
