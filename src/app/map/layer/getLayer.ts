import { MAP_TYPES, setDefaultCredentials } from '@deck.gl/carto/typed';
import memoize from 'fast-memoize';
import { addColorGetters } from './choropletColorizer';
import { CartoLayerDataSource } from './dataSource';
import { CartoLayerStyles } from './layerStyles';
import { TileStats } from './model';

setDefaultCredentials({
  accessToken:
    'eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfbGU5emg0MGUiLCJqdGkiOiIzNDc0ZmM5NiJ9.PBktjbtXa9po2aN_NWWyYGL5HZkAJQiKL93j_bqZXo8',
});

const defaultOptions = {
  type: MAP_TYPES.TABLE,
  connection: 'carto_dw',
  pointRadiusMinPixels: 3,
  getLineColor: [0, 0, 0, 0],
  getFillColor: [0, 0, 0, 0],
  lineWidthMinPixels: 0,
  id: 'CartoLayer',
};

export function getCartoLayerProps_(
  dataSource: CartoLayerDataSource,
  styles: CartoLayerStyles
) {
  const { type, ...cartoLayerStyles } = styles;
  const tilestats: TileStats = { layers: [] };
  const colorGettersWithLayerStats = addColorGetters(styles, tilestats);

  return {
    ...defaultOptions,
    ...dataSource,
    ...cartoLayerStyles,
    onDataLoad: ((metadata: { tilestats: TileStats }) => {
      tilestats.layers = metadata.tilestats.layers;
      console.log(metadata);
    }) as any,
    ...colorGettersWithLayerStats,
  };
}

// TODO: investigate if deck.gl is smart enough to not re-render the layer if the props are the same and remove memoize
export const getCartoLayerProps = memoize(getCartoLayerProps_);
