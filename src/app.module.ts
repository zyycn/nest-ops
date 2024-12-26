import { resolve } from 'node:path'
import { Module } from '@nestjs/common'
import { LoggerModule } from 'nestjs-pino'
import { ConfigModule } from '@nestjs/config'
import { loggerConfig } from './config/pino-logger'
import { AppService } from '@/app.service'
import { AppController } from '@/app.controller'

@Module({
  imports: [
    LoggerModule.forRootAsync({
      useFactory: async () => loggerConfig
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        async () => {
          return await import(resolve(`./src/config/env/${process.env.NODE_ENV}.ts`))
        }
      ]
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
