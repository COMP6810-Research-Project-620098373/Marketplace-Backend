import { getArgs } from "../util/get-args.js"
import { HexConverter } from "../util/hex-converter.js"
import { parentPort, workerData } from "worker_threads"
import { EthereumService } from "./ethereum.service"
import { IpfsService } from "./ipfs.service"

//////// Worker Thread Script ////////

EthereumService.getTransactionHashesOfAddress(getArgs().ETH_ADDRESS, Number(workerData.offset), undefined).then(async (itemTransactionHashes: Array<string>) => {
    const batchArray: Array<Promise<null>> = []
    for(let x = 0; x < itemTransactionHashes.length; x++){
        const transactionHash: string = itemTransactionHashes[x]
        batchArray.push(
            new Promise<any>(async (resolve, reject) => {
                try{
                    const transaction = await EthereumService.getTransactionByHash(transactionHash)
                    const ipfsHash: string = HexConverter.hexToAscii(transaction.result.input)
                    const itemData: AsyncIterable<Uint8Array> = await IpfsService.cat(ipfsHash)
                    //@ts-ignore
                    const item = JSON.parse(new TextDecoder().decode((itemData)))
                    resolve(item)
                }
                catch(err){
                    reject(null)
                }
            })
        )
        if((itemTransactionHashes as Array<string>).length - 1 === x){
            batchArray.length += 5 % batchArray.length
        }      
        if(batchArray.length >= 5){
            const batchResult = await Promise.allSettled(batchArray)
            batchResult.forEach(result => parentPort?.postMessage(result))
            batchArray.length = 0
        }                
    }
})

// export abstract class ItemSyncService {
//     static async downloadItems(offset: number){
//         const itemTransactionHashes: Array<string> = await EthereumService.getTransactionHashesOfAddress(args.ETH_ADDRESS, offset, undefined)
//         const batchArray: Array<Promise<null>> = []
//         for(let x = 0; x < itemTransactionHashes.length; x++){
//             const transactionHash: string = itemTransactionHashes[x]
//             batchArray.push(
//                 new Promise<any>(async (resolve, reject) => {
//                     try{
//                         const transaction = await EthereumService.getTransactionByHash(transactionHash)
//                         const ipfsHash: string = HexConverter.hexToAscii(transaction.result.input)
//                         const itemData: AsyncIterable<Uint8Array> = await IpfsService.cat(ipfsHash)
//                         //@ts-ignore
//                         const item = JSON.parse(new TextDecoder().decode((itemData)))
//                         resolve(item)
//                     }
//                     catch(err){
//                         reject(null)
//                     }
//                 })
//             )
//             if((itemTransactionHashes as Array<string>).length - 1 === x){
//                 batchArray.length += 5 % batchArray.length
//             }      
//             if(batchArray.length >= 5){
//                 const batchResult = await Promise.allSettled(batchArray)
//                 batchResult.forEach(result => parentPort?.postMessage(result))
//                 batchArray.length = 0
//             }                
//         }
//     }
// }