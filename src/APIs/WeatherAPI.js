import { useEffect } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';

const API_KEY = 'c7d4a01c14bacfd52720d1ae82a58336';

export const fetchWeatherData = async (cityName) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=ru&appid=${API_KEY}`
    );
    const cityData = response.data.name;
    const timezone = response.data.timezone;
    const localTime = moment().utcOffset(timezone / 60).format('YYYY-MM-DD HH:mm:ss');
    return { city: cityData, data: response.data, localTime };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const WeatherAPI = ({ city, setWeatherData, setRequestTime }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherData = await fetchWeatherData(city);
        setWeatherData(weatherData);
        setRequestTime(weatherData.localTime);
        console.log(weatherData.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (city) {
      fetchData();
    }
  }, [city, setWeatherData, setRequestTime]);
};

export default WeatherAPI;