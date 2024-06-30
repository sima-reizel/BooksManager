const mongoose = require('mongoose')
const mongoURI = 'mongodb://localhost:27017/bookStore'

mongoose.Promise = global.Promise

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            autoIndex: false,
            maxPoolSize: 10,
            family: 4,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.info('Connected to MongoDB')
    } catch (err) {
        console.info('Failed to connect to MongoDB', err)
        process.exit(1) // Exit process with failure
    }
};

module.exports = connectDB