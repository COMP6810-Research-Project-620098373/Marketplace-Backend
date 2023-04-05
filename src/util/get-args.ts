import * as dotenv from 'dotenv'

export const getArgs = () => {
    const env = dotenv.config().parsed as EnvironmentVariables | undefined
    if(env === undefined){
        throw new Error("could not parse .env file")
    }
    env.MOCK_API_ENABLED = `${env.MOCK_API_ENABLED}` === "true"
    env.MOCK_API_TIMEOUT = Number(env.MOCK_API_TIMEOUT)
    return env
}

export interface EnvironmentVariables {
    ETH_ADDRESS: string
    ETH_TRANSACTION_INDEXER_ENDPOINT: string
    ETH_RPC_ENDPOINT: string
    MOCK_API_ENABLED: boolean
    MOCK_API_TIMEOUT: number
    IPFS_RPC_API: string
}