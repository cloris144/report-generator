"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FileText, Image, History, User, LogOut } from "lucide-react"

const navigation = [
  {
    name: "總覽",
    href: "/dashboard",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    name: "報告生成",
    href: "/dashboard/reports",
    icon: FileText,
  },
  {
    name: "影像管理",
    href: "/dashboard/images",
    icon: Image,
  },
  {
    name: "歷史報告",
    href: "/dashboard/history",
    icon: History,
  },
  {
    name: "個人設定",
    href: "/dashboard/profile",
    icon: User,
  },
]

export default function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-64 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-background px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Image className="h-6 w-6" />
            <span>醫學影像報告系統</span>
          </Link>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-2">
            {navigation.map((item) => {
              const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href)

              return (
                <li key={item.href}>
                  <Link href={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn("w-full justify-start", isActive && "bg-muted")}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </Button>
                  </Link>
                </li>
              )
            })}

            <li className="mt-auto">
              <Link href="/auth/login">
                <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                  <LogOut className="mr-2 h-4 w-4" />
                  登出
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

