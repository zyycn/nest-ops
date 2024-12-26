import { NestFactory } from '@nestjs/core'
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino'
import { Logger as NestLogger } from '@nestjs/common'
import { AppModule } from '@/app.module.js'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    forceCloseConnections: true
  })

  app.useLogger(app.get(Logger))
  app.useGlobalInterceptors(new LoggerErrorInterceptor())
  app.enableShutdownHooks()

  await app.listen(process.env.PORT ?? 3000)

  const running = `Application is running on: ${await app.getUrl()}`
  NestLogger.log(`${running}\n`)
  console.log('\x1b[32m%s\x1b[0m', `\n\n${running}\n`)
}

bootstrap()
