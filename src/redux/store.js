import { configureStore } from '@reduxjs/toolkit';
//setter function

import playerReducer from './features/playerSlice';
import { shazamCoreapi } from './services/shazamCore';

export const store = configureStore({
  reducer: {
    [shazamCoreapi.reducerPath]: shazamCoreapi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shazamCoreapi.middleware),
});
