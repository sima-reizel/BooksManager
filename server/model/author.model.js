const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true 
    },
    listOfBooks: [{
        type: String,
    }],
    age: {
       type: Number,
        min: 20,
        max: 120,
        required: true 
    },
    country: {
        type: String,
        required: true 
    },
    img: {
        type: String,
        required: true 
    },
    status: {
        type: Boolean,
        default: true
    }
})

const Author = mongoose.model('Author', authorSchema)

Author.ensureIndexes({ name: 1 })

Author.createCollection().then(collection => {
    console.log(`collection ${collection.name} is created`)
})

module.exports = Author