const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: 10,
        max: 100,
        required: true 
    },
    description: {
        type: String,
        required: true 
    },
    category: {
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
const Book = mongoose.model('Book', bookSchema)

Book.ensureIndexes({title: 1})

Book.createCollection().then(collection => {
    console.log(`collection ${collection.name} is created`)
})

module.exports = Book