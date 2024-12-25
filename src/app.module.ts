import { Module, RequestMethod } from '@nestjs/common'
import { LoggerModule } from 'nestjs-pino'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    LoggerModule.forRootAsync({
      useFactory: async () => ({
        pinoHttp: {
          level: 'debug',
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
        forRoutes: [AppController],
        exclude: [{ method: RequestMethod.ALL, path: 'check' }]
      })
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
