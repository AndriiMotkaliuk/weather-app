import React from 'react'
import { iconUrlFromCode } from '../services/weatherService'
import { v4 as uuidv4 } from 'uuid';

function Forecast({ title, items }) {
    return (
        <div>
            <div className='flex items-center justify-start mt-6'>
                <p className='text-white font-medium uppercase'>{title}</p>
            </div>

            <hr className='h-1 my-2' />

            <div className='flex flex-row items-center justify-between text-white'>

                {items.map((item) => (

                    <div key={uuidv4()} className='flex flex-col items-center justify-center'>
                        <p className='font-light text-sm'>{item.title}</p>
                        <img
                            src={iconUrlFromCode(item.icon)}
                            alt=""
                            className='w-14 my-1' />
                        <p className='font-medium'>{`${item.temp.toFixed()}°`}</p>
                    </div>

                ))}
            </div>

        </div>
    )
}

export default Forecast
