// import mongoose
const mongoose = require('mongoose')

// catch error from main function
main().catch(err => {
    console.log(`Error: ${err}`)
})

async function main() {
    // connect DB with connection string
    await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)
    console.log("Database has connected!")
}