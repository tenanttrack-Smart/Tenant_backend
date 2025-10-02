import express from "express"
import bcrypt from  "bcrypjs"
import JWT from "jsonwebtoken"
import prisma from "../prisma.js"
import {authenticateToken} from "../middleware/auth.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

router.post('/register', async (req,res)=> {
    try{
        const {name, email ,password ,role} = req.body
    //  Validate the input

        if(!name|| !email|| !password ||!role){
            return res.status(400).json({
                success:false,
                message: "name,email, password and role are required",
            })
        }; 
                if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long",
            });
            }

       // Check if the user already exists
          const existingUser = await prisma.user.findUnique({
              where: { email },
    });
        if(existingUser){
            return res.status(400).json({
                success:false,
                message: "user with this email already exists",
            })
        }
        
            // Hash the password

        //hash the password
        const saltRound =10
        const hashPassword = await bcrypt.hash(password,saltRound);
        //create the user
        const newUser = await prisma.user.create({
            data:{
                name,
                email,
                password: hashPassword,
                role, // role:landlord ,tenant staff
            },
            select:{
                id: true,
                name: true,
                email: true,
                role: true,
                createAt: true,
            },
        });
        //generate a jwt token
        const token = JWT.sign(
            {userId:newUser.id, role:newUser.role},
            JWT_SECRET,
            {expiresIn: "24h"}
        );

        // return the user data and token
        res.status(201).json({
            success: true,
            message: "user register successfully",
            data:{
                user: newUser,
                token,
            }
        })
    }catch(error){
        console.error("Register error:", error);
        res.status(500).json({
            success: false,
            message: "Error register  user",
            error: error.message
        })
    }
       
        
    
});
