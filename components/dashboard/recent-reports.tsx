"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Eye, Download, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function RecentReports() {
  // 模擬的報告列表
  const reports = [
    {
      id: "RPT001",
      patientId: "P12345",
      patientName: "王小明",
      date: "2025-03-01",
      modelType: "traditional",
      status: "completed",
    },
    {
      id: "RPT002",
      patientId: "P12346",
      patientName: "李小華",
      date: "2025-03-01",
      modelType: "multimodal",
      status: "completed",
    },
    {
      id: "RPT003",
      patientId: "P12347",
      patientName: "張小芳",
      date: "2025-02-28",
      modelType: "traditional",
      status: "completed",
    },
    {
      id: "RPT004",
      patientId: "P12348",
      patientName: "陳小強",
      date: "2025-02-28",
      modelType: "multimodal",
      status: "pending",
    },
    {
      id: "RPT005",
      patientId: "P12349",
      patientName: "林小美",
      date: "2025-02-27",
      modelType: "traditional",
      status: "completed",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="grid grid-cols-6 gap-2 border-b bg-muted/50 p-2 text-sm font-medium">
          <div className="col-span-2">病患資訊</div>
          <div>報告ID</div>
          <div>日期</div>
          <div>模型類型</div>
          <div className="text-right">操作</div>
        </div>

        <div className="divide-y">
          {reports.map((report) => (
            <div key={report.id} className="grid grid-cols-6 gap-2 p-2 text-sm">
              <div className="col-span-2">
                <div className="font-medium">{report.patientName}</div>
                <div className="text-xs text-muted-foreground">{report.patientId}</div>
              </div>
              <div className="flex items-center">
                <FileText className="mr-1 h-3 w-3" />
                {report.id}
              </div>
              <div>{report.date}</div>
              <div>
                <Badge variant={report.modelType === "traditional" ? "outline" : "secondary"}>
                  {report.modelType === "traditional" ? "傳統+LLM" : "多模態"}
                </Badge>
              </div>
              <div className="flex justify-end gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Eye className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Download className="h-3.5 w-3.5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <MoreHorizontal className="h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>報告操作</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>查看詳情</DropdownMenuItem>
                    <DropdownMenuItem>下載報告</DropdownMenuItem>
                    <DropdownMenuItem>重新生成</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">刪除報告</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="outline" size="sm">
          查看全部報告
        </Button>
      </div>
    </div>
  )
}

