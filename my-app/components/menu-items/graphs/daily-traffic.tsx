import prisma from '@/prisma/prisma';
import { subDays, startOfDay, format } from 'date-fns';
import LineChart from './statistics/LineChart';

export default async function DailyTraffic() {
    try {
        // ISO 8601 format (createdAt)
        const today = startOfDay(new Date()).toISOString();
        const sevenDaysAgo = subDays(startOfDay(new Date()), 7).toISOString();
        
        const connections = await prisma.connection.findMany({
            where: {
                createdAt: {
                    gte: new Date(sevenDaysAgo),
                    lte: new Date(today),
                }
            }
        });

        if (!connections) {
            throw new Error("Error: prisma connection failed!");
        };
    
        /* 
            1) timezone milliseconds initialzed to 0 (392Z (postgresql) to 000Z (date-fns))
            2) if no connection (equal to undefined) + 1 (next date)
        */
        const connectionsByDay: {[key: string]: number} = {};
        connections.forEach((connection) => {
            const date = new Date(connection.createdAt);
            date.setMilliseconds(0);
            const formattedDate = format(date, 'yyyy-MM-dd');
            connectionsByDay[formattedDate] = connectionsByDay[formattedDate] 
                ? connectionsByDay[formattedDate] + 1 
                : 1;
        });

        // convert data for LineChart.tsx to [{date: string, connections: number}]
        const dataForChart: {date: string, connections: number}[] = Object.keys(connectionsByDay).map((date) => (
            { date, connections: connectionsByDay[date] }
        ));
    
        return (
            <LineChart dataForChart={dataForChart} />
        );

    } catch (error) {
        throw new Error("Error: No connection found for the specified period.");
    };
};
