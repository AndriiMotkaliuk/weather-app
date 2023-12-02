import './App.css';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import clear_sky_image from './images/01_clear_sky.jpg';
import few_clouds_image from './images/02_few_clouds.jpg';
import scattered_clouds_image from './images/03_scattered_clouds.jpg';
import broken_clouds_image from './images/04_broken-clouds.jpg';
import shower_rain_image from './images/09_shower_rain.jpg';
import rain_image from './images/10_rain.jpg';
import thunderstorm_image from './images/11_thunderstorm.jpg';
import snow_image from './images/13_snow.jpg';
import mist_image from './images/50_mist.jpg';

import clear_sky_night_image from './images/01_clear_sky_night.jpg';
import few_clouds_night_image from './images/02_few_clouds_night.jpg';
import scattered_clouds_night_image from './images/03_scattered_clouds_night.jpg';
import broken_clouds_night_image from './images/04_broken_clouds_night.jpg';
import shower_rain_night_image from './images/09_shower_rain_night.jpg';
import rain_night_image from './images/10_rain_night.jpg';

function App() {

  const [query, setQuery] = useState({ q: 'kyiv' });
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const message = query.q ? query.q : "current location.";
        toast.info('Fetching weather for ' + message);

        const data = await getFormattedWeatherData({ ...query, units });
        toast.success(`Successfuly fetched weather for ${data.name}, ${data.country}`);
        setWeather(data);
      } catch (error) {
        console.error('Error fetching weather:', error);
        toast.error('Failed to fetch weather data');
      }
    };

    fetchWeather();
  }, [query, units]);

  const getBackgroundImage = () => {
    if (!weather) return

    switch (weather.icon) {
      case '01d':
        return clear_sky_image;
      case '01n':
        return clear_sky_night_image;
      case '02d':
        return few_clouds_image;
      case '02n':
        return few_clouds_night_image;
      case '03d':
        return scattered_clouds_image;
      case '03n':
        return scattered_clouds_night_image;
      case '04d':
        return broken_clouds_image;
      case '04n':
        return broken_clouds_night_image;
      case '09d':
        return shower_rain_image;
      case '09n':
        return shower_rain_night_image;
      case '10d':
        return rain_image;
      case '10n':
        return rain_night_image;
      case '11d':
      case '11n':
        return thunderstorm_image;
      case '13d':
      case '13n':
        return snow_image;
      case '50d':
      case '50n':
        return mist_image;
      default:
        return few_clouds_image;
    }
  };

  return (

    <div style={{
      backgroundImage: `url(${getBackgroundImage()})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      verticalAlign: 'top',
      height: '100%',
      padding: '10px 10px'
    }}  >
      <div className={`mx-auto max-w-screen-md py-5 px-5 md:px-32 bg-gradient-to-br from-gray-700/70 to-gray-500/80  h-fit shadow-xl shadow-gray-400 rounded-2xl`}>

        <TopButtons setQuery={setQuery} />
        <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

        {weather && (
          <div>
            <TimeAndLocation weather={weather} />
            <TemperatureAndDetails weather={weather} units={units} />
            <Forecast title="Hourly forecast" items={weather.hourly} />
            <Forecast title="Daily forecast" items={weather.daily} />
          </div>
        )}

        <ToastContainer autoClose={700} theme='colored' newestOnTop={true} />

      </div>
    </div >

  );
}

export default App;
