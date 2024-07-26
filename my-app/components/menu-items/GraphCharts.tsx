import React from 'react';
import TableGraphs from './TableGraphs';
import LineChart from './graphs/LineChart';
import BarChartOs from './graphs/BarChartOs';
import BarChartBrowser from './graphs/BarChartBrowser';
import DoughnutChart from './graphs/DoughnutChart';

export default function GraphCharts() {
    return (
        <div className='w-full h-full grid grid-cols-2 grid-rows-2'>

            <TableGraphs>
                <LineChart />
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
