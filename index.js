const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config();

app.use(cors());
app.use(express.json());


// a6xxBgEkOYZ7MAtE
// Agro_admin

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7om1ewe.mongodb.net/?retryWrites=true&w=majority`
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
  try {
    await client.connect();
    const usersCollection = client.db('AgroSheild').collection('User');

    app.get('/users', async(req,res)=>{
          const query={}
          const user = await usersCollection.find(query).toArray();
          res.send(user)
        })

    app.post('/users', async(req,res)=>{
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(result)
    })
    
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);










app.get('/', (req, res) => {
    res.send('Hello from AlgroSheild Uncle! : User '+ process.env.DB_USER +" pass: "+ process.env.DB_PASS )
  })
  
app.listen(port, () => {
console.log(`AlgroSheild app port ${port}`)
})