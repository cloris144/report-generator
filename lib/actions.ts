"use server"

import type { ReportData } from "./types"

// 使用 LightRAG 增強 LLM 的醫學知識
async function enhanceWithLightRAG(prompt: string): Promise<string> {
  // 模擬 LightRAG 知識檢索
  // 實際實現時，這裡會連接到醫學知識庫
  await new Promise((resolve) => setTimeout(resolve, 500))
  return prompt
}

// 生成 FHIR 格式的報告
function generateFHIRReport(data: any) {
  return {
    resourceType: "DiagnosticReport",
    status: "final",
    category: [
      {
        coding: [
          {
            system: "http://terminology.hl7.org/CodeSystem/v2-0074",
            code: "RAD",
            display: "Radiology",
          },
        ],
      },
    ],
    code: {
      coding: [
        {
          system: "http://loinc.org",
          code: "36642-7",
          display: "Chest X-ray",
        },
      ],
    },
    subject: {
      reference: `Patient/${data.patientId}`,
      display: data.patientName,
    },
    effectiveDateTime: data.studyDate,
    issued: new Date().toISOString(),
    performer: [
      {
        reference: "Organization/hospital",
        display: "AI Reporting System",
      },
    ],
    result: [
      {
        reference: "Observation/xray-finding",
      },
    ],
    conclusion: data.content,
    conclusionCode: [
      {
        coding: [
          {
            system: "http://snomed.info/sct",
            code: "168731009",
            display: "Chest X-ray normal",
          },
        ],
      },
    ],
  }
}

export async function generateReport(data: ReportData): Promise<string> {
  // 模擬報告生成延遲
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // 使用 LightRAG 增強 LLM 的醫學知識
  const enhancedPrompt = await enhanceWithLightRAG(
    `生成胸腔X光報告，病患ID: ${data.patientId}, 臨床資訊: ${data.additionalInfo}`,
  )

  // 根據不同的模型類型生成不同的報告
  let reportContent = ""
  if (data.reportType === "traditional") {
    reportContent = await generateTraditionalReport(data, enhancedPrompt)
  } else {
    reportContent = await generateMultimodalReport(data, enhancedPrompt)
  }

  // 生成 FHIR 格式報告
  const fhirReport = generateFHIRReport({
    ...data,
    content: reportContent,
  })

  // 在報告中添加 FHIR 資訊
  return `${reportContent}

【FHIR 報告資訊】
Resource ID: ${fhirReport.resourceType}/${Math.random().toString(36).substr(2, 9)}
Status: ${fhirReport.status}
Category: ${fhirReport.category[0].coding[0].display}
Effective DateTime: ${fhirReport.effectiveDateTime}
Issued: ${fhirReport.issued}
`
}

async function generateTraditionalReport(data: ReportData, enhancedPrompt: string): Promise<string> {
  // 模擬影像處理步驟
  const imageAnalysis = {
    lungFields: "正常",
    heartSize: "正常範圍",
    mediastinum: "無異常",
    pleuralSpaces: "清晰",
    bonyStructures: "完整",
    confidence: 0.92,
  }

  return `
胸腔X光檢查報告
==========================================
病患ID: ${data.patientId}
病患姓名: ${data.patientName}
檢查日期: ${data.studyDate}
報告生成方法: 傳統影像處理 + LLM
模型信心度: ${(imageAnalysis.confidence * 100).toFixed(1)}%
==========================================

【檢查類型】
胸部X光檢查 (Chest X-ray)

【臨床資訊】
${data.additionalInfo || "無特殊臨床資訊提供"}

【影像處理分析結果】
- 肺野分析: ${imageAnalysis.lungFields}
- 心臟大小: ${imageAnalysis.heartSize}
- 縱隔: ${imageAnalysis.mediastinum}
- 肋膜腔: ${imageAnalysis.pleuralSpaces}
- 骨骼結構: ${imageAnalysis.bonyStructures}

【影像描述】
肺野:
- 雙側肺野透明度正常，無明顯浸潤性病變或結節影
- 肺紋理分布正常，無明顯增強或紊亂
- 未見肺氣腫或肺纖維化的表現

心臟及縱隔:
- 心臟大小正常，心胸比例約為0.48
- 主動脈結正常，無明顯擴張
- 縱隔無明顯腫塊或擴大

肋膜及胸膜:
- 雙側肋膜腔無明顯積液
- 肋膜無明顯增厚或鈣化

骨骼結構:
- 可見骨骼結構完整，無明顯骨質破壞或異常

橫膈:
- 雙側橫膈輪廓清晰，位置正常

【診斷結果】
正常胸部X光表現，無明顯異常發現。

【ICD-10編碼】
Z01.6 - 放射學檢查，未另行分類者

【SNOMED CT編碼】
168731009 - 正常胸部X光檢查

【建議】
目前無需進一步影像學檢查。
建議根據臨床需要進行定期追蹤。

【AI 模型資訊】
- 使用模型: YOLOv8 + ViT + GPT-4
- 影像處理信心度: ${(imageAnalysis.confidence * 100).toFixed(1)}%
- LightRAG 知識增強: 已應用
- 品質控制: 通過

==========================================
報告生成時間: ${new Date().toISOString()}
報告ID: RPT${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")}
==========================================
`
}

async function generateMultimodalReport(data: ReportData, enhancedPrompt: string): Promise<string> {
  // 模擬多模態 LLM 分析結果
  const multimodalAnalysis = {
    abnormalFindings: ["右上肺結節", "心臟輕度擴大", "右側少量胸腔積液"],
    confidence: 0.89,
    modelType: "Llama-3.2-Vision",
  }

  return `
胸腔X光檢查報告
==========================================
病患ID: ${data.patientId}
病患姓名: ${data.patientName}
檢查日期: ${data.studyDate}
報告生成方法: 多模態LLM (${multimodalAnalysis.modelType})
模型信心度: ${(multimodalAnalysis.confidence * 100).toFixed(1)}%
==========================================

【檢查類型】
胸部X光檢查 (Chest X-ray)

【臨床資訊】
${data.additionalInfo || "無特殊臨床資訊提供"}

【多模態LLM分析結果】
檢測到的異常發現:
${multimodalAnalysis.abnormalFindings.map((finding, index) => `${index + 1}. ${finding}`).join("\n")}

【影像描述】
整體評估:
- 技術品質良好，無明顯體位或曝光問題
- 雙側肺野透明度大致對稱

肺野:
- 右上肺野可見一約0.8cm大小的結節狀陰影，邊界尚清晰
- 左側肺野未見明顯結節或浸潤性病變
- 肺紋理輕度增強，尤其在雙下肺野

心臟及縱隔:
- 心臟輕度擴大，心胸比例約為0.52
- 主動脈結輕度突出
- 縱隔無明顯移位

肋膜及胸膜:
- 右側肋膜腔可見少量積液
- 左側肋膜無明顯異常

骨骼結構:
- 可見骨骼結構完整，無明顯骨質破壞

橫膈:
- 雙側橫膈輪廓清晰，右側略高於左側

【診斷結果】
1. 右上肺野可見結節狀陰影，建議進一步CT檢查以排除腫瘤可能
2. 心臟輕度擴大，建議心臟超音波評估
3. 右側少量胸腔積液

【ICD-10編碼】
R91.1 - 肺部結節性病變，未另行分類者
R93.1 - 心臟及冠狀循環的異常影像學發現
J90 - 胸腔積液，未另行分類者

【SNOMED CT編碼】
274710003 - 肺結節
8517006 - 心臟擴大
60046008 - 胸腔積液

【建議】
1. 建議進行胸部CT檢查，進一步評估右上肺結節
2. 建議心臟超音波檢查，評估心臟功能
3. 臨床追蹤右側胸腔積液變化
4. 2-4週後複查胸部X光

【AI 模型資訊】
- 使用模型: ${multimodalAnalysis.modelType}
- 模型信心度: ${(multimodalAnalysis.confidence * 100).toFixed(1)}%
- LightRAG 知識增強: 已應用
- 品質控制: 通過

==========================================
報告生成時間: ${new Date().toISOString()}
報告ID: RPT${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")}
==========================================
`
}
