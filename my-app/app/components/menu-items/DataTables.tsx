import React from 'react';
import TableGraphs from '../TableGraphs';
import LineChart from '../graphs/LineChart';

export default function DataTables() {
    return (
        <div className='w-full h-full grid grid-cols-2 grid-rows-2'>

            <TableGraphs>
                <div className='flex items-center h-[10%] mt-4 mb-0 ml-4'>
                    <h2 className='text-xl'>Connection Per Day</h2>
                </div>

                <div className='h-[90%]'>
                    <LineChart />
                </div>
            </TableGraphs>

            <TableGraphs>
                <div className='flex items-center h-[10%] mt-4 mb-0 ml-4'>
                    <h2 className='text-xl'>Daily Traffic</h2>
                </div>

                <div className='h-[90%]'>
                    <LineChart />
                </div>
            </TableGraphs>

            <TableGraphs>
                <div className='flex items-center h-[10%] mt-4 mb-0 ml-4'>
                    <h2 className='text-xl'>Amount Spend</h2>
                </div>

                <div className='h-[90%]'>
                    <LineChart />
                </div>
            </TableGraphs>

            <TableGraphs>
                <div className='flex items-center h-[10%] mt-4 mb-0 ml-4'>
                    <h2 className='text-xl'>Stock</h2>
                </div>

                <div className='h-[90%]'>
                    <LineChart />
                </div>
            </TableGraphs>

        </div>
    )
}
