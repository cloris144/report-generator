"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ZoomIn, ZoomOut, RefreshCw, Filter } from "lucide-react"

export default function KnowledgeGraphVisualization() {
  const [showOnlyConceptNodes, setShowOnlyConceptNodes] = useState(false)
  const [showLabels, setShowLabels] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 p-4 bg-muted rounded-md">
        <div className="flex items-center space-x-2">
          <Switch id="filter-nodes" checked={showOnlyConceptNodes} onCheckedChange={setShowOnlyConceptNodes} />
          <Label htmlFor="filter-nodes">僅顯示概念節點</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="show-labels" checked={showLabels} onCheckedChange={setShowLabels} />
          <Label htmlFor="show-labels">顯示標籤</Label>
        </div>

        <Button variant="outline" size="sm" className="ml-auto">
          <Filter className="mr-2 h-4 w-4" />
          更多過濾選項
        </Button>
      </div>

      <div
        ref={containerRef}
        className="h-[600px] w-full border rounded-md bg-white dark:bg-gray-900 relative overflow-hidden"
      >
        {/* 控制按鈕 */}
        <div className="absolute top-2 right-2 flex gap-2 z-10">
          <Button variant="outline" size="icon">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        {/* 圖例 */}
        <div className="absolute top-2 left-2 bg-white dark:bg-gray-800 p-2 rounded-md shadow-md z-10">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
              <span className="text-xs">概念</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
              <span className="text-xs">實體</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded-sm"></div>
              <span className="text-xs">關係</span>
            </div>
          </div>
        </div>

        {/* 知識圖譜視覺化 */}
        <div className="flex items-center justify-center h-full">
          <div className="text-center p-8 max-w-md">
            <h3 className="text-lg font-medium mb-4">知識圖譜視覺化</h3>
            <p className="text-muted-foreground mb-6">這裡顯示醫學知識圖譜的視覺化表示，包含概念、實體和關係。</p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {/* 概念節點示例 */}
              <div className="p-3 bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 rounded-md text-center">
                <div className="font-bold text-sm">肺炎</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">概念</div>
              </div>

              {/* 實體節點示例 */}
              <div className="p-3 bg-green-100 dark:bg-green-900 border-2 border-green-500 rounded-md text-center">
                <div className="font-bold text-sm">肺炎球菌</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">實體</div>
              </div>

              {/* 關係節點示例 */}
              <div className="p-3 bg-purple-100 dark:bg-purple-900 border-2 border-purple-500 rounded-md text-center">
                <div className="font-bold text-sm">引起</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">關係</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              互動式知識圖譜視覺化將在此處顯示，您可以拖動節點、縮放視圖，以及通過連接節點來創建新的關係。
            </p>
          </div>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        提示：您可以拖動節點重新排列，也可以拖動背景來平移視圖。使用縮放按鈕調整視圖大小。
      </div>
    </div>
  )
}
