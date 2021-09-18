require("mongodb").MongoClient.connect("mongodb://localhost:27017").then((client) => {
    client.db("Anoninetwork").collection("Posts").createIndex(  
        {
            "Title": "text",
            "Content": "text",
            "Tags": "text"
        },
        {
            name: "Index",
            unique: false,
        }
    );

    console.log("DB Initialized");

    process.exit();
});