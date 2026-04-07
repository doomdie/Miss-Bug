
import express from 'express'
import { runTest } from './test-service.js'
const app = express()
app.get('/test', async (req, res) => {
    try {
        await runTest()
        res.send('Test completed successfully! Check your terminal.')
    } catch (err) {
        res.status(500).send('Test failed: ' + err.message)
    }
})
console.log("wtf lol")
app.listen(3030, () => console.log('Server ready at port 3030'))