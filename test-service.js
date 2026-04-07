import { bugService } from './services/bug.service.js'

export async function runTest() {
    try {
        console.log('--- Step 1: Testing Query ---')
        const initialbugs = await bugService.query()
        console.log('Initial bugs in file:', initialbugs.length)

        console.log('\n--- Step 2: Testing Save (Create) ---')
        const myNewbug = { model: 'Susita', speed: 80 }
        const savedbug = await bugService.save(myNewbug)
        console.log('Saved new bug with ID:', savedbug._id)

        console.log('\n--- Step 3: Testing Get by ID ---')
        const fetchedbug = await bugService.get(savedbug._id)
        console.log('Successfully fetched:', fetchedbug.model)

        console.log('\n--- Step 4: Testing Remove ---')
        await bugService.remove(savedbug._id)
        console.log('bug removed successfully.')

        const finalbugs = await bugService.query()
        console.log('Final bug count:', finalbugs.length)
        
    } catch (err) {
        console.error('❌ Test failed:', err)
        throw err
    }
}