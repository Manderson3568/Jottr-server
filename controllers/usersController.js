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
              res.json(
                {
                  token:token,
                  payload: payload
                }
              )
            })
          }
      } catch (err) {
        console.log(err);
      }
    };
    
  
