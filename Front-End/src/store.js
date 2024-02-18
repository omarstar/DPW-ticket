import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './reducers/index'
import { AppointmentSlice } from './reducers/appointments'
// import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['app','appointments']
}

const rootReducer = combineReducers({
  app: counterSlice.reducer,
  appointments: AppointmentSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)




const store = configureStore({
  reducer: persistedReducer,
  // devTools: process.env.NODE_ENV !== 'production', // Enable/disable devtools based on environment
  // enhancers: [composeWithDevTools()],
})

export const persistor = persistStore(store);
export default store;