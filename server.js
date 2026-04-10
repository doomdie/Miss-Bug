import express from 'express'
import { bugService } from './bug.service.js'
const app = express()

app.use(express.static('public'))

app.get('/api/bug', (req, res) => {
    const filterBy = {
        txt: req.query.txt || '',
        minSeverity: +req.query.minSeverity || 0
    }
    bugService.query(filterBy)
        .then(bugs => res.send(bugs))
        .catch(err => res.status(400).send('Cannot get bugs'))
})

app.listen(3030, () => console.log('Server ready at port 3030'))