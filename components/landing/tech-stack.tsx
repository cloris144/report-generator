import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const techCategories = [
  {
    category: "前端技術",
    technologies: ["Next.js 15", "React 18", "TypeScript", "Tailwind CSS", "Shadcn/ui"],
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
  {
    category: "本地端 AI 模型",
    technologies: ["Llama-3.2-Vision", "Qwen2-VL", "本地端推理引擎", "CUDA 加速", "TensorRT 優化"],
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  },
  {
    category: "後端服務",
    technologies: ["Node.js", "PostgreSQL", "Redis", "本地端向量資料庫", "FastAPI"],
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  },
  {
    category: "醫療標準",
    technologies: ["FHIR R4", "DICOM", "HL7", "ICD-10", "SNOMED CT"],
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  },
  {
    category: "本地端部署",
    technologies: ["Docker", "NVIDIA GPU", "Ubuntu Server", "本地端儲存", "離線運作"],
    color: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  },
  {
    category: "安全合規",
    technologies: ["本地端加密", "離線認證", "RBAC", "審計日誌", "HIPAA 合規"],
    color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
  },
]

export default function TechStack() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">技術架構</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            採用最先進的技術棧，確保系統的可靠性、擴展性和安全性
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg">{category.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className={category.color}>
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Architecture Diagram */}
        <div className="mt-16">
          
        </div>
      </div>
    </section>
  )
}
