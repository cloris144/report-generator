"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Settings, Users, Cpu, LogOut, Network } from "lucide-react"

const navigation = [
  {
    name: "總覽",
    href: "/admin",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    name: "模型管理",
    href: "/admin/models",
    icon: Cpu,
  },
  {
    name: "系統設定",
    href: "/admin/settings",
    icon: Settings,
  },
  {
    name: "用戶管理",
    href: "/admin/users",
    icon: Users,
  },
  {
    name: "知識圖譜管理",
    href: "/admin/rag",
    icon: Network,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-64 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-background px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <Cpu className="h-6 w-6" />
            <span>管理後台</span>
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
