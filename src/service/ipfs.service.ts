import * as ipfs from "ipfs-http-client"
import { getArgs } from "../util/get-args.js"

const args = getArgs()

export abstract class IpfsService {

    private static node: ipfs.IPFSHTTPClient = ipfs.create({
        url: args.IPFS_RPC_API
    })

    static async add(data: string): Promise<string>{
        return (await this.node.add(data)).cid.toString()
    }

    static async cat(ipfsHash: string){
        return await this.node.cat(ipfsHash)
    }
    
    static isOnline(): boolean{
        return this.node.isOnline()
    }

}