import { combineReducers } from 'redux';
import { legacy_createStore as createStore} from 'redux'
import { Provider } from 'react-redux';

const initialCounterState = {
  counter: 0,
};

const counterReducer = (state = initialCounterState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1 };
    default:
      return state;
  }
};

const initialCitiesState = {
  recentCities: [],
};

const citiesReducer = (state = initialCitiesState, action) => {
  switch (action.type) {
    case 'ADD_CITY':
      return {
        ...state,
        recentCities: [action.payload, ...state.recentCities.filter((c) => c !== action.payload)].slice(0, 3),
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  counter: counterReducer,
  cities: citiesReducer,
});

const store = createStore(rootReducer);

const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;