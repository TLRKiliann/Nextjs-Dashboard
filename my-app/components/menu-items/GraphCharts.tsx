import React from 'react';
import TableGraphs from './TableGraphs';
import DoughnutChart from './graphs/DoughnutChart';
import DailyTraffic from './graphs/daily-traffic';
import OsFormatter from './graphs/os-formatter';
import BrowsersFormatter from './graphs/browsers-formatter';

export default function GraphCharts() {
    return (
        <div className='w-full h-full grid grid-cols-2 grid-rows-2 gap-4 p-4'>

            <TableGraphs>
                <DailyTraffic />
            </TableGraphs>

            <TableGraphs>
                <DoughnutChart />
            </TableGraphs>

            <TableGraphs>
                <OsFormatter />
            </TableGraphs>

            <TableGraphs>
                <BrowsersFormatter />
            </TableGraphs>

        </div>
    )
};
