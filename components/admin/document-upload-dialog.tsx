"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ArrowUp, FileText, Settings, X, CheckCircle, Database } from "lucide-react"
import { cn } from "@/lib/utils"

interface DocumentUploadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUploadComplete?: (files: File[]) => void
}

export function DocumentUploadDialog({ open, onOpenChange, onUploadComplete }: DocumentUploadDialogProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [selectedSource, setSelectedSource] = useState<string>("")

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files)
      setFiles(newFiles)
      setStep(3)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setFiles(newFiles)
      setStep(3)
    }
  }

  const handleUploadClick = () => {
    const fileInput = document.getElementById("file-upload") as HTMLInputElement
    fileInput.click()
  }

  const handleProcessFiles = () => {
    setStep(4)
    // Simulate processing
    setTimeout(() => {
      if (onUploadComplete) {
        onUploadComplete(files)
      }
      onOpenChange(false)
      // Reset state for next time
      setStep(1)
      setFiles([])
      setSelectedSource("")
    }, 1500)
  }

  const resetUpload = () => {
    setFiles([])
    setStep(2)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle>新增文件</DialogTitle>
          <DialogDescription>上傳文件到您的知識庫。支持的格式：PDF、DOCX、Markdown 和文本文件。</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border",
                  step === 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                )}
              >
                <Database className="h-4 w-4" />
              </div>
              <span className={step === 1 ? "font-medium" : "text-muted-foreground"}>1. 選擇來源</span>
            </div>
            <div className="h-px w-8 bg-border"></div>
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border",
                  step === 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                )}
              >
                <ArrowUp className="h-4 w-4" />
              </div>
              <span className={step === 2 ? "font-medium" : "text-muted-foreground"}>2. 上傳</span>
            </div>
            <div className="h-px w-8 bg-border"></div>
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border",
                  step === 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                )}
              >
                <FileText className="h-4 w-4" />
              </div>
              <span className={step === 3 ? "font-medium" : "text-muted-foreground"}>3. 預覽</span>
            </div>
            <div className="h-px w-8 bg-border"></div>
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border",
                  step === 4 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                )}
              >
                <Settings className="h-4 w-4" />
              </div>
              <span className={step === 4 ? "font-medium" : "text-muted-foreground"}>4. 處理</span>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-lg font-medium mb-2">選擇知識來源</h3>
                <p className="text-sm text-muted-foreground">請選擇要將文檔新增到哪個知識來源</p>
              </div>

              <div className="grid gap-3">
                {["PubMed 文獻", "醫學教科書", "臨床指南", "放射學報告範例", "醫學影像註釋"].map((source) => (
                  <div
                    key={source}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedSource === source
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedSource(source)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{source}</span>
                      {selectedSource === source && <CheckCircle className="h-5 w-5 text-primary" />}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setStep(2)} disabled={!selectedSource}>
                  下一步
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-12 text-center",
                isDragging ? "border-primary bg-primary/5" : "border-border",
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center gap-4">
                <ArrowUp className="h-10 w-10 text-muted-foreground" />
                <div>
                  <p className="font-medium">拖放您的文件到此處或點擊瀏覽</p>
                  <p className="text-sm text-muted-foreground mt-1">支持 PDF、DOCX、TXT 和 MD 文件</p>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.docx,.txt,.md,.markdown"
                  onChange={handleFileChange}
                  multiple
                />
                <Button onClick={handleUploadClick}>上傳文件</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">文件預覽</h3>
                  <Button variant="ghost" size="sm" onClick={resetUpload}>
                    <X className="h-4 w-4 mr-1" />
                    重新選擇
                  </Button>
                </div>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center p-2 bg-muted rounded">
                      <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleProcessFiles}>處理文件</Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center p-8">
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <div>
                  <p className="font-medium">正在處理您的文件...</p>
                  <p className="text-sm text-muted-foreground mt-1">這可能需要幾分鐘時間，請勿關閉此窗口。</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
