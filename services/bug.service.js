import { makeId, readJsonFile, writeJsonFile } from './util.service.js'
const PATH = './data/bug.json'
const cars = readJsonFile(PATH)

export const carService = {
    query,
    get,
    remove,
    save,
}

function query() {
    return Promise.resolve(cars)
}

function get(carId) {
    const car = cars.find(car => car._id === carId)
    if (!car) return Promise.reject(`Cant find car with id ${carId}`)
        
    return Promise.resolve(car)
}

function remove(carId) {
    const idx = cars.findIndex(car => car._id === carId)
    if (idx === -1) return Promise.reject(`Can't find car with id ${carId}`)

    cars.splice(idx, 1)

    return _saveCarsToFile()
}

function save(carToSave) {
    if (carToSave._id) {
        const idx = cars.findIndex(car => car._id === carToSave._id)
        cars[idx] = { ...cars[idx], ...carToSave }
    } else {
        carToSave._id = makeId()
        cars.push(carToSave)
    }
    return _saveCarsToFile()
        .then(() => carToSave)
}

function _saveCarsToFile() {
    return writeJsonFile(PATH, cars)
}