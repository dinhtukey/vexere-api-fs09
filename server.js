const express = require("express");
const mongoose = require("mongoose");
const config = require("./config")
//console.log(process.env.NODE_ENV)
// /console.log(config)
// console.log("LOCAL_PORT: " ,process.env.LOCAL_PORT)
// console.log("STAGING_PORT: " ,process.env.STAGING_PORT)
// let port;
// if(process.env.NODE_ENV==="staging"){
//     port = process.env.STAGING_PORT
// }else{
//     port = process.env.PORT || process.env.LOCAL_PORT
// }

//UNIX: export NODE_ENV=staging && yarn start:watch
// const stations = require("./routes/api/stations");
// const trips = require("./routes/api/trips");
// const users = require("./routes/api/users");

const mongoUri = process.env.MONGO_URI || config.mongoUri
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connect to DB"))
    .catch(console.log)


const app = express();

app.use(express.json());

app.use("/uploads",express.static("./uploads"))
//station
app.use("/api",require("./routes/api/controllers/stations"))


//trip
app.use("/api",require("./routes/api/controllers/trips"))


//user
app.use("/api",require("./routes/api/controllers/users"))

//ticket
app.use("/api",require("./routes/api/controllers/tickets"))
const port = process.env.PORT || config.port
app.listen(port,() =>{
    console.log(`App is running on port ${port}`)
})


