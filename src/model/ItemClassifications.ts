import { AgeRanges } from "./AgeRanges";
import { Bins } from "./Bins";
import { ItemCategories } from "./ItemCategories.js";

/**
 * ItemClassifications : Only item classification listed here are allowed to be sold
 * by the application
 */
export const ItemClassifications: Record<string, {
    category: ItemCategories,
    // bin: Bins,
    ageThreshold: keyof typeof AgeRanges | null
}> = {
    "revolver": {
        category: ItemCategories.Weapons,
        ageThreshold: null
    },
    "assault rifle": {
        category: ItemCategories.Weapons,
        ageThreshold: null
    },
    "rifle": {
        category: ItemCategories.Weapons,
        ageThreshold: null
    },
    "holster": {
        category: ItemCategories.Weapons,
        ageThreshold: null
    },
    "sewing machine": {
        category: ItemCategories["Tools & Home Improvement"],
        ageThreshold: "adolescent"
    },
    "lawn mower": {
        category: ItemCategories["Tools & Home Improvement"],
        ageThreshold: "youngAdult"
    },
    "chain saw, chainsaw": {
        category: ItemCategories["Tools & Home Improvement"],
        ageThreshold: "youngAdult"
    },
    "power drill": {
        category: ItemCategories["Tools & Home Improvement"],
        ageThreshold: "youngAdult"
    },
    "snowplow": {
        category: ItemCategories["Tools & Home Improvement"],
        ageThreshold: "youngAdult"
    },
    "hatchet": {
        category: ItemCategories["Garden & Outdoor"],
        ageThreshold: "youngAdult"
    },
    "whiskey jug": {
        category: ItemCategories.Weapons,
        ageThreshold: "youngAdult" 
    },
    "red wine": {
        category: ItemCategories.Weapons,
        ageThreshold: "youngAdult" 
    },
    "wine bottle": {
        category: ItemCategories.Weapons,
        ageThreshold: "youngAdult" 
    },
    "jersey": {
        category: ItemCategories["Clothing, Shoes & Jewelry"],
        ageThreshold: "child" 
    },
    "kimono": {
        category: ItemCategories["Clothing, Shoes & Jewelry"],
        ageThreshold: "child"
    },
    "sweatshirt": {
        category: ItemCategories["Clothing, Shoes & Jewelry"],
        ageThreshold: "child" 
    },
    "Loafer": {
        category: ItemCategories["Clothing, Shoes & Jewelry"],
        ageThreshold: "child" 
    },
    "clog": {
        category: ItemCategories["Clothing, Shoes & Jewelry"],
        ageThreshold: "child" 
    },
    "running shoe": {
        category: ItemCategories["Clothing, Shoes & Jewelry"],
        ageThreshold: "child" 
    },
    "oil filter": {
        category: ItemCategories["Automotive Parts & Accessories"],
        ageThreshold: "adolescent" 
    },    
    "sports car": {
        category: ItemCategories["Automotive Parts & Accessories"],
        ageThreshold: "youngAdult" 
    },
    "beach wagon": {
        category: ItemCategories["Automotive Parts & Accessories"],
        ageThreshold: "youngAdult" 
    },
    "convertible": {
        category: ItemCategories["Automotive Parts & Accessories"],
        ageThreshold: "youngAdult" 
    },
    "cellular telephone": {
        category: ItemCategories.Electronics,
        ageThreshold: "adolescent" 
    },
    "hand-held computer": {
        category: ItemCategories.Electronics,
        ageThreshold: "adolescent" 
    },
    "radio": {
        category: ItemCategories.Electronics,
        ageThreshold: "adolescent" 
    },
    "iPod": {
        category: ItemCategories.Electronics,
        ageThreshold: "adolescent" 
    },
    "monitor": {
        category: ItemCategories.Electronics,
        ageThreshold: "adolescent" 
    },
    "desktop computer": {
        category: ItemCategories.Electronics,
        ageThreshold: "adolescent" 
    },
    "notebook": {
        category: ItemCategories.Electronics,
        ageThreshold: "adolescent" 
    },
    "laptop": {
        category: ItemCategories.Electronics,
        ageThreshold: "adolescent" 
    },
    "plate": {
        category: ItemCategories["Grocery & Gourmet Food"],
        ageThreshold: "child" 
    },
    "guacamole": {
        category: ItemCategories["Grocery & Gourmet Food"],
        ageThreshold: "child" 
    },
    "meat loaf": {
        category: ItemCategories["Grocery & Gourmet Food"],
        ageThreshold: "child" 
    },
    "bagel": {
        category: ItemCategories["Grocery & Gourmet Food"],
        ageThreshold: "child" 
    },
    "corn": {
        category: ItemCategories["Grocery & Gourmet Food"],
        ageThreshold: "child" 
    },
    "cheeseburger": {
        category: ItemCategories["Grocery & Gourmet Food"],
        ageThreshold: "child" 
    },
    "pizza": {
        category: ItemCategories["Grocery & Gourmet Food"],
        ageThreshold: "child" 
    },
    "potpie": {
        category: ItemCategories["Grocery & Gourmet Food"],
        ageThreshold: "child" 
    },
    "matchstick": {
        category: ItemCategories["Health, Household & Baby Care"],
        ageThreshold: "youngAdult" 
    },
}