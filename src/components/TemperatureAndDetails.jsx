import React from 'react';
import {
    UilTemperature,
    UilTemperaturePlus,
    UilTemperatureMinus,
    UilTear,
    UilWind,
    UilSun,
    UilSunset,
} from '@iconscout/react-unicons';
import { formatToLocalTime, iconUrlFromCode } from '../services/weatherService';

function TemperatureAndDetails({ weather: {
    details, icon, temp, feels_like, temp_max, temp_min, humidity, sunrise, sunset, speed, timezone }, units = 'metric' }) {

    const windSpeedUnit = units === 'imperial' ? 'mph' : 'm/s';

    return (
        <div>
            <div className='flex items-center justify-center py-6 text-xl text-cyan-50'>
                <p>{details}</p>
            </div>
            <div className='flex flex-row items-center justify-between text-white py-3'>
                <img
                    src={iconUrlFromCode(icon)}
                    alt=""
                    className='w-35 rounded-full filter brightness-110'
                    style={{
                        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 60%)',
                    }}
                />
                <p className='text-5xl'>{`${temp.toFixed()}°`}</p>
                <div className='flex flex-col space-y-2'>
                    <div className='flex font-light text-sm items-center justify-start'>
                        <UilTemperature size={18} className="mr-1" />
                        Real feel:
                        <span className='font-medium ml-1'>{`${feels_like.toFixed()}°`}</span>
                    </div>

                    <div className='flex font-light text-sm items-center justify-start'>
                        <UilTear size={18} className="mr-1" />
                        Himidity:
                        <span className='font-medium ml-1'>{`${humidity.toFixed()}%`}</span>
                    </div>

                    <div className='flex font-light text-sm items-center justify-start'>
                        <UilWind size={18} className="mr-1" />
                        Wind:
                        <span className='font-medium ml-1'>{`${speed.toFixed()}${windSpeedUnit}`}</span>
                    </div>
                </div>
            </div>

            <div className='flex flex-row items-center justify-center flex-wrap'>
                <div className='flex flex-row items-center justify-center space-x-2 text-white text-sm py-3 w-full md:w-7/12'>
                    <UilSun />
                    <p className='font-light whitespace-nowrap'>
                        Rise: <span className='font-medium ml-1'>{formatToLocalTime(sunrise, timezone, 'hh:mm a')}</span>
                    </p>

                    <p className='font-light'>|</p>

                    <UilSunset />
                    <p className='font-light whitespace-nowrap'>
                        Set: <span className='font-medium ml-1'>{formatToLocalTime(sunset, timezone, 'hh:mm a')}</span>
                    </p>

                    <p className='font-light hidden md:inline'>|</p>
                </div>
                <div className='flex flex-row items-center justify-center space-x-2 text-white text-sm py-3 w-full md:w-5/12'>
                    <UilTemperaturePlus />
                    <p className='font-light'>
                        High: <span className='font-medium ml-1'>{`${temp_max.toFixed()}°`}</span>
                    </p>

                    <p className='font-light'>|</p>

                    <UilTemperatureMinus />
                    <p className='font-light'>
                        Low: <span className='font-medium ml-1'>{`${temp_min.toFixed()}°`}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TemperatureAndDetails
