import { subDays, startOfDay, format, endOfMonth, startOfMonth, startOfYear, endOfYear } from 'date-fns';
import { getConnections } from '@/lib/functions';
import BilanContentBox from './bilan-content-box';

export default async function BilanConnections() {
    try {
        // connections for last 7 days & connection average of last 7 days
        const today = startOfDay(new Date()).toISOString();
        const sevenDaysAgo = subDays(startOfDay(new Date()), 7).toISOString();

        // totalConnectionsPerMonth
        const currentMonth = new Date();
        const startOfMonthDate = startOfMonth(currentMonth).toISOString();
        const endOfMonthDate = endOfMonth(currentMonth).toISOString();
        
        // totalConnectionsPerYear
        const currentYear = new Date();
        const startOfYearDate = startOfYear(currentYear).toISOString();
        const endOfYearDate = endOfYear(currentYear).toISOString();

        // connections for last 7
        const connections = await getConnections(new Date(sevenDaysAgo), new Date(today));

        if (connections.length === 0) {
            return (
                <div className='flex items-center justify-center w-full h-full bg-white rounded-md shadow-md'>
                    <p className='bg-slate-100/70 p-2'>No connections in the last 7 days!</p>
                </div>
            )
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

        const totalConnections = Object.values(connectionsByDay).reduce((acc, val) => acc + val, 0);
        const averageConnections: number = totalConnections > 0 ? totalConnections / 7 : 0;

        const averagePerDay: { averageConnections: number } = { averageConnections };

        // connectionsPerMonth
        const connectionsPerMonth = await getConnections(new Date(startOfMonthDate), new Date(endOfMonthDate)); 

        const connectionsByMonth: {[key: string]: number} = {};
        connectionsPerMonth.forEach((connection) => {
            const date = new Date(connection.createdAt);
            date.setMilliseconds(0);
            const formattedDate = format(date, 'yyyy-MM-dd');
            connectionsByMonth[formattedDate] = connectionsByMonth[formattedDate] 
                ? connectionsByMonth[formattedDate] + 1 
                : 1;
        });

        const totalConnectionsPerMonth: number = Object.values(connectionsByMonth).reduce((acc, val) => acc + val, 0);

        // connectionsPerYear
        const connectionsPerYear = await getConnections(new Date(startOfYearDate), new Date(endOfYearDate));

        const nbConnectionsPerYear: {[key: string]: number} = {};
        connectionsPerYear.forEach((connection) => {
            const date = new Date(connection.createdAt);
            const formattedMonth = format(date, 'yyyy-MM');
            nbConnectionsPerYear[formattedMonth] = nbConnectionsPerYear[formattedMonth] 
                ? nbConnectionsPerYear[formattedMonth] + 1 
                : 1;
        });

        const totalConnectionsPerYear: number = Object.values(nbConnectionsPerYear).reduce((acc, val) => acc + val, 0);

        return (
            <BilanContentBox 
                str_1="Nb of connection per day"
                str_2="Nb of connection per week"
                str_3="Nb of connection per month"
                str_4="Nb of connection per year"
                value_1={averagePerDay.averageConnections.toFixed(2)}
                value_2={totalConnections}
                value_3={totalConnectionsPerMonth}
                value_4={totalConnectionsPerYear}
            />
        )
    } catch (error) {
        console.error("Error: bilan-connections error!");
        return <div>Error loading data</div>;
    }
};
