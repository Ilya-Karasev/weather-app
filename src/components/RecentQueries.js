import React from 'react';
import { Card, Typography, List, ListItemText, CardContent, ListItemButton } from '@mui/material';

const RecentQueries = ({ recentCities, onSubmit, dispatch }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>Последние запросы:</Typography>
        <List>
          {recentCities.map((city, index) => (
            <ListItemButton key={index} onClick={() => {
              onSubmit(city);
              dispatch({ type: 'INCREMENT' });
            }}>
              <ListItemText primary={city} />
            </ListItemButton>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default RecentQueries;