import express from "express"
import prisma from "../lib/prisma"

const route = express.Router();

//get all notifications
route.get("/", async (req, res)=>{
  const {userId ,status} = req.query;
  const filter ={
    where:{
        userId: parseInt(userId),
       ... (status === "unread"? {isRead:false}:{}),
       ... (status ==="read" ? {isRead: true}: {})
    },
    orderBy:{createdAt: "desc"},
};
    
    const notifications = await prisma.notification.findMany(filter);
    res.json(notifications);
  
});

//create
route.post("/", async (req,res)=>{
    const{userId,title,message,type} =req.body;
    const notification = await prisma.notification.create({
        data:{
            userId,
            title,
            message,
            type
        },
        
    });
    res.json(notification);
});

//make one 