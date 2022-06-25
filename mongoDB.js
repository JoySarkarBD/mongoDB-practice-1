const { MongoClient } = require("mongodb");

const uri =
    "mongodb://127.0.0.1:27017";
  
const client = new MongoClient(uri);


async function connectDB() {
    try {
      await client.connect();
        console.log("connected with MongoDB....!");
    } catch (err){
        console.log(err);
    }
  }

//export the modules
module.exports = {client, connectDB};
  