import React from 'react'
import { subDays, startOfDay, format, endOfMonth, startOfMonth, startOfYear, endOfYear } from 'date-fns';
import BilanContentBox from './bilan-content-box';
import { getMessages } from '@/lib/getConnections';

export default async function BilanEmails() {
    try {
        // connections for last 7 days & connection average of last 7 days
        const today = startOfDay(new Date()).toISOString();
        const sevenDaysAgo = subDays(startOfDay(new Date()), 7).toISOString();

        // totalConnectionsPerMonth
        const currentMonth = new Date();
        const startOfMonthDate = startOfMonth(currentMonth).toISOString();
        const endOfMonthDate = endOfMonth(currentMonth).toISOString();
        
        // totalMsgPerYear
        const currentYear = new Date();
        const startOfYearDate = startOfYear(currentYear).toISOString();
        const endOfYearDate = endOfYear(currentYear).toISOString();

        // connections for last 7
        const messages = await getMessages(new Date(sevenDaysAgo), new Date(today));

        /* 
            1) timezone milliseconds initialzed to 0 (392Z (postgresql) to 000Z (date-fns))
            2) if no connection (equal to undefined) + 1 (next date)
        */
        const messagesByDay: {[key: string]: number} = {};
        messages.forEach((connection) => {
            const date = new Date(connection.createdAt);
            date.setMilliseconds(0);
            const formattedDate = format(date, 'yyyy-MM-dd');
            messagesByDay[formattedDate] = messagesByDay[formattedDate] 
                ? messagesByDay[formattedDate] + 1 
                : 1;
        });

        const totalMessages = Object.values(messagesByDay).reduce((acc, val) => acc + val, 0);
        const averageMessages: number = totalMessages > 0 ? totalMessages / 7 : 0;

        const averagePerDay: { averageMessages: number } = { averageMessages };

        // connectionsPerMonth
        const messagesPerMonth = await getMessages(new Date(startOfMonthDate), new Date(endOfMonthDate)); 

        const messagesByMonth: {[key: string]: number} = {};
        messagesPerMonth.forEach((connection) => {
            const date = new Date(connection.createdAt);
            date.setMilliseconds(0);
            const formattedDate = format(date, 'yyyy-MM-dd');
            messagesByMonth[formattedDate] = messagesByMonth[formattedDate] 
                ? messagesByMonth[formattedDate] + 1 
                : 1;
        });

        const totalMessagesPerMonth: number = Object.values(messagesByMonth).reduce((acc, val) => acc + val, 0);

        // connectionsPerYear
        const messagesPerYear = await getMessages(new Date(startOfYearDate), new Date(endOfYearDate));

        const nbMessagesPerYear: {[key: string]: number} = {};
        messagesPerYear.forEach((connection) => {
            const date = new Date(connection.createdAt);
            const formattedMonth = format(date, 'yyyy-MM');
            nbMessagesPerYear[formattedMonth] = nbMessagesPerYear[formattedMonth] 
                ? nbMessagesPerYear[formattedMonth] + 1 
                : 1;
        });

        const totalMsgPerYear: number = Object.values(nbMessagesPerYear).reduce((acc, val) => acc + val, 0);

        return (
            <BilanContentBox 
                str_1="Msg per day"
                str_2="Msg per week"
                str_3="Msg per month"
                str_4="Msg per year"
                value_1={averagePerDay.averageMessages.toFixed(2)}
                value_2={totalMessages}
                value_3={totalMessagesPerMonth}
                value_4={totalMsgPerYear}
            />
        )
    } catch (error) {
        console.error("Error: bilan-emails error!");
        return <div>Error loading data</div>;
    }
}
