import { DataTypes, Sequelize } from "sequelize";
import { Item } from "../model/Item";
import { ItemCategories } from "../model/ItemCategories.js";

export class MyItemsRepository {
    
    constructor(){
    }

    private SCHEMA = (new Sequelize("sqlite")).define("My_Items", {
        title: DataTypes.STRING,
        cost: DataTypes.FLOAT,
        ipfsHash: DataTypes.STRING,
        visibility: DataTypes.ENUM("public", "private"),
        ethereumTransactionID: DataTypes.STRING,
        images: DataTypes.ARRAY(DataTypes.STRING),
        contact: DataTypes.STRING,
        category: DataTypes.ENUM(...Object.values(ItemCategories)),
        description: DataTypes.STRING,
    })

    async create(item: Item){
        await this.SCHEMA.create({
            ...item
        })
    }

    async get(filter: string,  limit: number = 50, offset: number = 0): Promise<Array<Item> | null>{
        const result = await this.SCHEMA.findOne({
            where: {    
                // TODO: 
            },
            offset,
            limit,
        })
        return result as Array<Item> | null
    }
    
}