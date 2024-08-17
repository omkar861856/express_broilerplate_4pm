import express from "express";
import "dotenv/config";
import { main } from "./db.js";
import { ObjectId } from "mongodb";

const app = express();

// middleware to parse incoming requests
app.use(express.json());

const PORT = process.env.PORT || 3000;

const db = await main();
const collection = db.collection("todos");

app.get("/", function (req, res) {
  res.send("Hello World of Todos");
});

app.post("/todo", async (req, res) => {
  try {
    const todo = req.body;
    const insertResult = await collection.insertOne(todo);
    console.log("Inserted documents =>", insertResult);
    res.status(201).send({ msg: "Inserted todo successfully", insertResult });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

app.get("/todos", async (req, res) => {
  try {
    const findResult = await collection.find({}).toArray();
    console.log("Found documents =>", findResult);
    res.status(200).send(findResult);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// url prams

// query params

app.get("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const _id = new ObjectId(id);

    const findResult = await collection.findOne({ _id });
    console.log("Found documents =>", findResult);
    res.status(200).send(findResult);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const _id = new ObjectId(id);

    const findResult = await collection.deleteOne({ _id });
    if (findResult.deletedCount === 0) {
      res.send({ msg: "Todo doesnt exist" });
    }
    console.log("Found documents =>", findResult);
    res.status(200).send({ findResult, msg: "Todo deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

app.listen(PORT, () => {
  console.log("Server running on port 3000");
});
