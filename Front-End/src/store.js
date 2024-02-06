import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './reducers/index'

import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['app']
}

const rootReducer = combineReducers({
  app: counterSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store);
export default store;