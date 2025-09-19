"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, MoreHorizontal, RefreshCw, Mail, Key } from "lucide-react"

type UserRole = "admin" | "doctor" | "researcher" | "viewer"

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  department: string
  status: "active" | "inactive" | "pending"
  lastLogin: string
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "USR001",
      name: "王大明",
      email: "wang@hospital.org",
      role: "admin",
      department: "放射科",
      status: "active",
      lastLogin: "2025-03-21 08:45",
    },
    {
      id: "USR002",
      name: "李小華",
      email: "lee@hospital.org",
      role: "doctor",
      department: "放射科",
      status: "active",
      lastLogin: "2025-03-21 09:30",
    },
    {
      id: "USR003",
      name: "張醫師",
      email: "chang@hospital.org",
      role: "doctor",
      department: "內科",
      status: "active",
      lastLogin: "2025-03-20 14:15",
    },
    {
      id: "USR004",
      name: "陳研究",
      email: "chen@hospital.org",
      role: "researcher",
      department: "研究部",
      status: "active",
      lastLogin: "2025-03-19 11:20",
    },
    {
      id: "USR005",
      name: "林觀察",
      email: "lin@hospital.org",
      role: "viewer",
      department: "行政部",
      status: "inactive",
      lastLogin: "2025-03-15 10:05",
    },
    {
      id: "USR006",
      name: "黃新人",
      email: "huang@hospital.org",
      role: "doctor",
      department: "放射科",
      status: "pending",
      lastLogin: "尚未登入",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "doctor" as UserRole,
    department: "",
  })

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddUser = () => {
    const user: User = {
      id: `USR${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      department: newUser.department,
      status: "pending",
      lastLogin: "尚未登入",
    }

    setUsers([...users, user])
    setNewUser({
      name: "",
      email: "",
      role: "doctor",
      department: "",
    })
    setIsAddUserOpen(false)
  }

  const toggleUserStatus = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === "active" ? "inactive" : "active",
            }
          : user,
      ),
    )
  }

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-red-500">管理員</Badge>
      case "doctor":
        return <Badge className="bg-blue-500">醫師</Badge>
      case "researcher":
        return <Badge className="bg-green-500">研究員</Badge>
      case "viewer":
        return <Badge className="bg-gray-500">觀察者</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">啟用</Badge>
      case "inactive":
        return <Badge className="bg-gray-500">停用</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">待啟用</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">總用戶數</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">系統中的用戶總數</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">活躍用戶</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter((u) => u.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">當前活躍的用戶數量</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">醫師用戶</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter((u) => u.role === "doctor").length}</div>
            <p className="text-xs text-muted-foreground">系統中的醫師用戶數量</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜尋用戶..."
              className="pl-8 w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            重新整理
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild></DialogTrigger>
            <DialogContent aria-describedby="add-user-dialog-description">
              <DialogHeader>
                <DialogTitle>新增用戶</DialogTitle>
                <DialogDescription id="add-user-dialog-description">
                  填寫以下資訊以新增用戶。用戶將收到啟用電子郵件。
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    姓名
                  </Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    電子郵件
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    角色
                  </Label>
                  <select
                    id="role"
                    value={newUser.role}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        role: e.target.value as UserRole,
                      })
                    }
                    className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="admin">管理員</option>
                    <option value="doctor">醫師</option>
                    <option value="researcher">研究員</option>
                    <option value="viewer">觀察者</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="department" className="text-right">
                    部門
                  </Label>
                  <Input
                    id="department"
                    value={newUser.department}
                    onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                  取消
                </Button>
                <Button onClick={handleAddUser}>新增用戶</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>用戶資訊</TableHead>
                <TableHead>角色</TableHead>
                <TableHead>部門</TableHead>
                <TableHead>狀態</TableHead>
                <TableHead>最後登入</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                  </TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Key className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center"
                        onClick={() => toggleUserStatus(user.id)}
                      >
                        <Switch checked={user.status === "active"} className="mr-2" />
                        {user.status === "active" ? "停用" : "啟用"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
