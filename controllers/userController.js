import User from "../models/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export async function createUser(req, res) {
    try {
        const newUserData = req.body;

        newUserData.password = bcrypt.hashSync(newUserData.password, 10);

        const user = new User(newUserData);
        await user.save();

        res.json({
            message: "User saved successfully"
        });
    } catch (error) {
        res.json({
            message: "User not created",
            error: error.message
        });
    }
}


export async function loginUser(req, res) {
    try {
        // Find the user by email
        const users = await User.find({ email: req.body.email });

        // Check if the user exists
        if (users.length === 0) {
            return res.json({
                message: "User Not Found"
            });
        }

        const user = users[0];

        // Compare the passwords
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);

        if (isPasswordCorrect) {
            // Generate a JWT token
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
                message: "User logged in",
                token: token
            });
        } else {
            res.json({
                message: "Password is wrong"
            });
        }
    } catch (error) {
        res.json({
            message: "Error logging in",
            error: error.message // Optional: provide error details for debugging
        });
    }
}

