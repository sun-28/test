const express = require("express");
const mongoose = require("mongoose");
const Message = require("./Message");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Server Health OK!");
});

app.get("/allMsg", async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).send(messages);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

app.post("/newMsg", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    await Message.create({ name, email, subject, message });
    res.status(201).send("Message sent successfully");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log("Error connecting to MongoDB", err);
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
