import { subDays, startOfDay, format, endOfMonth, startOfMonth, startOfYear, endOfYear, endOfDay } from 'date-fns';
import { getMessages } from '@/lib/functions';
import BilanContentBox from './bilan-content-box';

export default async function BilanEmails() {
    try {
        // connections for last 7 days & connection average of last 7 days
        //const today = startOfDay(new Date()).toISOString();
        const endOfToday = endOfDay(new Date()).toISOString();
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
        const messages = await getMessages(new Date(sevenDaysAgo), new Date(endOfToday));
        
        if (messages.length === 0) {
            return (
                <div className='flex items-center justify-center w-full h-full bg-white rounded-md shadow-md'>
                    <p className='bg-slate-100/70 p-2'>No messages in the last 7 days!</p>
                </div>
            )
        };
        /* 
            1) timezone milliseconds initialzed to 0 (392Z (postgresql) to 000Z (date-fns))
            2) if no connection (equal to undefined) + 1 (next date)
        */
        const messagesByDay: {[key: string]: number} = {};
        messages.forEach((message) => {
            const date = new Date(message.createdAt);
            date.setMilliseconds(0);
            const formattedDate = format(date, 'yyyy-MM-dd');
            messagesByDay[formattedDate] = messagesByDay[formattedDate] 
                ? messagesByDay[formattedDate] + 1 
                : 1;
        });

        const totalMessages: number = Object.values(messagesByDay).reduce((acc, val) => acc + val, 0);
        const averageMessages: number = totalMessages > 0 ? totalMessages / 7 : 0;

        const averagePerDay: { averageMessages: number } = { averageMessages };
        
        // connectionsPerMonth
        const messagesPerMonth = await getMessages(new Date(startOfMonthDate), new Date(endOfMonthDate)); 
        console.log("ok messagesPerMonth")

        const messagesByMonth: {[key: string]: number} = {};
        messagesPerMonth.forEach((message) => {
            const date = new Date(message.createdAt);
            date.setMilliseconds(0);
            const formattedDatePerMonth = format(date, 'yyyy-MM-dd');
            messagesByMonth[formattedDatePerMonth] = messagesByMonth[formattedDatePerMonth] 
                ? messagesByMonth[formattedDatePerMonth] + 1 
                : 1;
        });

        const totalMessagesPerMonth: number = Object.values(messagesByMonth).reduce((acc, val) => acc + val, 0);

        // connectionsPerYear
        const messagesPerYear = await getMessages(new Date(startOfYearDate), new Date(endOfYearDate));
        console.log("messagesPerYear");

        const nbMessagesPerYear: {[key: string]: number} = {};
        messagesPerYear.forEach((message) => {
            const date = new Date(message.createdAt);
            const formattedPerYear = format(date, 'yyyy-MM');
            nbMessagesPerYear[formattedPerYear] = nbMessagesPerYear[formattedPerYear] 
                ? nbMessagesPerYear[formattedPerYear] + 1 
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
        console.error("Error: bilan-emails error!", error);
        return <div>Error loading data</div>;
    }
}
