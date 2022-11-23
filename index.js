const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;



// middleware
app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kwieioj.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }); 

async function run(){

  try{
    await client.connect();
    const productsCollection = client.db("computerHouseDB").collection('products');

    // GET API ALL PRODUCTS
    app.get('/products', async(req, res) => {
      const query = {}
      const cursor = productsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
      console.log(result); 
    })

  }
  finally{
    // await client.close();
  }

}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('My Computer house node server');
});


app.listen(port, () => {
    console.log('My server is Running......');
})