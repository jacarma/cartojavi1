import { initialLayerState } from './initialLayerState';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { CartoLayerStyle, TileStats } from '../model';

export const layersSlice = createSlice({
  name: 'layers',
  initialState: initialLayerState,
  reducers: {
    updateStyle: (
      state,
      action: PayloadAction<{ layerId: string; style: CartoLayerStyle }>
    ) => {
      const layerIndex = state.findIndex(
        (l) => l.dataSource.id === action.payload.layerId
      );
      if (layerIndex === -1) throw new Error('Layer not found');
      // We are not mutating state here, redux tooltkit provides integration with immer
      state[layerIndex].style = action.payload.style;
    },
    updateTileStats: (
      state,
      action: PayloadAction<{ layerId: string; tilestats: TileStats }>
    ) => {
      const layerIndex = state.findIndex(
        (l) => l.dataSource.id === action.payload.layerId
      );
      if (layerIndex === -1) throw new Error('Layer not found');
      state[layerIndex].tilestats = action.payload.tilestats;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateStyle, updateTileStats } = layersSlice.actions;

export function useLayerDispatchers() {
  const dispatch = useDispatch();
  return {
    updateStyle: (layerId: string, style: CartoLayerStyle) =>
      dispatch(updateStyle({ layerId, style })),
    updateTileStats: (layerId: string, tilestats: TileStats) =>
      dispatch(updateTileStats({ layerId, tilestats })),
  };
}

export default layersSlice.reducer;
