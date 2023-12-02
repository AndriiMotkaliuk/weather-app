import { DateTime } from "luxon";
import cashData from "./cashData.js";

const API_KEY = '28052ef3f37b4d06c897ccce40989d6d';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const getWeatherData = async (infoType, searchParams) => {
    const url = new URL(BASE_URL + '/' + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
    const cashedData = cashData(url.toString());
    if (cashedData) {
        return cashedData
    }

    const res = await fetch(url);
    const data = await res.json();
    cashData(url.toString(), data);
    return data
};

const formatCurrentWeather = (data) => {
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed }
    } = data;

    const { main: details, icon } = weather[0]

    return { lat, lon, temp, feels_like, temp_max, temp_min, humidity, name, dt, country, sunrise, sunset, details, icon, speed }
}

const formatForecastWeather = (data) => {
    let { timezone, daily, hourly } = data;
    daily = daily.slice(1, 6).map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'ccc'),
            temp: d.temp.day,
            icon: d.weather[0].icon
        }
    });

    hourly = hourly.slice(1, 6).map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
            temp: d.temp,
            icon: d.weather[0].icon
        }
    });

    return { timezone, daily, hourly }
};

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData
        ('weather', searchParams).then(formatCurrentWeather)

    const { lat, lon } = formattedCurrentWeather;

    const formattedForecastWeather = await getWeatherData('onecall', {
        lat,
        lon,
        exclude: 'current, minutely, alerts',
        units: searchParams.units,
    }).then(formatForecastWeather)

    return { ...formattedCurrentWeather, ...formattedForecastWeather };
}

const formatToLocalTime = (
    secs,
    zone,
    format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };

// {
//     "coord": { "lon": 13.4105, "lat": 52.5244 }, "weather": [{ "id": 801, "main": "Clouds", "description": "few clouds", "icon": "02d" }],
//         "base": "stations", "main": { "temp": 280.04, "feels_like": 277.09, "temp_min": 278.7, "temp_max": 281.68, "pressure": 979, "humidity": 86 },
//     "visibility": 10000, "wind": { "speed": 4.47, "deg": 186, "gust": 6.71 }, "clouds": { "all": 20 }, "dt": 1699084364, "sys": {
//         "type": 2, "id": 2011538, "country": "DE",
//             "sunrise": 1699078035, "sunset": 1699111951
//     }, "timezone": 3600, "id": 2950159, "name": "Berlin", "cod": 200
// }
