
const BASE_URL = 'http://localhost:3030/api/bug/'
export const bugService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
}
function getDefaultFilter() {
    return { txt: '', minSeverity: 0 }
}
async function query(filterBy = {}) {
    const { data: bugs } = await axios.get(BASE_URL, { params: filterBy })
    return bugs
}

async function get(bugId) {
    const { data: bug } = await axios.get(BASE_URL + bugId)
    return bug
}

async function remove(bugId) {
    const { data } = await axios.delete(BASE_URL + bugId)
    return data
}

async function save(bug) {
    let savedBug
    if (bug._id) {
        const { data } = await axios.put(BASE_URL + bug._id, bug)
        savedBug = data
    } else {
        const { data } = await axios.post(BASE_URL, bug)
        savedBug = data
    }
    return savedBug
}