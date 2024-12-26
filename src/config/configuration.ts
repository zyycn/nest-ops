import { resolve } from 'node:path'
import { ConfigFactory } from '@nestjs/config'

export const configuration = async (): Promise<ConfigFactory> => {
  return await import(resolve(process.cwd(), `./src/config/env/${process.env.NODE_ENV}.ts`))
}
