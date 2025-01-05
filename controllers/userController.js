import User from "../models/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

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