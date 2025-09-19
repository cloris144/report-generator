// 環境變數驗證和類型定義
import { z } from "zod"

const envSchema = z.object({
  // 應用程式設定
  NEXT_PUBLIC_APP_NAME: z.string().default("醫學影像報告系統"),
  NEXT_PUBLIC_APP_VERSION: z.string().default("1.0.0"),
  NEXT_PUBLIC_APP_ENV: z.enum(["development", "staging", "production"]).default("development"),

  // 資料庫設定
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),

  // AI 模型設定
  OPENAI_API_KEY: z.string().min(1),
  OPENAI_MODEL: z.string().default("gpt-4o"),
  ANTHROPIC_API_KEY: z.string().optional(),
  GROQ_API_KEY: z.string().optional(),

  // 多模態模型設定
  LLAMA_MODEL_PATH: z.string().optional(),
  YOLO_MODEL_PATH: z.string().optional(),
  VIT_MODEL_PATH: z.string().optional(),

  // 醫療系統整合
  PACS_API_URL: z.string().url().optional(),
  PACS_API_KEY: z.string().optional(),
  PACS_AE_TITLE: z.string().default("AI_REPORT_SYSTEM"),

  FHIR_API_URL: z.string().url().optional(),
  FHIR_CLIENT_ID: z.string().optional(),
  FHIR_CLIENT_SECRET: z.string().optional(),

  HL7_ENDPOINT: z.string().url().optional(),
  HL7_API_KEY: z.string().optional(),

  // 知識圖譜設定
  NEO4J_URI: z.string().optional(),
  NEO4J_USERNAME: z.string().optional(),
  NEO4J_PASSWORD: z.string().optional(),

  ELASTICSEARCH_URL: z.string().url().optional(),
  ELASTICSEARCH_USERNAME: z.string().optional(),
  ELASTICSEARCH_PASSWORD: z.string().optional(),

  // 向量資料庫設定
  PINECONE_API_KEY: z.string().optional(),
  PINECONE_ENVIRONMENT: z.string().optional(),
  PINECONE_INDEX_NAME: z.string().optional(),

  WEAVIATE_URL: z.string().url().optional(),
  WEAVIATE_API_KEY: z.string().optional(),

  // 檔案儲存設定
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),
  AWS_REGION: z.string().optional(),
  AWS_S3_BUCKET: z.string().optional(),

  AZURE_STORAGE_ACCOUNT: z.string().optional(),
  AZURE_STORAGE_KEY: z.string().optional(),
  AZURE_CONTAINER_NAME: z.string().optional(),

  // 監控與日誌
  SENTRY_DSN: z.string().url().optional(),
  DATADOG_API_KEY: z.string().optional(),
  PROMETHEUS_ENDPOINT: z.string().url().optional(),

  // 安全設定
  JWT_SECRET: z.string().min(32),
  ENCRYPTION_KEY: z.string().min(32),
  SESSION_SECRET: z.string().min(32),

  // 電子郵件設定
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_USER: z.string().email().optional(),
  SMTP_PASSWORD: z.string().optional(),

  // 第三方服務
  SLACK_WEBHOOK_URL: z.string().url().optional(),
  TEAMS_WEBHOOK_URL: z.string().url().optional(),

  // 效能設定
  MAX_CONCURRENT_JOBS: z.coerce.number().default(5),
  MAX_FILE_SIZE_MB: z.coerce.number().default(50),
  CACHE_TTL_SECONDS: z.coerce.number().default(3600),
  REQUEST_TIMEOUT_MS: z.coerce.number().default(30000),

  // 開發設定
  DEBUG: z.coerce.boolean().default(false),
  LOG_LEVEL: z.enum(["error", "warn", "info", "debug"]).default("info"),
  ENABLE_SWAGGER: z.coerce.boolean().default(false),
})

// 驗證環境變數
function validateEnv() {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    console.error("❌ 環境變數驗證失敗:")
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) => {
        console.error(`  ${err.path.join(".")}: ${err.message}`)
      })
    }
    process.exit(1)
  }
}

export const env = validateEnv()

// 環境變數類型
export type Env = z.infer<typeof envSchema>

// 檢查必要的環境變數是否已設定
export function checkRequiredEnvVars() {
  const required = ["DATABASE_URL", "REDIS_URL", "OPENAI_API_KEY", "JWT_SECRET", "ENCRYPTION_KEY", "SESSION_SECRET"]

  const missing = required.filter((key) => !process.env[key])

  if (missing.length > 0) {
    console.error("❌ 缺少必要的環境變數:")
    missing.forEach((key) => console.error(`  ${key}`))
    console.error("\n請檢查 .env.local 文件或設定環境變數")
    return false
  }

  return true
}

// 獲取環境變數配置
export function getEnvConfig() {
  return {
    app: {
      name: env.NEXT_PUBLIC_APP_NAME,
      version: env.NEXT_PUBLIC_APP_VERSION,
      environment: env.NEXT_PUBLIC_APP_ENV,
      debug: env.DEBUG,
    },
    database: {
      url: env.DATABASE_URL,
      redis: env.REDIS_URL,
    },
    ai: {
      openai: {
        apiKey: env.OPENAI_API_KEY,
        model: env.OPENAI_MODEL,
      },
      anthropic: {
        apiKey: env.ANTHROPIC_API_KEY,
      },
      groq: {
        apiKey: env.GROQ_API_KEY,
      },
    },
    medical: {
      pacs: {
        url: env.PACS_API_URL,
        apiKey: env.PACS_API_KEY,
        aeTitle: env.PACS_AE_TITLE,
      },
      fhir: {
        url: env.FHIR_API_URL,
        clientId: env.FHIR_CLIENT_ID,
        clientSecret: env.FHIR_CLIENT_SECRET,
      },
      hl7: {
        endpoint: env.HL7_ENDPOINT,
        apiKey: env.HL7_API_KEY,
      },
    },
    storage: {
      aws: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
        region: env.AWS_REGION,
        bucket: env.AWS_S3_BUCKET,
      },
      azure: {
        account: env.AZURE_STORAGE_ACCOUNT,
        key: env.AZURE_STORAGE_KEY,
        container: env.AZURE_CONTAINER_NAME,
      },
    },
    performance: {
      maxConcurrentJobs: env.MAX_CONCURRENT_JOBS,
      maxFileSizeMB: env.MAX_FILE_SIZE_MB,
      cacheTTL: env.CACHE_TTL_SECONDS,
      requestTimeout: env.REQUEST_TIMEOUT_MS,
    },
  }
}
