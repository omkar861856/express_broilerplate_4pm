import express from 'express'
import 'dotenv/config'
import { main } from './db.js';

const app = express();  

const PORT = process.env.PORT || 3000;

const db = await main();
const collection = db.collection('todos');


app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post('/', (req, res)=>{

})

app.put('/', (req, res)=>{
  
})

app.delete('/', (req, res)=>{
  
})

app.listen(PORT, ()=>{
  console.log("Server running on port 3000")
})
