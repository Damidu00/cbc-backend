import User from "../models/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import axios from "axios";

dotenv.config()

export async function createUser(req, res) {
    try {
        const newUserData = req.body;

        if(newUserData.type == "admin"){
            if(req.user == null){
                res.json({
                    message:"please login as administrator to create admin account😏"
                })
                retun
            }

            if(req.user.type != "admin"){
            
                res.json({
                    message:"please login as administrator to create admin account😏"
                })
                return
            }
        }

        newUserData.password = bcrypt.hashSync(newUserData.password, 10);

        const user = new User(newUserData);
        await user.save();

        res.json({
            message: "User saved successfully😮‍💨"
        });
    } catch (error) {
        res.json({
            message: "User not created😕",
            error: error.message
        });
    }
}


export async function loginUser(req, res) {
    try {
        const users = await User.find({ email: req.body.email });

        if (users.length === 0) {
            return res.json({
                message: "User Not Found..Please User Correct Email 😏"
            });
        }

        const user = users[0];

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);

        if (isPasswordCorrect) {
            
            const token = jwt.sign(
                {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    isBlocked: user.isBlocked,
                    type: user.type,
                    profilePicture: user.profilePicture
                },
                process.env.SECRET
            );

            console.log(token);

            res.json({
                message: "You Loged In succsessfully😮‍💨",
                token: token,
                user : {
                    firstName : user.firstName,
                    lastName: user.lastName,
                    type: user.type,
                    profilePicture: user.profilePicture,
                    email : user.email
                }
            });
        } else {
            res.json({
                message: "Password is wrong..please try with correct password 😊👍"
            });
        }
    } catch (error) {
        res.json({
            message: "Error logging in😕",
            error: error.message
        });
    }
}

export function isAdmin(req){
    if(req.user == null){
        return false
    }

    if(req.user.type != "admin"){
        return false
    }
    return true
}

export function isCustomer(req){
    if(req.user == null){
        return false
    }
    if(req.user.type != "customer"){
        return false
    }

    return true
}

export async function deleteUserById(req,res){
    try {
        if(!isAdmin(req)){
            return res.json({
                message : "Only admins can delete users😏"
            })
        }

        const userId = req.params.id;
        
        if(!userId){
            return res.json({
                message : "User Id is required🧐"
            })
        }

        const deletedUser = await User.findByIdAndDelete(userId);

        if(!deletedUser){
            return res.json({
                message : "user not found🧐"
            })
        }

        res.json({
            message : "user deleteed successfully😮‍💨"
        })

    } catch (error) {
        res.json({
            error : error.message,
            message : " error deleting user😕"
        })
    }
}


export async function getAllUsers(req,res){
    try {
        if(!isAdmin(req)){
            return res.json({
                message : "only admin can see users😕"
            })
        }
        const users = await User.find()
        if(users.length === 0){
            return res.json({
                message : "No users found😕"
            })
        }
    
        res.json({
            users : users
        })
    } catch (error) {
        res.json({
            message : "error fetching users😕",
            error : error.message
        })
    }
}

export async function googleLogin(req,res){
    console.log(req.body)
    const token = req.body.token
    //'https://www.googleapis.com/oauth2/v3/userinfo'
    try{
      const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo',{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const email = response.data.email
      //check if user exists
      const usersList = await User.find({email: email})
      if(usersList.length >0){
        const user = usersList[0]
        const token = jwt.sign({
          email : user.email,
          firstName : user.firstName,
          lastName : user.lastName,
          isBlocked : user.isBlocked,
          type : user.type,
          profilePicture : user.profilePicture
        } , process.env.SECRET)
        
        res.status(200).json({
          message: "User logged in",
          token: token,
          user : {
            firstName : user.firstName,
            lastName : user.lastName,
            type : user.type,
            profilePicture : user.profilePicture,
            email : user.email
          }
        })
      }else{
        //create new user
        const newUserData = {
          email: email,
          firstName: response.data.given_name,
          lastName: response.data.family_name,
          type: "customer",
          password: "ffffff",
          profilePicture: response.data.picture
        }
        const user = new User(newUserData)
        user.save().then(()=>{
          res.status(200).json({
            message: "User created"
          })
        }).catch((error)=>{
          res.status(403).json({      
            message: "User not created"
          })
        })
  
      }
  
    }catch (e) {
        console.error("Google login error:", e.response?.data || e.message);
        res.status(401).json({
          message: "Google login failed",
          error: e.response?.data || e.message
        });
      }
  }

  