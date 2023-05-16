import { AgeRanges } from "../model/AgeRanges.js"
import { Item } from "../model/Item.js"
import { ItemClassifications } from "../model/ItemClassifications.js"
import { mobilenetClassifications } from "./mobilenet.js"

/**
 * Filters platform inappropiate items
 * @param items 
 * @param userAge 
 * @returns 
 */
export const filterItems = async (items: Array<Item>, userAge: number): Promise<Array<Item>> => {
    const processingPromises: Array<Promise<Item>> = []
    for(const item of items){
        processingPromises.push(
            new Promise(async (resolve, reject) => {
                try{
                    const itemImage: string = item.images[0].split(",")[1] ?? item.images[0]
                    const classifications = await mobilenetClassifications(itemImage)
                    console.log("Image classification predictions: ", classifications)
                    if(ItemClassifications[classifications[0].className] === undefined){
                        reject("item is not registered")
                    }
                    if(ItemClassifications[classifications[0].className]?.ageThreshold === null){
                        reject("Item is not allowed on the platform")
                        return
                    }                    
                    if(AgeRanges[ItemClassifications[classifications[0].className]?.ageThreshold as keyof typeof AgeRanges].max >= userAge){
                        reject("User is too young to view item")
                        return
                    }
                    resolve(item)
                }
                catch(err){
                    reject(err)
                }              
            })
        )
    }

    const settledPromises = await Promise.allSettled(processingPromises)
    const filteredResponse: Array<Item> = []
    for(const result of settledPromises){
        if(result.status === "fulfilled"){
            filteredResponse.push(result.value)
        }
    }

    return filteredResponse
}