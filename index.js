const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const dns = require("node:dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const uri =
  "mongodb+srv://simpleCRUDdatabase:WVT2vebfJobAxqzo@cluster0.gj6wakz.mongodb.net/?appName=Cluster0";
app.use(cors());
app.use(express.json());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const db = client.db("simpleCRUDdb")
    const usersCollection = db.collection("users");
    app.get('/users' , async (req, res)=>{
          const cursor =usersCollection.find()
          const users = await cursor.toArray()
          res.send(users)
    })
    app.get('/users/:id' , async (req, res)=>{
          // const cursor =usersCollection.find()
          const id = req.params.id
          console.log(id)
          // console.log(req)
          const query = {
            _id: new ObjectId(id)
          }
          const user = await usersCollection.findOne(query)
          res.send(user)
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`Server is running of ${port}`);
});
