import React from 'react';
import TableGraphs from '../TableGraphs';
import LineChart from '../graphs/LineChart';
import BarChartOs from '../graphs/BarChartOs';
import BarChartBrowser from '../graphs/BarChartBrowser';
import {DoughnutChart} from '../graphs/DoughnutChart';

export default function DataTables() {
    return (
        <div className='w-full h-full grid grid-cols-2 grid-rows-2'>

            <TableGraphs>
                <div className='flex items-center justify-center h-[100%]'>
                    <LineChart />
                </div>
            </TableGraphs>

            <TableGraphs>
                <div className='flex items-center justify-center h-[100%]'>
                    <DoughnutChart />
                </div>
            </TableGraphs>

            <TableGraphs>
                <div className='flex items-center justify-center h-[100%]'>
                    <BarChartOs />
                </div>
            </TableGraphs>

            <TableGraphs>
                <div className='flex items-center justify-center h-[100%]'>
                    <BarChartBrowser />
                </div>
            </TableGraphs>

        </div>
    )
}
