import { IncomingMessage } from 'http'
import { randomUUID } from 'crypto'
import { multistream } from 'pino'
import { Params } from 'nestjs-pino'
import dayjs from 'dayjs'

const isProd = process.env.NODE_ENV === 'production'

export const loggerConfig: Params = {
  pinoHttp: [
    {
      level: isProd ? 'info' : 'debug',
      quietReqLogger: true,
      timestamp: () => `,"time":"${dayjs().format('YYYY-MM-DD HH:mm:ss')}"`,
      genReqId: (req: IncomingMessage): string => {
        const requestId = req.headers['x-request-id']
        return typeof requestId === 'string' ? requestId : randomUUID()
      },
      transport: isProd
        ? undefined
        : {
            target: 'pino-pretty',
            options: { sync: true, singleLine: true }
          }
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
}
