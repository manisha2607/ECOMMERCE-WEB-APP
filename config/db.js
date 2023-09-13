const mongoose = require('mongoose');
const color = require('colors');

module.exports.connectMongodb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Mongodb connected successfully :: ${conn.connection.host}`.bgYellow.white);
    } catch (error) {
        console.log(`Error in connecting with db :: ${error}`.bgRed.white);
    }

}

