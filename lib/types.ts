export type ReportType = "traditional" | "multimodal"

export interface ReportData {
  patientId: string;
  patientName: string;  | "multimodal"

export interface ReportData {
  patientId: string
  patientName: string
  studyDate: string
  imageUrl: string
  reportType: ReportType
  additionalInfo: string
}

export interface Report {
  id: string
  patientId: string
  patientName: string
  date: string
  content: string
  modelType: ReportType
  status: "pending" | "completed" | "error"
  createdAt: string
}
