const express = require("express");
const app = express();
app.post("/data", (req, res) => {
  console.log("hi");
  res.send("hello first one");
});
app.get("/", (req, res) => {
  console.log("hi");
  res.send("dhjasdhj");
});
app.listen(3000, () => {
  console.log("listening to the port");
});
