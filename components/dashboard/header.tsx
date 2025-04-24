"use client"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, Bell, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"

export default function DashboardHeader() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-6">
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">開啟選單</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader className="px-6 py-4 border-b">
            <SheetTitle>導航選單</SheetTitle>
            <SheetDescription>選擇要導航的頁面</SheetDescription>
          </SheetHeader>
          <div className="flex h-full flex-col">
            <div className="flex h-16 shrink-0 items-center px-6">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 font-semibold"
                onClick={() => setSidebarOpen(false)}
              >
                <span>醫學影像報告系��</span>
              </Link>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="flex flex-col gap-1 px-4">
                <Link href="/dashboard" onClick={() => setSidebarOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    總覽
                  </Button>
                </Link>
                <Link href="/dashboard/reports" onClick={() => setSidebarOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    報告生成
                  </Button>
                </Link>
                <Link href="/dashboard/images" onClick={() => setSidebarOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    影像管理
                  </Button>
                </Link>
                <Link href="/dashboard/history" onClick={() => setSidebarOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    歷史報告
                  </Button>
                </Link>
                <Link href="/dashboard/profile" onClick={() => setSidebarOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    個人設定
                  </Button>
                </Link>
              </nav>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <div className="w-full flex-1 md:grow-0 lg:w-64">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="搜尋..."
            className="w-full rounded-md border border-input bg-background pl-8 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">通知</span>
        </Button>

        <ModeToggle />

        <div className="flex items-center gap-2">
          <Link href="/dashboard/profile">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-medium">醫</span>
              </div>
              <span className="hidden text-sm font-medium md:inline-block">醫師</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
}
