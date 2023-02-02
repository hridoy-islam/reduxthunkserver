require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");

app.use(cors());
app.use(express.json());

// const uri = process.env.MONGO_URL;
const uri = `mongodb://localhost:27017/`
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {

    // const db = client.db("reduxthunk");
    // const postCollection = db.collection("post");

    // app.get("/products", async (req, res) => {
    //   const cursor = productCollection.find({});
    //   const product = await cursor.toArray();

    //   res.send({ status: true, data: product });
    // });

    
     
  } finally {
  }
};

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Welcome to Redux thunk Server!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
