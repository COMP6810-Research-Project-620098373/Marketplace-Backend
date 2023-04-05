export const logger = (message: string, traceId?: string) => {
    console.log(`${(new Date()).toString().slice(0, 24)} [${traceId}]: ${message}`)
}