import pino from 'pino';

export default pino({
    transport: {
        level: process.env.PINO_LOG_LEVEL || 'info',
        target: 'pino-pretty',
        options: {
            translateTime: 'SYS:dd:mm:yyyy HH:MM:ss',
            ignore: 'pid,hostname',
            colorize: true,
        },
    },
});

