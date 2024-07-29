import React from 'react';
import TableGraphs from './TableGraphs';
import BarChartOs from './graphs/BarChartOs';
import BarChartBrowser from './graphs/BarChartBrowser';
import DoughnutChart from './graphs/DoughnutChart';
import DailyTraffic from './graphs/daily-traffic';

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
                <BarChartOs />
            </TableGraphs>

            <TableGraphs>
                <BarChartBrowser />
            </TableGraphs>

        </div>
    )
};
