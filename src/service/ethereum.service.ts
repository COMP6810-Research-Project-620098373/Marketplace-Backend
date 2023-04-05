import { EthBlock } from "../model/EthBlock.js"
import { getTransactionByHashResponse } from "../model/mock-service-responses/ethereumRPC/get-transaction-by-hash-response.js"
import { sendTransactionResponse } from "../model/mock-service-responses/ethereumRPC/send-treansaction-response.js"
import { transactionsResponse } from "../model/mock-service-responses/ethereumTransactionIndexer/transactions-response.js"
import { getArgs } from "../util/get-args.js"
import { HexConverter } from "../util/hex-converter.js"

const args = getArgs()

export abstract class EthereumService {

    static MOCK_BLOCKCHAIN: Array<EthBlock> = []

    static async getTransactionHashesOfAddress(ethereumAddress: string, from: number, to: number | undefined): Promise<typeof transactionsResponse[200]> {
        if(args.MOCK_API_ENABLED){
           await new Promise(resolve => setTimeout(resolve, args.MOCK_API_TIMEOUT)) 
           return transactionsResponse[200]
        }
        return (await (await fetch(
            `${args.ETH_TRANSACTION_INDEXER_ENDPOINT}/addresses/${ethereumAddress}/transactions?from=${from}` + to !== undefined ? `&to=${to}` : "", {
            method: "GET"
        })
        )).json()
    }

    static async getTransactionByHash(ethereumTransactionHash: string): Promise<typeof getTransactionByHashResponse[200]> {
        if(args.MOCK_API_ENABLED){
            await new Promise(resolve => setTimeout(resolve, args.MOCK_API_TIMEOUT)) 
            return getTransactionByHashResponse[200]
        }
        return (await (await fetch(
            args.ETH_RPC_ENDPOINT, {
            method: "POST",
            body: JSON.stringify({ 
                jsonrpc: "2.0", 
                method: "eth_getTransactionByHash", 
                params: [`0x${ethereumTransactionHash}`], 
                id: 1 
            })
        })).json())
    }


    static async sendTransaction(transactionData: string): Promise<typeof sendTransactionResponse[200]> {
        if(args.MOCK_API_ENABLED){
            await new Promise(resolve => setTimeout(resolve, args.MOCK_API_TIMEOUT)) 
            return sendTransactionResponse[200]
        }
        const dataHex = HexConverter.asciiToHex(transactionData)
        return (await (await fetch(
            args.ETH_RPC_ENDPOINT, {
            method: "POST",
            body: JSON.stringify({
                jsonrpc:"2.0",
                method:"eth_sendTransaction",
                params:[{
                    from: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
                    to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
                    gas: "0x76c0", // 30400
                    gasPrice: "0x9184e72a000", // 10000000000000
                    value: "0x9184e72a", // 2441406250
                    data: `0x${dataHex}`,
                  }],
                id:1
            })
        })).json())
    }

}