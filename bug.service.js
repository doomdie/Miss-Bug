import fs from 'fs'
import { utilService } from './public/services/util.service.js'

const BUGS_FILE_PATH = './data/bug.json'

export const bugService = {
    query,
    getById,
    save,
    remove
}

function query(filterBy = {}) {
    return _readBugs().then(bugs => {
        if (filterBy.txt) {
            const regExp = new RegExp(filterBy.txt, 'i')
            bugs = bugs.filter(bug => regExp.test(bug.title))
        }
        if (filterBy.minSeverity) {
            bugs = bugs.filter(bug => bug.severity >= +filterBy.minSeverity)
        }
        return bugs
    })
}

function getById(bugId) {
    return _readBugs().then(bugs => bugs.find(bug => bug._id === bugId))
}

function remove(bugId) {
    return _readBugs().then(bugs => {
        bugs = bugs.filter(bug => bug._id !== bugId)
        return _writeBugs(bugs)
    })
}

function save(bug) {
    return _readBugs().then(bugs => {
        if (bug._id) {
            const idx = bugs.findIndex(b => b._id === bug._id)
            bugs[idx] = bug
        } else {
            bug._id = utilService.makeId()
            bugs.unshift(bug)
        }
        return _writeBugs(bugs).then(() => bug)
    })
}

function _readBugs() {
    return new Promise((resolve, reject) => {
        fs.readFile(BUGS_FILE_PATH, 'utf-8', (err, data) => {
            if (err) return reject(err)
            resolve(JSON.parse(data))
        })
    })
}

function _writeBugs(bugs) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(bugs, null, 2)
        fs.writeFile(BUGS_FILE_PATH, data, (err) => {
            if (err) return reject(err)
            resolve()
        })
    })
}