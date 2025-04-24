"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, FileText, Download, RefreshCw } from "lucide-react"
import { generateReport } from "@/lib/actions"
import type { ReportType } from "@/lib/types"

const formSchema = z.object({
  patientId: z.string().min(2, { message: "病患ID至少需要2個字符" }),
  patientName: z.string().min(2, { message: "病患姓名至少需要2個字符" }),
  studyDate: z.string(),
  imageUrl: z.string().url({ message: "請輸入有效的影像URL" }).or(z.string().length(0)),
  modelType: z.string(),
  additionalInfo: z.string(),
})

export default function ReportGenerator() {
  const [report, setReport] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("form")
  const [reportType, setReportType] = useState<ReportType>("traditional")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientId: "",
      patientName: "",
      studyDate: new Date().toISOString().split("T")[0],
      imageUrl: "",
      modelType: "traditional",
      additionalInfo: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    try {
      const generatedReport = await generateReport({
        ...values,
        reportType: values.modelType as ReportType,
      })
      setReport(generatedReport)
      setActiveTab("preview")
    } catch (error) {
      console.error("報告生成失敗", error)
    } finally {
      setLoading(false)
    }
  }

  function downloadReport() {
    if (!report) return

    const blob = new Blob([report], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `胸腔X-ray報告_${form.getValues().patientId}_${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="form">報告參數</TabsTrigger>
          <TabsTrigger value="preview">報告預覽</TabsTrigger>
        </TabsList>

        <TabsContent value="form">
          <Card>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="patientId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>病患ID</FormLabel>
                          <FormControl>
                            <Input placeholder="輸入病患ID" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="patientName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>病患姓名</FormLabel>
                          <FormControl>
                            <Input placeholder="輸入病患姓名" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="studyDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>檢查日期</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="modelType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>模型類型</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="選擇模型類型" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="traditional">傳統影像處理 + LLM</SelectItem>
                              <SelectItem value="multimodal">多模態LLM</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>選擇報告生成的模型類型</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>影像URL (可選)</FormLabel>
                        <FormControl>
                          <Input placeholder="輸入DICOM影像URL或從PACS選擇" {...field} />
                        </FormControl>
                        <FormDescription>可以直接輸入URL或從PACS系統選擇影像</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-center">
                    <div className="relative h-64 w-64 rounded-md border bg-muted">
                      {form.getValues().imageUrl ? (
                        <img
                          src={form.getValues().imageUrl || "/placeholder.svg"}
                          alt="胸腔X-ray影像"
                          className="h-full w-full object-contain p-2"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                          <p>預覽影像</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-center gap-4">
                    <Button type="button" variant="outline">
                      從PACS選擇
                    </Button>
                    <Button type="button" variant="outline">
                      上傳影像
                    </Button>
                  </div>

                  <FormField
                    control={form.control}
                    name="additionalInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>額外臨床資訊</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="輸入任何相關的臨床資訊，如症狀、病史等"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        生成中...
                      </>
                    ) : (
                      <>
                        <FileText className="mr-2 h-4 w-4" />
                        生成報告
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">報告預覽</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("form")}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      重新生成
                    </Button>
                    <Button size="sm" onClick={downloadReport} disabled={!report}>
                      <Download className="mr-2 h-4 w-4" />
                      下載報告
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <div className="mb-4 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-medium">病患ID: </span>
                      {form.getValues().patientId}
                    </div>
                    <div>
                      <span className="font-medium">病患姓名: </span>
                      {form.getValues().patientName}
                    </div>
                    <div>
                      <span className="font-medium">檢查日期: </span>
                      {form.getValues().studyDate}
                    </div>
                    <div>
                      <span className="font-medium">模型類型: </span>
                      {form.getValues().modelType === "traditional" ? "傳統影像處理 + LLM" : "多模態LLM"}
                    </div>
                  </div>

                  <div className="whitespace-pre-wrap rounded-md bg-muted/50 p-4 text-sm">
                    {report ? (
                      report
                    ) : (
                      <div className="flex h-[300px] items-center justify-center text-muted-foreground">
                        {loading ? "報告生成中..." : "尚未生成報告"}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

