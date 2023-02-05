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

    const db = client.db("reduxthunk");
    const postCollection = db.collection("post");

    app.get('/posts', async (req, res)=> {
      const cursor = await postCollection.find({});
      const posts = await cursor.toArray();
      res.send(posts);
    })

    app.get('/post/:id', async(req, res)=> {
      const id = req.params.id;
      const post = await postCollection.findOne({_id: ObjectId(id)});
      res.send(post);
    })

    app.post('/post', async(req, res)=> {
      const post = req.body;
      const data =  {
        ...post, 
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      const result = await postCollection.insertOne(data);
      res.send(result);

    })
    app.delete("/post/:id", async (req, res) => {
      const id = req.params.id;

      const result = await postCollection.deleteOne({ _id: ObjectId(id) });
      res.send(result);
    });

    app.patch('/post/:id', async(req, res)=> {
      const id = req.params.id;
      const data = req.body
      const result = await postCollection.fineOne({_id: ObjectId(id)});
      res.send(result);

    })

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
