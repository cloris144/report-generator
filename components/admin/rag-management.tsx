"use client"

import { Slider } from "@/components/ui/slider"
import KnowledgeGraphVisualization from "./knowledge-graph-visualization"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Network,
  Database,
  FileText,
  Plus,
  RefreshCw,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Link,
  Eye,
  BookOpen,
  FileCode,
  Cpu,
  File,
} from "lucide-react"
import { DocumentUploadDialog } from "./document-upload-dialog"

interface KnowledgeNode {
  id: string
  name: string
  type: "concept" | "entity" | "relation"
  source: string
  connections: number
  status: "active" | "inactive"
  lastUpdated: string
}

interface KnowledgeSource {
  id: string
  name: string
  type: "medical" | "research" | "guideline" | "custom"
  documents: number
  status: "active" | "inactive" | "updating"
  lastUpdated: string
}

interface Document {
  id: string
  name: string
  size: string
  created: string
  status: "completed" | "processing" | "error"
}

export default function RagManagement() {
  const [nodes, setNodes] = useState<KnowledgeNode[]>([
    {
      id: "node001",
      name: "肺炎",
      type: "concept",
      source: "醫學詞典",
      connections: 24,
      status: "active",
      lastUpdated: "2025-03-15",
    },
    {
      id: "node002",
      name: "胸腔積液",
      type: "concept",
      source: "醫學詞典",
      connections: 18,
      status: "active",
      lastUpdated: "2025-03-15",
    },
    {
      id: "node003",
      name: "肺結節",
      type: "concept",
      source: "醫學詞典",
      connections: 15,
      status: "active",
      lastUpdated: "2025-03-15",
    },
    {
      id: "node004",
      name: "心臟擴大",
      type: "concept",
      source: "醫學詞典",
      connections: 12,
      status: "active",
      lastUpdated: "2025-03-15",
    },
    {
      id: "node005",
      name: "引起",
      type: "relation",
      source: "關係庫",
      connections: 32,
      status: "active",
      lastUpdated: "2025-03-15",
    },
    {
      id: "node006",
      name: "症狀表現",
      type: "relation",
      source: "關係庫",
      connections: 28,
      status: "active",
      lastUpdated: "2025-03-15",
    },
    {
      id: "node007",
      name: "肺炎球菌",
      type: "entity",
      source: "病原體庫",
      connections: 8,
      status: "active",
      lastUpdated: "2025-03-15",
    },
    {
      id: "node008",
      name: "結核桿菌",
      type: "entity",
      source: "病原體庫",
      connections: 6,
      status: "active",
      lastUpdated: "2025-03-15",
    },
  ])

  const [sources, setSources] = useState<KnowledgeSource[]>([
    {
      id: "src001",
      name: "PubMed 文獻",
      type: "research",
      documents: 1250,
      status: "active",
      lastUpdated: "2025-03-15",
    },
    {
      id: "src002",
      name: "醫學教科書",
      type: "medical",
      documents: 45,
      status: "active",
      lastUpdated: "2025-03-10",
    },
    {
      id: "src003",
      name: "臨床指南",
      type: "guideline",
      documents: 78,
      status: "active",
      lastUpdated: "2025-03-12",
    },
    {
      id: "src004",
      name: "放射學報告範例",
      type: "custom",
      documents: 520,
      status: "active",
      lastUpdated: "2025-03-18",
    },
    {
      id: "src005",
      name: "醫學影像註釋",
      type: "custom",
      documents: 350,
      status: "updating",
      lastUpdated: "2025-03-21",
    },
  ])

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "doc001",
      name: "DeepSeek_R1.pdf",
      size: "1.26 MB",
      created: "約 18 小時前",
      status: "completed",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [isAddNodeOpen, setIsAddNodeOpen] = useState(false)
  const [isDocumentUploadOpen, setIsDocumentUploadOpen] = useState(false)
  const [isAddSourceOpen, setIsAddSourceOpen] = useState(false)
  const [newNode, setNewNode] = useState({
    name: "",
    type: "concept" as "concept" | "entity" | "relation",
    source: "",
  })
  const [newSource, setNewSource] = useState({
    name: "",
    type: "medical" as "medical" | "research" | "guideline" | "custom",
  })

  const filteredNodes = nodes.filter(
    (node) =>
      node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.source.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddNode = () => {
    const node: KnowledgeNode = {
      id: `node${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      name: newNode.name,
      type: newNode.type,
      source: newNode.source,
      connections: 0,
      status: "active",
      lastUpdated: new Date().toISOString().split("T")[0],
    }

    setNodes([...nodes, node])
    setNewNode({
      name: "",
      type: "concept",
      source: "",
    })
    setIsAddNodeOpen(false)
  }

  const handleAddSource = () => {
    const source: KnowledgeSource = {
      id: `src${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      name: newSource.name,
      type: newSource.type,
      documents: 0,
      status: "active",
      lastUpdated: new Date().toISOString().split("T")[0],
    }

    setSources([...sources, source])
    setNewSource({
      name: "",
      type: "medical",
    })
    setIsAddSourceOpen(false)
  }

  const toggleNodeStatus = (nodeId: string) => {
    setNodes(
      nodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              status: node.status === "active" ? "inactive" : "active",
            }
          : node,
      ),
    )
  }

  const handleDocumentUploadComplete = (files: File[]) => {
    // Add the uploaded documents to the documents list
    const newDocuments = files.map((file) => ({
      id: `doc${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`,
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      created: "剛剛",
      status: "completed" as "completed" | "processing" | "error",
    }))

    setDocuments([...newDocuments, ...documents])
  }

  const getNodeTypeBadge = (type: string) => {
    switch (type) {
      case "concept":
        return <Badge className="bg-blue-500">概念</Badge>
      case "entity":
        return <Badge className="bg-green-500">實體</Badge>
      case "relation":
        return <Badge className="bg-purple-500">關係</Badge>
    }
  }

  const getSourceTypeBadge = (type: string) => {
    switch (type) {
      case "medical":
        return <Badge className="bg-blue-500">醫學</Badge>
      case "research":
        return <Badge className="bg-green-500">研究</Badge>
      case "guideline":
        return <Badge className="bg-purple-500">指南</Badge>
      case "custom":
        return <Badge className="bg-orange-500">自定義</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">啟用</Badge>
      case "inactive":
        return <Badge className="bg-gray-500">停用</Badge>
      case "updating":
        return <Badge className="bg-yellow-500">更新中</Badge>
      case "completed":
        return <Badge className="bg-green-500">已完成</Badge>
      case "processing":
        return <Badge className="bg-yellow-500">處理中</Badge>
      case "error":
        return <Badge className="bg-red-500">錯誤</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">知識節點</CardTitle>
            <CardDescription>系統中的知識圖譜節點</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{nodes.length}</div>
              <Network className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">知識來源</CardTitle>
            <CardDescription>系統中的知識來源數量</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{sources.length}</div>
              <Database className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">文檔數量</CardTitle>
            <CardDescription>系統中的知識文檔總數</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{sources.reduce((acc, src) => acc + src.documents, 0)}</div>
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">模型整合</CardTitle>
            <CardDescription>已整合的模型數量</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">2</div>
              <Cpu className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="documents">
        <TabsList>
          <TabsTrigger value="documents">知識文檔</TabsTrigger>
          <TabsTrigger value="nodes">知識節點</TabsTrigger>
          <TabsTrigger value="sources">知識來源</TabsTrigger>
          <TabsTrigger value="graph">圖譜視覺化</TabsTrigger>
        </TabsList>

        <TabsContent value="documents">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>知識庫</CardTitle>
                  <CardDescription>管理您的知識文檔</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    重新整理
                  </Button>
                  <Button size="sm" onClick={() => setIsDocumentUploadOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    新增文件
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="搜尋文檔..." className="pl-8" />
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>名稱</TableHead>
                      <TableHead>大小</TableHead>
                      <TableHead>創建時間</TableHead>
                      <TableHead>狀態</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documents.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          <div className="flex flex-col items-center gap-2">
                            <File className="h-8 w-8 text-muted-foreground" />
                            <p className="text-muted-foreground">尚無文檔</p>
                            <Button variant="outline" size="sm" onClick={() => setIsDocumentUploadOpen(true)}>
                              <Plus className="mr-2 h-4 w-4" />
                              新增文件
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      documents.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span>{doc.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{doc.size}</TableCell>
                          <TableCell>{doc.created}</TableCell>
                          <TableCell>{getStatusBadge(doc.status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>文檔操作</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" />
                                    查看文檔
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    編輯標籤
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    重新處理
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    刪除文檔
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nodes">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>知識節點管理</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    重新整理
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="搜尋節點..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>節點名稱</TableHead>
                      <TableHead>類型</TableHead>
                      <TableHead>來源</TableHead>
                      <TableHead>連接數</TableHead>
                      <TableHead>狀態</TableHead>
                      <TableHead>最後更新</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredNodes.map((node) => (
                      <TableRow key={node.id}>
                        <TableCell>{node.name}</TableCell>
                        <TableCell>{getNodeTypeBadge(node.type)}</TableCell>
                        <TableCell>{node.source}</TableCell>
                        <TableCell>{node.connections}</TableCell>
                        <TableCell>{getStatusBadge(node.status)}</TableCell>
                        <TableCell>{node.lastUpdated}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Link className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>知識來源管理</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    重新整理
                  </Button>
                  <Dialog open={isAddSourceOpen} onOpenChange={setIsAddSourceOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        新增來源
                      </Button>
                    </DialogTrigger>
                    <DialogContent aria-describedby="add-source-dialog-description">
                      <DialogHeader>
                        <DialogTitle>新增知識來源</DialogTitle>
                        <DialogDescription id="add-source-dialog-description">
                          建立新的知識來源，設定名稱和類型。
                        </DialogDescription>
                      </DialogHeader>

                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="source-name" className="text-right">
                            來源名稱
                          </Label>
                          <Input
                            id="source-name"
                            value={newSource.name}
                            onChange={(e) => setNewSource({ ...newSource, name: e.target.value })}
                            className="col-span-3"
                            placeholder="例如：醫學期刊資料庫"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="source-type" className="text-right">
                            來源類型
                          </Label>
                          <select
                            id="source-type"
                            value={newSource.type}
                            onChange={(e) =>
                              setNewSource({
                                ...newSource,
                                type: e.target.value as "medical" | "research" | "guideline" | "custom",
                              })
                            }
                            className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="medical">醫學資源</option>
                            <option value="research">研究文獻</option>
                            <option value="guideline">臨床指南</option>
                            <option value="custom">自定義資源</option>
                          </select>
                        </div>
                      </div>

                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddSourceOpen(false)}>
                          取消
                        </Button>
                        <Button onClick={handleAddSource} disabled={!newSource.name.trim()}>
                          新增來源
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>名稱</TableHead>
                      <TableHead>類型</TableHead>
                      <TableHead>文檔數量</TableHead>
                      <TableHead>狀態</TableHead>
                      <TableHead>最後更新</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sources.map((source) => (
                      <TableRow key={source.id}>
                        <TableCell>{source.name}</TableCell>
                        <TableCell>{getSourceTypeBadge(source.type)}</TableCell>
                        <TableCell>{source.documents}</TableCell>
                        <TableCell>{getStatusBadge(source.status)}</TableCell>
                        <TableCell>{source.lastUpdated}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <BookOpen className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>來源操作</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  編輯來源
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  刪除來源
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="graph">
          <Card>
            <CardHeader>
              <CardTitle>知識圖譜視覺化</CardTitle>
              <CardDescription>視覺化查看知識圖譜的節點和關係</CardDescription>
            </CardHeader>
            <CardContent>
              <KnowledgeGraphVisualization />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>LightRAG 整合設定</CardTitle>
          <CardDescription>設定知識圖譜與生成模型的整合參數</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="retrievalMethod">檢索方法</Label>
                <select
                  id="retrievalMethod"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="hybrid"
                >
                  <option value="semantic">語義檢索</option>
                  <option value="graph">圖譜檢索</option>
                  <option value="hybrid">混合檢索</option>
                </select>
                <p className="text-sm text-muted-foreground">選擇知識檢索的方法</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="embeddingModel">嵌入模型</Label>
                <select
                  id="embeddingModel"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="e5"
                >
                  <option value="e5">E5 Large</option>
                  <option value="bge">BGE Large</option>
                  <option value="openai">OpenAI Ada</option>
                </select>
                <p className="text-sm text-muted-foreground">選擇用於文本嵌入的模型</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">檢索參數</h3>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>檢索數量 (Top-K)</Label>
                    <span className="text-sm">5</span>
                  </div>
                  <Slider defaultValue={[5]} min={1} max={20} step={1} />
                  <p className="text-sm text-muted-foreground">設定每次檢索的文檔數量</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>相似度閾值</Label>
                    <span className="text-sm">0.75</span>
                  </div>
                  <Slider defaultValue={[0.75]} min={0} max={1} step={0.05} />
                  <p className="text-sm text-muted-foreground">設定檢索結果的最低相似度閾值</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">整合設定</h3>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableAutoUpdate">自動更新知識圖譜</Label>
                    <p className="text-sm text-muted-foreground">根據新的文檔自動更新知識圖譜</p>
                  </div>
                  <Switch id="enableAutoUpdate" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableCaching">啟用檢索快取</Label>
                    <p className="text-sm text-muted-foreground">快取常用查詢的檢索結果以提高性能</p>
                  </div>
                  <Switch id="enableCaching" defaultChecked />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">模型整合</h3>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="promptTemplate">提示詞模板</Label>
                  <textarea
                    id="promptTemplate"
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue={`根據以下檢索到的醫學知識，生成一份胸腔X光報告：

{context}

請根據以上知識，為以下影像生成報告：
{query}`}
                  />
                  <p className="text-sm text-muted-foreground">設定發送給LLM的提示詞模板</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contextFormat">上下文格式</Label>
                  <select
                    id="contextFormat"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue="structured"
                  >
                    <option value="raw">原始文本</option>
                    <option value="structured">結構化格式</option>
                    <option value="graph">圖譜格式</option>
                  </select>
                  <p className="text-sm text-muted-foreground">選擇發送給LLM的上下文格式</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          重置設定
        </Button>
        <Button>
          <FileCode className="mr-2 h-4 w-4" />
          保存設定
        </Button>
      </div>

      {/* Document Upload Dialog */}
      <DocumentUploadDialog
        open={isDocumentUploadOpen}
        onOpenChange={setIsDocumentUploadOpen}
        onUploadComplete={handleDocumentUploadComplete}
      />
    </div>
  )
}
