// 配置管理工具
import { env } from "./env"

export class ConfigManager {
  private static instance: ConfigManager
  private config: Record<string, any> = {}

  private constructor() {
    this.loadConfig()
  }

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager()
    }
    return ConfigManager.instance
  }

  private loadConfig() {
    this.config = {
      app: {
        name: env.NEXT_PUBLIC_APP_NAME,
        version: env.NEXT_PUBLIC_APP_VERSION,
        environment: env.NEXT_PUBLIC_APP_ENV,
        debug: env.DEBUG,
      },
      database: {
        postgres: {
          url: env.DATABASE_URL,
        },
        redis: {
          url: env.REDIS_URL,
        },
      },
      ai: {
        openai: {
          apiKey: env.OPENAI_API_KEY,
          model: env.OPENAI_MODEL,
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
      },
      security: {
        jwt: {
          secret: env.JWT_SECRET,
        },
        encryption: {
          key: env.ENCRYPTION_KEY,
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

  public get<T = any>(path: string, defaultValue?: T): T {
    const keys = path.split(".")
    let current = this.config

    for (const key of keys) {
      if (current[key] === undefined) {
        return defaultValue as T
      }
      current = current[key]
    }

    return current as T
  }

  public set(path: string, value: any): void {
    const keys = path.split(".")
    let current = this.config

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i]
      if (current[key] === undefined) {
        current[key] = {}
      }
      current = current[key]
    }

    current[keys[keys.length - 1]] = value
  }

  public reload(): void {
    this.loadConfig()
  }

  public getAll(): Record<string, any> {
    return { ...this.config }
  }

  // 檢查配置是否完整
  public validateConfig(): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    // 檢查必要配置
    const requiredPaths = [
      "database.postgres.url",
      "database.redis.url",
      "ai.openai.apiKey",
      "security.jwt.secret",
      "security.encryption.key",
    ]

    for (const path of requiredPaths) {
      const value = this.get(path)
      if (!value) {
        errors.push(`缺少必要配置: ${path}`)
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    }
  }
}

// 導出單例實例
export const config = ConfigManager.getInstance()

// 便利函數
export function getConfig<T = any>(path: string, defaultValue?: T): T {
  return config.get(path, defaultValue)
}

export function setConfig(path: string, value: any): void {
  config.set(path, value)
}
