import { configureStore } from '@reduxjs/toolkit';
import layersSlice from '../App/layer/store/layersSlice';

export const store = configureStore({
  reducer: {
    layers: layersSlice,
  },
});

export type CartoJavi1State = ReturnType<typeof store.getState>;
export type CartoJavi1Dispatch = typeof store.dispatch;
