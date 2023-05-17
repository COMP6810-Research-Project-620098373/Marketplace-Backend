
import * as fasttext from "fasttext"
import * as fs from "fs"

const textClassifier: fasttext.Classifier = new fasttext.default.Classifier()

let isTextClassificationModelTrained: boolean = false

const trainTextClassificationModel = async () => {
    const trainFilePath = "./assets/train.txt"
    const modelFilePath = "./assets/model.bin"   
    if(!fs.existsSync(modelFilePath)){
        const fastTextConfig: Partial<fasttext.Options> = {
            dim: 100,
            input: trainFilePath,
            output: modelFilePath.slice(0, modelFilePath.length - 4),
        }
        await textClassifier.train("supervised", fastTextConfig as any).catch(err => {
            console.error(err)
            process.exit(1)
        })
    }
    await textClassifier.loadModel(modelFilePath)
}

trainTextClassificationModel().then(() => {
    isTextClassificationModelTrained = true
})

export const fastTextClassifications = async (text: string) => {
    if(!isTextClassificationModelTrained){
        await trainTextClassificationModel()
        isTextClassificationModelTrained = true
    }
    return await textClassifier.predict(text.toLowerCase(), 2)
}