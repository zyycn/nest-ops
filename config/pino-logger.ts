import { IncomingMessage } from 'http'
import { randomUUID } from 'crypto'
import { multistream } from 'pino'
import { Params } from 'nestjs-pino'
import dayjs from 'dayjs'

export const loggerConfig: Params = {
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
}
