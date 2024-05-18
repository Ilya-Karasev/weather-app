import React from 'react';
import { Typography } from '@mui/material';

const getEmoji = (description) => {
  const emojiMap = {
    'ясно': '☀️',
    'переменная облачность': '🌥️',
    'облачно с прояснениями': '🌥️',
    'небольшая облачность': '⛅️',
    'небольшой дождь': '🌦️',
    'пасмурно': '☁️',
    'дождь': '🌧',
    'снег': '❄️',
    'гроза': '⛈',
    'туман': '🌫',
  };
  const emoji = emojiMap[description.toLowerCase()];
  return emoji ? emoji : '';
};

const WeatherInfo = ({ weatherData, requestTime }) => {
  return (
    <div>
      <Typography variant="h5" component="h2">{weatherData.city} — погода на {requestTime && requestTime.toLocaleString()}</Typography>
      <Typography variant="body1" component="p">Температура: {weatherData.data.main.temp} °C 🌡️</Typography>
      <Typography variant="body1" component="p">Описание: {weatherData.data.weather[0].description} {getEmoji(weatherData.data.weather[0].description)}</Typography>
      <Typography variant="body1" component="p">Ощущается как {weatherData.data.main.feels_like} °C 🤒</Typography>
      <Typography variant="body1" component="p">Влажность: {weatherData.data.main.humidity}% 💧</Typography>
      <Typography variant="body1" component="p">Давление: {weatherData.data.main.pressure} ГПа 🌡</Typography>
      <Typography variant="body1" component="p">Скорость ветра: {weatherData.data.wind.speed} м/с 💨</Typography>
    </div>
  );
};

export default WeatherInfo;