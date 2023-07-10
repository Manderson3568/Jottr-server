import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import bodyParser from "body-parser";
import pkg from 'pg';
const {Pool} = pkg;
import { config } from 'dotenv';
import usersRouter from './routes/users.js';
config();

const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

// const users = [
//   {'email': "test1@test.com", 'username': "test1", "id": 1, "password": "123456"},
//   {'email': "test2@test.com", 'username': "test2", "id": 2, "password": "123456"},
//   {'email': "test3@test.com", 'username': "test3", "id": 3, "password": "123456"},
//   {'email': "test4@test.com", 'username': "test4", "id": 4, "password": "123456"},
// ]

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

app.get("/api", (req, res) => {
  res.json({
    message: "This is a test",
  });
});

app.use('/api/users', usersRouter);

// app.post('/api/login',(req, res)=>{
//   console.log('req Data', req.body.password, req.body.email)
//   users.filter(user =>{
//     if (user.email === req.body.email){
//       if(user.password === req.body.password){
//         console.log(user)

//         const payload= {
//           "id":user.id
//         }

//         jwt.sign(payload, "shhh", {expiresIn:"10h"}, (err,token)=>{
//           res.json(
//             {token:token}
//           )
//         })
//       }
//     }
//   })
// })

const verifyToken =(req,res,next)=>{
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader !== "undefined"){
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    req.token = bearerToken;
    next()
  }
  else{
    res.sendStatus(403)
  }
}

app.post('/api/posts', verifyToken, (req,res)=>{
  jwt.verify(req.token,  "shhh", (err,authData)=>{
    if(err){
      res.sendStatus(403)
    }else {
      res.json({
        message:"blog posted!!!",
        authData: authData
      })
    }
  })
})

app.listen(8000, () => {
  console.log("started on port 8000");
  console.log("http://localhost:8000/");
});
