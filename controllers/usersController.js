import jwt from "jsonwebtoken";

const users = [
    {'email': "test1@test.com", 'username': "test1", "id": 1, "password": "123456"},
    {'email': "test2@test.com", 'username': "test2", "id": 2, "password": "123456"},
    {'email': "test3@test.com", 'username': "test3", "id": 3, "password": "123456"},
    {'email': "test4@test.com", 'username': "test4", "id": 4, "password": "123456"},
  ]

export async function loginUser(req, res) {
    console.log('req Data', req.body.password, req.body.email)
    users.filter(user =>{
      if (user.email === req.body.email){
        if(user.password === req.body.password){
          console.log(user)
  
          const payload= {
            "id":user.id
          }
  
          jwt.sign(payload, "shhh", {expiresIn:"10h"}, (err,token)=>{
            res.json(
              {token:token}
            )
          })
        }
      }
    })
  }
