const mogoose = require('mongoose')
require('dotenv').config();

const connectDB = async () => {
    try {
        const conn = await mogoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
        console.log(`Mongoose Connected : ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports  = connectDB