import { ItemCategories } from "./ItemCategories"
import { Visibility } from "./Visibility"

export interface Item {
    title: string
    cost: number
    ipfsHash: string | null
    visibility: Visibility
    ethereumTransactionHash: string | null
    images: Array<string>
    contact: string
    category: ItemCategories
    description: string
    // ethereumAddress: string | null
    // isPublished: boolean
}