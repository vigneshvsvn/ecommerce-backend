const mongoose = require("mongoose");
const dns = require("node:dns");
const dbConnection = async (req, res) => {
    try {
        dns.setServers(["1.1.1.1"]);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("db connected successfully")

    }
    catch (err)
    {
        console.log(err);
        process.exit(1);
    }
}
module.exports = dbConnection;