import { NestFactory } from '@nestjs/core'
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true, logger: false })

  app.useLogger(app.get(Logger))
  app.useGlobalInterceptors(new LoggerErrorInterceptor())

  await app.listen(process.env.PORT ?? 3000)

  const url = await app.getUrl()
  console.log('\x1b[32m%s\x1b[0m', `\n\nApplication is running at: ${url}\n`)
}

bootstrap()
