export namespace HexConverter {
    export const asciiToHex = (text: string) => {
        let result = "0x"
        for (let letter of text) {
            result += letter.charCodeAt(0).toString(16);
        }
        return result
    }
    
    export const hexToAscii = (hex: string) => {
        hex = hex.slice(2)
        let result = ""
        for (let x = 0; x < hex.length; x += 2) {
            result += String.fromCharCode(parseInt(hex.slice(x, x + 2), 16))
        }
        return result
    }
}