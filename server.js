// dependencies
const express = require("express");
const { client, connectDB } = require("./mongoDB");
const postHandler = require("./routes/postHandler")
// initialize express
const app = express();

// middleware
app.use(express.json());
app.use("/post", postHandler);


// listening the server
app.listen(3000, () => {
    console.log("server running at 3000 port......!");
    connectDB().catch(err=>{console.log(err)});
});
