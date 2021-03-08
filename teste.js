const express = require('express')

const ApmItlean = require('./index')

const { errorHandler, captureHandler }  = ApmItlean.init({ key: ''})

const { capture } = require('./testando2')

const app = express()


app.use(captureHandler)
app.use(express.json())


app.get('/test', (req, res) => {
    try {
        capture()
    } catch (error) {
        return res.status(500).json(error)
    }
})

app.use(errorHandler)


app.listen(3000, () => console.log('Listening port: 3000'))

