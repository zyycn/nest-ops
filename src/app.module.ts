import { Module } from '@nestjs/common'
import { LoggerModule } from 'nestjs-pino'
import { ConfigModule } from '@nestjs/config'
// import { SequelizeModule } from '@nestjs/sequelize'
import { LoginModule } from '@/login/login.module'
import { loggerConfig } from '@/config/logger.config'
import { configuration } from '@/config/configuration'
import { AppService } from '@/app.service'
import { AppController } from '@/app.controller'

@Module({
  imports: [
    LoggerModule.forRoot(loggerConfig),
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    // SequelizeModule.forRoot({
    //   dialect: 'sqlite',
    //   storage: '.db/data.db',
    //   autoLoadModels: true,
    //   synchronize: true
    // }),
    LoginModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
