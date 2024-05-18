import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent } from '@mui/material';
import LocationAPI from '../APIs/LocationAPI';

const ClockLock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const updateTime = () => {
            setTime(new Date());
        };

        const intervalId = setInterval(updateTime, 1000);
        updateTime();

        return () => clearInterval(intervalId);
    }, []);
    
    return (
      <Card style={{marginTop: '1rem'}}>
        <CardContent>
          <LocationAPI />
          <Typography variant="h6">Местное время: {time.toLocaleTimeString()}</Typography>
        </CardContent>
      </Card>
    );
};

export default ClockLock;