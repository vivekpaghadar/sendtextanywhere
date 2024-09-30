const express = require('express');
// const { MongoClient } = require('mongodb');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

const PORT = 3001;
const app = express();

const Cryptr = require('cryptr');
const cryptr = new Cryptr('SendTextAnywhere5105');

const path = require("path");

// Middleware
// To allow cross-origin requests from React frontend
app.use(express.json()); // To parse JSON body in POST requests
const _dirname = path.dirname("")
const buildpath = path.join(_dirname,"../frontend/build")
app.use(express.static(buildpath));
app.use(cors({
    "origin" : "*"
})); 

// Connection URI
const uri = 'mongodb+srv://vivekpaghadar14:Vivek5105@sendtextanywhere.bvuwz.mongodb.net/?retryWrites=true&w=majority&appName=sendtextanywhere';

// Create a new MongoClient
// const client = new MongoClient(uri);
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

// POST methode
app.get("/", (req, res) => {
    res.send("Connected to Backend!");
});

// POST methode
app.post("/addtext", async (req, res) => {
    let data = req.body;
    try {
        // Connect to the MongoDB server
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // Select a database (will be created if it doesn't exist)
        const database = client.db('artista');

        // Select a collection (will be created if it doesn't exist)
        const collection = database.collection('text');

        let Code = Math.floor(1000 + Math.random() * 9000)

        // Find and log documents from the collection

        const encryptedString = cryptr.encrypt(data.message);
        const docs = await collection.insertOne({
            code: Code,
            message: encryptedString,
            status: 1
        });

        let response = { "success": 200, "lastInsertID": docs.insertedId, "code": Code, "text": data.message };
        res.json(response);
    } finally {
        // Ensure the client is closed when finished
        await client.close();
    }
});

app.post("/gettext", async (req, res) => {
    let data = req.body;
    try {
        // Connect to the MongoDB server
        await client.connect();

        // Select a database (will be created if it doesn't exist)
        const database = client.db('artista');

        // Select a collection (will be created if it doesn't exist)
        const collection = database.collection('text');
        let code = parseInt(data.code);

        if (data.code != "") {
            // Find and log documents from the collection
            const docs = await collection.find({ "code": code }).toArray();
            if(docs.length > 0){
                if (docs[0].status === 1) {
                    const decryptedString = cryptr.decrypt(docs[0].message);
                    let response = { "success": 200, "text": decryptedString};
                    res.json(response);
                    await collection.updateOne({ code: code }, { $set: { status: 0 } });
                    await collection.deleteOne({ code: code, status: 0 });
                } else {
                    let response = { "success": 402, "text": "Error occured" };
                    res.json(response);
                }
            }else{
                let response = { "success": 402, "text": "Error occured" };
                    res.json(response);
            }
            
        } else {
            let response = { "success": 402, "text": "Please Enter Code ?" };
            res.json(response);
        }

    } finally {
        // Ensure the client is closed when finished
        await client.close();
    }
});


app.post("/addfeedback", async (req, res) => {
    let data = req.body;
    try {
        // Connect to the MongoDB server
        await client.connect();

        // Select a database (will be created if it doesn't exist)
        const database = client.db('artista');

        // Select a collection (will be created if it doesn't exist)
        const collection = database.collection('feedback');

        // Find and log documents from the collection
        const docs = await collection.insertOne({
            person_name: data.person_name,
            phone: data.phone,
            note: data.note
        });

        let response = { "success": 200, "lastInsertID": docs.insertedId};
        res.json(response);
    } finally {
        // Ensure the client is closed when finished
        await client.close();
    }
});


app.listen(PORT, (Error) => {
    if (Error) throw Error;
    console.log(`Your Server is Run http://localhost:${PORT}`);
});