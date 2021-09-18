const express = require("express");
const cors = require("cors");

const app = express();
const config = require("dotenv").config();

app.use(express.json());
app.use(cors());

require("mongodb").MongoClient.connect(process.env.DB_IP + ":" + process.env.DB_PORT).then((dbClient) => {
    const PostsCollection = dbClient.db(process.env.DB).collection(process.env.COLLECTION);
    console.log("MongoDB connected");

    app.get("/getposts", async (req, res) => {
        const posts = await PostsCollection.find({}).toArray();

        res.send({Error: null, Posts: posts})
    });
    app.post("/createpost", async (req, res) => {
        await PostsCollection.insertOne({
            Title: req.body.Title,
            Content: req.body.Content,
            Tags: req.body.Tags
        }).then(() => {
            res.send({Error: null});
        });
    });
    app.post("/queryposts", async (req, res) => {
        const queryed = PostsCollection.find( { $text: { $search: req.body.Content } } );
        const response = await queryed.toArray()
        res.send({Error: null, Results: response})
    });

    app.listen(process.env.PORT);
});