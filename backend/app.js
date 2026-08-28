// const express = require("express");

// const morgan = require("morgan") //HTTP request logger middleware for node.js
// const rateLimit = require("express-rate-limit")
// const helmet = require("helmet")
// const mongosanitize = require("express-mongo-sanitize")
// const bodyParser = require("body-parser");
// const xss = require("xss")
// const cors = require("cors")
// const routes = require("./routes/index")
// const app = express();

// app.use(cors({
//     origin:"*",
//     methods:["GET", "PATCH", "POST", "DELETE", "PUT"],
//     credentials: true
// }))
// app.use(express.json({ limit: "10kb" }))
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(helmet())

// if (process.env.NODE_ENV === "development") {
//     app.use(morgan("dev"))
// }

// const Limiter = rateLimit({
//     max: 3000,
//     windowMs: 60 * 60 * 1000, // in one hour
//     message:"To many requests from this ip, please try again after some time"
// })

// app.use("/tawk",Limiter)
// app.use(express.urlencoded({
//     extended:true
// }))
// app.use((req, res, next) => {
//     if (req.query) {
//         Object.defineProperty(req, 'query', {
//             value: { ...req.query },
//             writable: true,
//             configurable: true,
//             enumerable: true
//         });
//     }
//     next();
// });
// app.use(mongosanitize())
// // app.use(xss())

// app.use(routes)

// module.exports = app;
const express = require("express");
const morgan = require("morgan"); 
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

// 1. UPDATE THIS LINE TO IMPORT THE COMPATIBLE PACKAGE
const mongosanitize = require("@exortek/express-mongo-sanitize");

const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes/index");
const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "PATCH", "POST", "DELETE", "PUT"],
    credentials: true
}));

app.use(express.json({ limit: "10kb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log("👉 1. Body after parsers:", req.body);
    next();
});
app.use(helmet());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

const Limiter = rateLimit({
    max: 3000,
    windowMs: 60 * 60 * 1000, 
    message: "Too many requests from this IP, please try again after some time"
});

app.use("/tawk", Limiter);
app.use(express.urlencoded({ extended: true }));

// 2. COMPLETE REMOVAL: Delete the old custom Object.defineProperty middleware.
// It is no longer needed since this package handles getters correctly!

// 3. USE THE MODERN SANITIZER
app.use(mongosanitize());
app.use((req, res, next) => {
    console.log("👉 2. Body before routes:", req.body);
    next();
});

app.use(routes);

module.exports = app;
