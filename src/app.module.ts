import { Module } from '@nestjs/common'
import { LoggerModule } from 'nestjs-pino'
import { ConfigModule } from '@nestjs/config'
import { loggerConfig } from '@/config/logger.config'
import { configuration } from '@/config/configuration'
import { AppService } from '@/app.service'
import { AppController } from '@/app.controller'

@Module({
  imports: [
    LoggerModule.forRoot(loggerConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
