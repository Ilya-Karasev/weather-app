import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import WeatherInfo from './components/WeatherInfo';
import WeatherAPI from './APIs/WeatherAPI';
import StoreProvider from './store/StoreContext';
import ClockLock from './components/ClockLock';
import { Container, Typography, CircularProgress, Card } from '@mui/material';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [requestTime, setRequestTime] = useState(null);

  return (
    <StoreProvider>
      <Container>
        <SearchForm onSubmit={setCity} />
        <WeatherAPI city={city} setWeatherData={setWeatherData} setRequestTime={setRequestTime} />
        <Card style={{ padding: '1rem' }}>
          {weatherData ? (
            <WeatherInfo weatherData={weatherData} requestTime={requestTime} />
          ) : (
            <Typography variant="body1" gutterBottom>
              Ожидаем запрос... <CircularProgress />
            </Typography>
          )}
        </Card>
        <ClockLock />
      </Container>
    </StoreProvider>
  );
};

export default App;