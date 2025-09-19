"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Mail, Phone, MapPin, Clock } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    hospital: "",
    title: "",
    message: "",
    planInterest: "professional",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回首頁
            </Link>
            <h1 className="text-2xl font-bold">聯繫我們</h1>
            <div></div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">立即聯繫我們</CardTitle>
              <p className="text-muted-foreground">填寫以下表單，我們的專業團隊將在 24 小時內與您聯繫</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">姓名 *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="請輸入您的姓名"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">電子郵件 *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">電話號碼</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="09xx-xxx-xxx"
                    />
                  </div>
                  <div>
                    <Label htmlFor="title">職稱</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="例如：放射科主任"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="hospital">醫療機構名稱 *</Label>
                  <Input
                    id="hospital"
                    name="hospital"
                    value={formData.hospital}
                    onChange={handleInputChange}
                    placeholder="請輸入您的醫院或診所名稱"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="planInterest">感興趣的方案</Label>
                  <select
                    id="planInterest"
                    name="planInterest"
                    value={formData.planInterest}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="basic">基礎版</option>
                    <option value="professional">專業版</option>
                    <option value="enterprise">企業版</option>
                    <option value="custom">客製化方案</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="message">詳細需求 *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="請詳細描述您的需求，包括影像數量、整合需求、預算範圍等..."
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  提交諮詢需求
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card>
              <CardHeader>
                <CardTitle>聯繫資訊</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">電話</p>
                    <p className="text-muted-foreground">02-1234-5678</p>
                    <p className="text-sm text-muted-foreground">週一至週五 9:00-18:00</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">電子郵件</p>
                    <p className="text-muted-foreground">contact@medreport-ai.com</p>
                    <p className="text-sm text-muted-foreground">我們會在 24 小時內回覆</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">地址</p>
                    <p className="text-muted-foreground">台北市信義區信義路五段7號</p>
                    <p className="text-muted-foreground">35樓 MedReport AI</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">營業時間</p>
                    <p className="text-muted-foreground">週一至週五 9:00-18:00</p>
                    <p className="text-muted-foreground">週六 9:00-12:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sales Team */}
            <Card>
              <CardHeader>
                <CardTitle>專業團隊</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    林
                  </div>
                  <div>
                    <p className="font-medium">林經理</p>
                    <p className="text-sm text-muted-foreground">企業解決方案</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
                    陳
                  </div>
                  <div>
                    <p className="font-medium">陳博士</p>
                    <p className="text-sm text-muted-foreground">技術諮詢專家</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
                    王
                  </div>
                  <div>
                    <p className="font-medium">王顧問</p>
                    <p className="text-sm text-muted-foreground">醫療資訊顧問</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>快速行動</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/demo" className="block">
                  <Button variant="outline" className="w-full bg-transparent">
                    免費體驗 Demo
                  </Button>
                </Link>
                <Button variant="outline" className="w-full bg-transparent">
                  下載產品手冊
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  預約線上會議
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
