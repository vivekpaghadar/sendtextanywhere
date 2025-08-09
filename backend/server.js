const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const path = require("path");
const Cryptr = require('cryptr');

const PORT = process.env.PORT || 3001;
const app = express();
const cryptr = new Cryptr('SendTextAnywhere5105');

// Middleware
app.use(express.json());
app.use(cors());

// Serve frontend build
const _dirname = path.dirname("");
const buildpath = path.join(_dirname, "../frontend/build");
app.use(express.static(buildpath));

// MongoDB URI (use environment variable in production)
const uri = process.env.MONGODB_URI || 'mongodb+srv://vivek_user:Vivek5105@sendtextanywhere.bvuwz.mongodb.net/?retryWrites=true&w=majority&appName=sendtextanywhere';

// Create MongoClient
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// This will hold our DB reference after connecting
let database;

async function connectDB() {
    try {
        await client.connect();
        database = client.db('sendtextanywheredatabase');
        console.log("✅ MongoDB connected");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    }
}

// Routes
app.get("/", (req, res) => {
    res.send("Connected to Backend!");
});

app.post("/addtext", async (req, res) => {
    let data = req.body;
    try {
        const collection = database.collection('messages');
        let Code = Math.floor(1000 + Math.random() * 9000);
        const encryptedString = cryptr.encrypt(data.message);

        const docs = await collection.insertOne({
            code: Code,
            message: encryptedString,
            status: 1
        });

        let response = {
            "success": 200,
            "lastInsertID": docs.insertedId,
            "code": Code,
            "text": data.message
        };
        res.json(response);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/gettext", async (req, res) => {
    let data = req.body;
    try {
        const collection = database.collection('messages');
        let code = parseInt(data.code);

        if (data.code != "") {
            const docs = await collection.find({ "code": code }).toArray();
            if (docs.length > 0 && docs[0].status === 1) {
                const decryptedString = cryptr.decrypt(docs[0].message);
                let response = { "success": 200, "text": decryptedString };
                res.json(response);

                await collection.updateOne({ code: code }, { $set: { status: 0 } });
                await collection.deleteOne({ code: code, status: 0 });
            } else {
                res.json({ "success": 402, "text": "Error occurred" });
            }
        } else {
            res.json({ "success": 402, "text": "Please Enter Code ?" });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/addfeedback", async (req, res) => {
    let data = req.body;
    try {
        const collection = database.collection('feedback');
        const docs = await collection.insertOne({
            person_name: data.person_name,
            phone: data.phone,
            note: data.note
        });

        let response = { "success": 200, "lastInsertID": docs.insertedId };
        res.json(response);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start server only after DB connects
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
});
