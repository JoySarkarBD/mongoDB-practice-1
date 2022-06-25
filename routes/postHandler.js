// dependencies
const express = require("express");
const postRoute = express.Router();
const { client } = require("../mongoDB");
const { ObjectId } = require("mongodb");

const db = client.db("blogs");
const post = db.collection("posts")

// insert single post
postRoute.post("/", async (req, res) => {
    try {
        const result = await post.insertOne(req.body);
        res.send(result);
    } catch(err) {
        res.send(500, err);
    }
});

//insert multiple post
postRoute.post("/multiple", async (req, res) => {
    try {
        const result = await post.insertMany(req.body);
        res.send(result);
    } catch(err) {
        res.send(500, err);
    }
});

// get all post
postRoute.get("/", async (req, res) => {
    try {
        const result = await post.find({}).toArray();
        res.send(result);
    } catch(err) {
        res.send(500, err);
    }
});

// get single post
postRoute.get("/:id", async (req, res) => {
    try {
        const result = await post.findOne({
            _id: ObjectId(req.params.id)
        });
        res.send(result)
    } catch(err) {
        res.send(500, err);
    }
});


//update a single post
postRoute.put("/:id", async (req, res) => {
    try {
        const result = await post.updateOne({
            _id: ObjectId(req.params.id)
        }, {$set:req.body},{upsert:true});
        res.send(result)
    } catch(err) {
        res.send(500, err);
    }
});

// update a single post and return the updated post
postRoute.put("/:id/return", async (req, res) => {
    try {
        const result = await post.findOneAndUpdate({
            _id: ObjectId(req.params.id)
        }, {$set:req.body},{upsert:false,returnOriginal:false});
        res.send(result)
    } catch(err) {
        res.send(500, err);
    }
});

// delete a single post
postRoute.delete("/:id", async (req, res) => {
    try {
        const result = await post.deleteOne({
            _id: ObjectId(req.params.id)
        });
        res.send(result)
    } catch(err) {
        res.send(500, err);
    }
});

// export the module
module.exports = postRoute;