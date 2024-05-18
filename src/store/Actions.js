export const incrementCounter = () => ({
    type: 'INCREMENT',
});

export const addCity = (city) => ({
    type: 'ADD_CITY',
    payload: city,
});