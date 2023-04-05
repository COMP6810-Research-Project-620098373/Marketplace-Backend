import { env } from "process"

export const EnvironmentVariables = {
    MOCK_API_ENABLED: <boolean>(env["MOCK_API_ENABLED"]?.toLowerCase() === "true"),
    PORT: <number>(Number(env["PORT"])),
    IPFS_API: <string>(env["IPFS_API"]),
    IS_PROD: <string>(env["IS_PROD"]),
    ETHEREUM_RPC_API: <string>(env["ETHEREUM_RPC_API"]),
    ETHEREUM_TRANSACTION_INDEXER_API: <string>(env["ETHEREUM_TRANSACTION_INDEXER_API"]),
}