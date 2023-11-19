const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")
const childBooks = require("./routes/bookFile");
const teenagerBooks = require("./routes/teenagerBook");
const adultBooks = require("./routes/adultBook")
const user = require("./routes/userFile")
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/books")
  .then(() => console.log("database connected"))
  .catch((err) => console.log("error in db connection"+ err));

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/user",user);
app.use("/child", childBooks);
app.use("/teenager", teenagerBooks);
app.use("/adult", adultBooks);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
