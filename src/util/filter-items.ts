import { AgeRanges } from "../model/AgeRanges.js"
import { Item } from "../model/Item.js"
import { ItemClassifications } from "../model/ItemClassifications.js"
import { mobilenetClassifications } from "./mobilenet.js"
import { fastTextClassifications } from "./fastText.js"

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
                    const isItemValid = (className: string): boolean => {
                        if(ItemClassifications[className] === undefined){
                            reject("item is not registered")
                            return false
                        }
                        if(ItemClassifications[className]?.ageThreshold === null){
                            reject("Item is not allowed on the platform")
                            return false
                        }
                        if(AgeRanges[ItemClassifications[className]?.ageThreshold as keyof typeof AgeRanges].max >= userAge){
                            reject("User is too young to view item")
                            return false
                        }
                        return true
                    }

                    const itemImage: string = item.images[0].split(",")[1] ?? item.images[0]
                    const imageClassifications = await mobilenetClassifications(itemImage)
                    console.log("Image classification predictions: ", imageClassifications)

                    if(!isItemValid(imageClassifications[0].className)){
                        return
                    }

                    const textClassifications = await fastTextClassifications(item.title+" "+item.description.toLowerCase())
                    console.log("Text classification predictions: ", textClassifications)
                    
                    let formattedTextClassname: string = textClassifications[0].label.slice(9).split(",-").join(", ")
                    if(ItemClassifications[formattedTextClassname] === undefined){
                        formattedTextClassname = formattedTextClassname.split("-").join(" ")
                    }

                    if(!isItemValid(formattedTextClassname)){
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