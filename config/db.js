const mongoose = require('mongoose')

async function connectDB() {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log('DB connected')
    }
    catch (error) {
        console.log('DB connect error')
        process.exit(1)
    }  
}

module.exports = { connectDB }