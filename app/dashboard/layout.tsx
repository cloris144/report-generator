import type React from "react"
import { Toaster } from "@/components/ui/toaster"
import DashboardSidebar from "@/components/dashboard/sidebar"
import DashboardHeader from "@/components/dashboard/header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 這裡可以添加身份驗證檢查
  // const isAuthenticated = await checkAuth();
  // if (!isAuthenticated) redirect("/auth/login");

  return (
    <div className="relative min-h-screen">
      <div className="flex">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col lg:pl-64">
          <DashboardHeader />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

