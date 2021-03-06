const express = require("express");
const https = require("https");
const http = require("http");
const fs = require("fs");
const cors = require("cors");
require("dotenv").config();

const app = express();
const privatekey = fs.readFileSync("../ssl/privkey.pem", "utf8");
const certificate = fs.readFileSync("../ssl/fullchain.pem", "utf8");
const httpsConfig = {key: privatekey, cert: certificate};

app.use(express.json());
app.use(cors());

require("mongodb").MongoClient.connect(process.env.DB_IP + ":" + process.env.DB_PORT).then((dbClient) => {
    const PostsCollection = dbClient.db(process.env.DB).collection(process.env.COLLECTION);
    console.log("MongoDB connected");

    app.get("/posts", async (req, res) => {
        const posts = await PostsCollection.find({}).toArray();

        res.send({Error: null, Posts: posts})
    });
    app.post("/createpost", async (req, res) => {
        if (typeof req.body.Title === "string" && typeof req.body.Content === "string") {
            if (String(req.body.Title).length < 4 || String(req.body.Title).length > 50 || String(req.body.Content).length < 4 || String(req.body.Content).length > 500) {
                res.send({Error: "Invalid content lenght"});
            }
            await PostsCollection.insertOne({
                Title: req.body.Title,
                Content: req.body.Content,
                Tags: req.body.Tags
            }).then(() => {
                res.send({Error: null});
            });    
        } else {
            res.send({Error: "Only strings are accepted to be inserted inside the DB"});
        }
    });
    app.post("/queryposts", async (req, res) => {
        const queryed = PostsCollection.find( { $text: { $search: req.body.Content } } );
        const response = await queryed.toArray()
        res.send({Error: null, Results: response})
    });

    if (process.env.DEV === "false") {
        console.log("HTTPS started on " + process.env.PORT);
        https.createServer(httpsConfig, app).listen(process.env.PORT);
    }
    console.log("HTTP started on " + (process.env.PORT + 1));
    http.createServer(app).listen(process.env.PORT + 1);
});
