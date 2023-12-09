const mongoose = require('mongoose')


const dbConnect = async (databaseUrl) => {
    try {
        await mongoose.connect(databaseUrl).then(
            console.log('db connected')
        );
    } catch (err) {
        console.error(err);
        console.log('error while connection\n' + err);
    }
};

module.exports = dbConnect;

