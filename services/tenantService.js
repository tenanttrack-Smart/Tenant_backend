import {PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createTenant = async (data) =>{
    try {
        const {
            userId,
            phone,
            propertyName,
            unitNumber,
            monthlyRent,
            depositAmount,
            startDate,
            endDate,
            status,
        } = data;

        const tenant = await prisma.tenant.create ({
            data:{
                userId,
                phone,
                propertyName,
                unitNumber,
                monthlyRent,
                depositAmount,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                status,
            },
            include: { user: true},
        });
        return tenant;       

    }catch (error){
        throw new Error(error.message)
    }
    
};
// Get all Tenants
export const getAllTenants = async () => {
    try {
        return await prisma.tenant.findMany({
            include:{user: true},    
     });

    }catch (error){
        throw new Error({error: error.message})
    }
};

// Get By ID
export const getTenantsById = async (id) => {
    try {
        const tenant = await prisma.tenant.findUnique ({
            where: { id },
            include: { user: true},
        });
        if (!tenant) 
            return null;
        
        return tenant;        
            

    } catch (error){
       throw new Error({error: error.message})
    }

};


// Update Tenant
export const updateTenant = async (id, data) => {
    try {        
        const {
            phone,
            propertyName,
            unitNumber,
            monthlyRent,
            depositAmount,
            startDate,
            endDate,
            status,
        } = data;
        const tenant = await prisma.tenant.update({
            where: { id },
            data: {
               phone,
               propertyName,
               unitNumber,
               monthlyRent,
               depositAmount,
               startDate: new Date (startDate),
               endDate: new Date(endDate),
               status,               
            },
        });
        return tenant;        

    }catch (error){
        throw new Error({error: error.message})
        
    }

};

// Delete Tenant

export const deleteTenant = async (id) => {
    try {        
        await prisma.tenant.delete ({
            where: { id },
        });
        return {message: " Tenant deleted successfully"};
        
        

    } catch (error){
        throw new Error({error: error.message})
    }
};
