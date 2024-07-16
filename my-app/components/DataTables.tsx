import React from 'react';
import TableGraphs from './TableGraphs';
import LineChart from './menu-items/graphs/LineChart';
import BarChartOs from './menu-items/graphs/BarChartOs';
import BarChartBrowser from './menu-items/graphs/BarChartBrowser';
import DoughnutChart from './menu-items/graphs/DoughnutChart';

export default function DataTables() {
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
