"use client"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, Bell, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { LayoutDashboard, Cpu, Settings, Users, Network } from "lucide-react"

export default function AdminHeader() {
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
        <SheetContent side="left" className="w-64 p-0" aria-describedby="mobile-menu-description">
          <SheetHeader className="px-6 py-4 ">
            <SheetTitle>
              <div className="flex h-16 shrink-0">
                <Link
                  href="/admin"
                  className="flex items-center gap-2 font-semibold"
                  onClick={() => setSidebarOpen(false)}
                >
                  <Cpu className="h-6 w-6" />
                  <span>管理後台</span>
                </Link>
              </div>
            </SheetTitle>
            <SheetDescription id="mobile-menu-description" className="sr-only">
              移動端導航菜單
            </SheetDescription>
          </SheetHeader>
          {/* 移動端側邊欄內容 */}
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-auto py-2">
              <nav className="flex flex-col gap-1 px-4">
                <Link href="/admin" onClick={() => setSidebarOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    總覽
                  </Button>
                </Link>
                <Link href="/admin/models" onClick={() => setSidebarOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <Cpu className="mr-2 h-4 w-4" />
                    模型管理
                  </Button>
                </Link>
                <Link href="/admin/settings" onClick={() => setSidebarOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    系統設定
                  </Button>
                </Link>
                <Link href="/admin/users" onClick={() => setSidebarOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    用戶管理
                  </Button>
                </Link>
                <Link href="/admin/rag" onClick={() => setSidebarOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <Network className="mr-2 h-4 w-4" />
                    知識圖譜管理
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
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-medium">沈</span>
            </div>
            <span className="hidden text-sm font-medium md:inline-block">管理員</span>
          </div>
        </div>
      </div>
    </header>
  )
}
