import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';

const LocationAPI = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocation = async (lat, lon) => {
      try {
        const response = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=ru`);
        setLocation(response.data.city);
      } catch (error) {
        console.error('Ошибка:', error);
        setError('Не удалось определить ваше местоположение');
      }
    };

    const handleSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      fetchLocation(latitude, longitude);
    };

    const handleError = (error) => {
      console.error('Ошибка:', error);
      setError('Не удалось определить ваше местоположение');
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    } else {
      setError('Геолокация не поддерживается этим браузером');
    }
  }, []);

  return (
    <div>
      {location ? <Typography variant="h6">Вы сейчас находитесь: {location}</Typography> : <Typography variant="h6">{error || 'Определяем ваше местоположение...'}</Typography>}
    </div>
  );
};

export default LocationAPI;