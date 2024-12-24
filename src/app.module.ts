import { Module, RequestMethod } from '@nestjs/common'
import { LoggerModule } from 'nestjs-pino'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    LoggerModule.forRootAsync({
      useFactory: async () => {
        return {
          pinoHttp: {
            level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
            transport: process.env.NODE_ENV !== 'production' ? { target: 'pino-pretty' } : undefined
          },
          forRoutes: [AppController],
          exclude: [{ method: RequestMethod.ALL, path: 'check' }]
        }
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
