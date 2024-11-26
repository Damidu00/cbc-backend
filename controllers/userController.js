import User from "../models/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export function createUser(req,res){

    const newUserData = req.body
    newUserData.password = bcrypt.hashSync(newUserData.password, 10)

    const user = new User(newUserData)

    user.save().then(()=> {
        res.json({
         message : "User saved successfully"
        })
    }).catch(()=>{
        res.json({
            message : "user not created" 
        })
    })
}

export function loginUser(req,res){
    
    User.find({email: req.body.email}).then((users)=>{
        if(users.length == 0){
            res.json({
                message: "User Not Found"
            }) 
        }else{
            const user = users[0]
            const isPasswordCorrect = bcrypt.compareSync(req.body.password,user.password)

            if(isPasswordCorrect){
                
                const token = jwt.sign({
                    email : user.email,
                    firstNmae : user.firstNmae,
                    lastName : user.lastName,
                    isBlocked: user.isBlocked,
                    type : user.type,
                    profilrPicture : user.profilrPicture
                    
                },"cbc-secret-key-2024")
                console.log(token)

                res.json({
                    message : "User Loged in",
                    token : token
                })

            }else{
                res.json({
                    message : "Password is wrong"
                })
            }

        }
    })
}
