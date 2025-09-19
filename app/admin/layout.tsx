import type React from "react"
import { Toaster } from "@/components/ui/sonner"
import AdminSidebar from "@/components/admin/sidebar"
import AdminHeader from "@/components/admin/header"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 這裡可以添加管理員身份驗證檢查
  // const isAdmin = await checkAdminAuth();
  // if (!isAdmin) redirect("/auth/login");

  return (
    <div className="relative min-h-screen">
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 flex flex-col lg:pl-64">
          <AdminHeader />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
