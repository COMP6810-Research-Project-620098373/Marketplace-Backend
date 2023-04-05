import "@tensorflow/tfjs-node"
import * as mobilenet from "@tensorflow-models/mobilenet"
import * as tfnode from "@tensorflow/tfjs-node"

let model: mobilenet.MobileNet | undefined

const getModel = async () => {
    if(model === undefined){
        model = await mobilenet.load()
    }
    return model
}

export const mobilenetClassifications = async (imageUrlOrBase64: string):Promise<{
    className: string
    probability: number
}[]> => {
    const model = await getModel()
    const imgBuff = Buffer.from(imageUrlOrBase64.split(",")[1] ?? imageUrlOrBase64, 'base64')
    const img = tfnode.node.decodeImage(imgBuff) as tfnode.Tensor3D
    return await model.classify(img as any)
}