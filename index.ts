#!/usr/bin/env node

import { Server } from "socket.io";
import { Worker } from "worker_threads";
import { Item } from "./src/model/Item.js";
import { IpfsService } from "./src/service/ipfs.service.js";
import { logger } from "./src/util/logger.js";
import { EthereumService } from "./src/service/ethereum.service.js";
import { Visibility } from "./src/model/Visibility.js";
import express from "express";
import http from "http"
import IP from "ip"
import qrcode from "qrcode-terminal"
import { EnvironmentVariables } from "./src/model/EnvironmentVariables.js";
import { MyItemsRepository } from "./src/repository/MyItemsRepository.js";
import { mobilenetClassifications } from "./src/util/mobilenet.js";
import * as cors from "cors"
import { fetchItemsResponse } from "./src/model/mock-api-responses/fetch-items-response.js";
import { AgeRanges } from "./src/model/AgeRanges.js";
import { ItemClassifications } from "./src/model/ItemClassifications.js";
import * as fs from "fs"
import { filterItems } from "./src/util/filter-items.js";
import { browseItemsResponse } from "./src/model/mock-api-responses/browse-items-response.js";
// import { logger } from "src/util/logger.js";

const app = express()
app.use(express.json({
    limit: 1000000
}))

// const apiRouter = express.Router()

app.post("/api/item", async (req, res) => {
    /**
     * Adds item to the IPFS
     * */
    try{
        const item: Item = req.body.item
        if(IpfsService.isOnline()){
            throw new Error("IPFS daemon is not running")
        }
        const itemIpfsHash: string = await IpfsService.add(JSON.stringify(item))
        if(item.visibility === Visibility.Public){
            await EthereumService.sendTransaction(itemIpfsHash)
        }
        const myItemsRepo = new MyItemsRepository()
        await myItemsRepo.create(item)
        res.status(200).send(itemIpfsHash)
        // EthereumService.
    }
    catch(err){
        logger(String(err))
        res.status(500).send("internal server error")
    }
})

app.get("/api/item/:ipfsHash", async (req, res) => {
    const ipfsHash: string = req.params.ipfsHash
    if(EnvironmentVariables.MOCK_API_ENABLED){
        const item = fetchItemsResponse[200].filter(val => val.ipfsHash === ipfsHash)
        res.send(item.length === 0 ? null : item[0])
        return
    }
    // TODO: 
})

app.get("/api/my-items", async (req, res) => {
    try{
        if(EnvironmentVariables.MOCK_API_ENABLED){
            res.send(fetchItemsResponse[200].filter(val => val.title === "Rifle"))
            return
        }
        // TODO:
    }
    catch(err){
        logger(String(err))
        res.status(500).send("internal server error")
    }
})

app.get("/api/browse-items", async (req, res) => {
    try{
        const userAge: number = Number(req.query["userAge"])

        if(EnvironmentVariables.MOCK_API_ENABLED){
            const response: Array<Item> = browseItemsResponse[200]
            res.send(await filterItems(response, userAge))
            return
        }

        // TODO: Implement non-mock response
    }
    catch(err){
        logger(String(err))
        res.status(500).send("internal server error")
    }
})

app.get("/api/wallet", async (req, res) => {
    try{
        // TODO:
    }
    catch(err){
        logger(String(err))
        res.status(500).send("internal server error")
    } 
})

app.get("/api/transaction-cost", async (req, res) => {
    try{
        // TODO:
    }
    catch(err){
        logger(String(err))
        res.status(500).send("internal server error")
    }
})

app.post("/api/classify-image", async (req, res) => {
    try{
        const image: string = req.body.image
        res.send(await mobilenetClassifications(image))
    }
    catch(err){
        logger(String(err))
        res.status(500).send("internal server error")
    }
})
// if(!EnvironmentVariables.IS_PROD){

// }

// app.use("/api", apiRouter)
app.use(express.json())
app.use("/", express.static("./www"))


const server = http.createServer(app)
const io = new Server(server)

io.on('connection', (socket) => {
    socket.on("download-items", message => {
        const worker = new Worker("./src/util/download-items.js", {
            workerData: {
                offset: message
            }
        })
        worker.on("message", (val) => {
            socket.send(val)
        })
    })
})

server.listen(EnvironmentVariables.PORT, () => {
    const ip = IP.address()
    const url = `http://${ip}:${EnvironmentVariables.PORT}`
    qrcode.generate(url)
    console.log(`\nlistening on ${url}`)
})

