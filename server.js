import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();

app.get("/api", (req, res) => {
  res.json({
    message: "This is a test",
  });
});

app.listen(8000, () => {
  console.log("started on port 8000");
  console.log("http://localhost:8000/");
});
