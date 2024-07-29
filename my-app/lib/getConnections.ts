import prisma from "@/prisma/prisma";
import { Connection, Message } from "@prisma/client";

export const getConnections = async (startDate: Date, endDate: Date): Promise<Connection[]> => {
    try {
        const connections = await prisma.connection.findMany({
            where: {
                createdAt: {
                    gte: new Date(startDate),
                    lte: new Date(endDate),
                }
            }
        });
    
        if (connections.length === 0) {
            throw new Error("Error: prisma connection failed!");
        };

        return connections;
    } catch (error) {
        console.log("Error: connections fetch failed (getConnections())", error);
        throw new Error("Error: connections fetch failed (getConnections())");
    }
};

export const getMessages = async (startDate: Date, endDate: Date): Promise<Message[]> => {
    try {
        const messages = await prisma.message.findMany({
            where: {
                createdAt: {
                    gte: new Date(startDate),
                    lte: new Date(endDate),
                }
            }
        });
    
        if (messages.length === 0) {
            throw new Error("Error: prisma connection failed!");
        };

        return messages;
    } catch (error) {
        console.log("Error: connections fetch failed (getConnections())", error);
        throw new Error("Error: connections fetch failed (getConnections())");
    }
};