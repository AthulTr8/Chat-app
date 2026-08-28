const { configDotenv } = require("dotenv");
const mongoose = require("mongoose")
configDotenv({ path: "./config.env" })

const app = require("./app");
const DB = process.env.DBURL.replace("<password>", process.env.DBPASSWORD)
mongoose.connect(DB)
    .then((con) => {
        console.log("DB connection successfull")
    }).catch((err) => {
        console.log(err)
    })

process.on("uncaughtException", (err) => {
    console.log(err)
    process.exit(1)
})
const http = require("http");

const server = http.createServer(app);

const port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log(`App is runing on port ${port}`)
})

process.on("unhandledRejection", (err) => {
    console.log(err)
    server.close(() => {
        process.exit(1)
    })
})