import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Image, History, ArrowRight } from "lucide-react"
import Link from "next/link"
import RecentReports from "@/components/dashboard/recent-reports"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">歡迎，醫師</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">待處理影像</CardTitle>
            <Image className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 自昨日</p>
            <div className="mt-4">
              <Link href="/dashboard/images">
                <Button variant="outline" size="sm" className="w-full">
                  查看影像
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">已生成報告</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">132</div>
            <p className="text-xs text-muted-foreground">+18 自上週</p>
            <div className="mt-4">
              <Link href="/dashboard/reports">
                <Button variant="outline" size="sm" className="w-full">
                  生成報告
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">歷史報告</CardTitle>
            <History className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,024</div>
            <p className="text-xs text-muted-foreground">總報告數量</p>
            <div className="mt-4">
              <Link href="/dashboard/history">
                <Button variant="outline" size="sm" className="w-full">
                  查看歷史
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-2 lg:col-span-4">
          <CardHeader>
            <CardTitle>最近報告</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentReports />
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>快速操作</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link href="/dashboard/reports">
                <Button className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  生成新報告
                </Button>
              </Link>

              <Link href="/dashboard/images">
                <Button variant="outline" className="w-full">
                  <Image className="mr-2 h-4 w-4" />
                  上傳新影像
                </Button>
              </Link>

              <Link href="/dashboard/history">
                <Button variant="outline" className="w-full">
                  <History className="mr-2 h-4 w-4" />
                  查看歷史報告
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

