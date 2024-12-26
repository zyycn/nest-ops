import { IncomingMessage } from 'http'
import { randomUUID } from 'crypto'
import { resolve } from 'node:path'
import { Module } from '@nestjs/common'
import { multistream } from 'pino'
import { LoggerModule } from 'nestjs-pino'
import { ConfigModule } from '@nestjs/config'
import dayjs from 'dayjs'
import { AppService } from '@/app.service'
import { AppController } from '@/app.controller'

@Module({
  imports: [
    LoggerModule.forRootAsync({
      useFactory: async () => ({
        pinoHttp: [
          {
            quietReqLogger: true,
            level: process.env.NODE_ENV !== 'production' ? 'info' : 'debug',
            timestamp: () => `,"time":"${dayjs().format('YYYY-MM-DD HH:mm:ss')}"`,
            genReqId: (req: IncomingMessage): string => {
              const requestId = req.headers['x-request-id']
              return typeof requestId === 'string' ? requestId : randomUUID()
            },
            transport:
              process.env.NODE_ENV !== 'production'
                ? {
                    target: 'pino-pretty',
                    options: {
                      singleLine: true
                    }
                  }
                : undefined
          },
          multistream(
            [
              { level: 'debug', stream: process.stdout },
              { level: 'error', stream: process.stderr },
              { level: 'fatal', stream: process.stderr }
            ],
            { dedupe: true }
          )
        ]
      })
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        async () => {
          return await import(resolve(`config/${process.env.NODE_ENV}.ts`))
        }
      ]
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
