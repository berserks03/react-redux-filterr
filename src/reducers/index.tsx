import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import eventsReducer from './eventsReducer';

const rootReducer = combineReducers({
  events: eventsReducer,
});

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
