import fs from 'fs'

export const fileService = {
    readJsonFile,
    writeJsonFile
}

export function readJsonFile(path) {
    const str = fs.readFileSync(path, 'utf8')
    const json = JSON.parse(str)
    return json
}

export function writeJsonFile(path, data) {
    return new Promise((resolve, reject) => {
        const jsonData = JSON.stringify(data, null, 2)
        fs.writeFile(path, jsonData, err => {
            if (err) return reject(err)
            resolve()
        })
    })
}