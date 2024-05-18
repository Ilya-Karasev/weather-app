import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementCounter, addCity } from '../store/Actions';
import { Card, TextField, Button, Typography, CardContent, Autocomplete } from '@mui/material';
import RecentQueries from './RecentQueries';
import { fetchWeatherData } from '../APIs/WeatherAPI';

const SearchForm = ({ onSubmit }) => {
  const [city, setCity] = useState('');
  const [options, setOptions] = useState([]);
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.counter);
  const recentCities = useSelector((state) => state.cities.recentCities);

  const handleInputChange = (e, newValue) => {
    setCity(newValue);
    if (newValue.trim() !== '') {
      fetchOptions(newValue);
    } else {
      setOptions([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(city);
    dispatch(incrementCounter());
    dispatch(addCity(city));
  };

  const fetchOptions = async (inputCity) => {
    try {
      const response = await fetchWeatherData(inputCity);
      const options = [response.data.name];
      setOptions(options);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card style={{ marginBottom: '1rem' }}>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>
            Сегодня погоду смотрели уже {counter} раз(а)
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <Autocomplete
              freeSolo
              options={options}
              inputValue={city}
              onInputChange={handleInputChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  type="text"
                  placeholder="Введите название города"
                  variant="outlined"
                  fullWidth
                  size="small"
                  style={{ width: '65rem' }}
                />
              )}
            />
            <Button variant="contained" color="primary" type="submit">
              Поиск
            </Button>
          </div>
        </form>
        <RecentQueries recentCities={recentCities} onSubmit={onSubmit} dispatch={dispatch} />
      </CardContent>
    </Card>
  );
};

export default SearchForm;