import { resolve } from 'node:path'
import { Module } from '@nestjs/common'
import { LoggerModule } from 'nestjs-pino'
import { ConfigModule } from '@nestjs/config'
import { AppService } from '@/app.service'
import { AppController } from '@/app.controller'
import { loggerConfig } from '~/config/pino-logger'

@Module({
  imports: [
    LoggerModule.forRootAsync({
      useFactory: async () => loggerConfig
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
