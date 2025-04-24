import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold">醫學影像報告系統</CardTitle>
          <CardDescription>請登入以繼續使用系統</CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="doctor" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="doctor">醫師登入</TabsTrigger>
              <TabsTrigger value="admin">管理員登入</TabsTrigger>
            </TabsList>

            <TabsContent value="doctor" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="email-doctor">電子郵件</Label>
                <Input id="email-doctor" placeholder="doctor@example.com" type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-doctor">密碼</Label>
                <Input id="password-doctor" type="password" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="remember-doctor" className="rounded border-gray-300" />
                  <label htmlFor="remember-doctor" className="text-sm">
                    記住我
                  </label>
                </div>
                <Link href="/auth/forgot-password" className="text-sm text-primary">
                  忘記密碼?
                </Link>
              </div>
              <Button className="w-full" asChild>
                <Link href="/dashboard">醫師登入</Link>
              </Button>
            </TabsContent>

            <TabsContent value="admin" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="email-admin">電子郵件</Label>
                <Input id="email-admin" placeholder="admin@example.com" type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-admin">密碼</Label>
                <Input id="password-admin" type="password" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="remember-admin" className="rounded border-gray-300" />
                  <label htmlFor="remember-admin" className="text-sm">
                    記住我
                  </label>
                </div>
                <Link href="/auth/forgot-password" className="text-sm text-primary">
                  忘記密碼?
                </Link>
              </div>
              <Button className="w-full" asChild>
                <Link href="/admin">管理員登入</Link>
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

