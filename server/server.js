const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const cors = require('cors')
const connectDB = require('./model/index')
const author = require('./router/author')
const book = require('./router/book')
const app = express()
const port = 4000

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Request logging middleware
app.use((req, res, next) => {
    let text = new Date().toGMTString() + "  : " + req.url + '\n'
    fs.appendFile("log.txt", text, () => {
        next()
    })
})

// Routes
app.get('/', (req, res) => {
    res.send("API running")
})

app.use("/author",author)
app.use("/book",book)

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`)
})