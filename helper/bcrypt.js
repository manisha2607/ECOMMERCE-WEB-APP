const bcrypt = require('bcrypt');
const color = require('colors');

module.exports.creatHashPass = async (password) => {
    try {
        const salt = 10;
        const hashedPass = await bcrypt.hash(password, salt);
        return hashedPass;
    } catch (error) {
        console.log(`Error in bcrypting the password :: ${error}`.bgRed.white);
    }
}

module.exports.comparePass = async (password, hashedpass) => {
    try {
        return bcrypt.compare(password, hashedpass);
    } catch (error) {
        console.log(`Error in comaparing the password :: ${error}`.bgRed.white);
    }
}
