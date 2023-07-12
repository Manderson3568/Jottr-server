import jwt from "jsonwebtoken";
import pool from '../db/db.js';

export async function loginUser(req, res) {
    try {
        const result = await pool.query('SELECT * FROM users WHERE email= $1',[req.body.email]);
        let user = result.rows[0]
        console.log("user" ,req.body)
        if(user.password === req.body.password){
            console.log(user)    
            const payload= {
              "id":user.id,
              'name': user.name,
              'admin': user.admin,
              'login':true
            }
            jwt.sign(payload, "shhh", {expiresIn:"10h"}, (err,token)=>{
              res.status(200)
              res.json(
                {
                  token:token,
                  payload: payload
                }
              )
            })
          }
      } catch (err) {
        res.status(500)
        res.json({
          message:"There was an error processing your request",
          error: err
        })
      }
    };  
    export async function signupUser(req, res) {
      const {name, email, password} = req.body
      try {
        const user = await pool.query('SELECT * from users WHERE email= $1', [email])
        if (user.rows.length > 0 ){
          res.status(409)
          res.json({
            message: 'User already exists with this email',
          })
        } else {
          try {
            const result = await pool.query('INSERT INTO users (name, email, password) VALUES ($1,$2,$3)',[name,email,password]);
            res.status(200)
            res.json({
              message: "Signed up successfully",
            })
          } catch (err) {
            res.status(500)
            res.json({
              message:"There was an error processing your request",
              error: err
            })
          }
        }
      }catch (err) {
        res.status(500)
        res.json({
          message:"There was an error processing your request",
          error: err
        })
      }

      };