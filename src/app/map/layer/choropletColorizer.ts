import { UpToSeven } from 'cartocolor';
import memoize from 'fast-memoize';
import hexRgb from 'hex-rgb';
import { CartoLayerStyles, ColorGetterFn } from './layerStyles';
import { Color, Feature, TileStats } from './model';

export function addColorGetters(
  styles: CartoLayerStyles,
  tilestats: TileStats
) {
  const colorGettersWithLayerStats: {
    getFillColor?: ColorGetterFn;
    getLineColor?: ColorGetterFn;
  } = {};
  if (styles.type !== 'ICON-STYLE') {
    if (typeof styles.getFillColor === 'function') {
      colorGettersWithLayerStats.getFillColor = (x: Feature) => {
        return (styles.getFillColor as ColorGetterFn)(x, tilestats);
      };
    }
    if (typeof styles.getLineColor === 'function') {
      colorGettersWithLayerStats.getLineColor = (x: Feature) =>
        (styles.getLineColor as ColorGetterFn)(x, tilestats);
    }
  }
  return colorGettersWithLayerStats;
}

function getChoroplethColorizer_(
  colors: UpToSeven,
  attribute: string,
  numQuantiles: 2 | 3 | 4 | 5 | 6 | 7
) {
  const pallete = colors[numQuantiles].map(hexColorToRGB);

  return function (feature: Feature, tilestats: TileStats) {
    try {
      const value = feature.properties[attribute];
      const quantiles = getQuantiles(tilestats, attribute, numQuantiles);
      return getColor(quantiles, value, pallete);
    } catch (e) {
      console.error(e);
      return [0, 0, 0];
    }
  };
}

// This returns a function that will be passed to the layer
// still don't know if deck.gl is smart enough to not re-render if this function changes
// memoizing it just in case. Remove it if not needed
export const getChoroplethColorizer = memoize(getChoroplethColorizer_);

function getQuantiles(
  tilestats: TileStats,
  attribute: string,
  numQuantiles: 2 | 3 | 4 | 5 | 6 | 7
) {
  return (
    tilestats.layers?.[0].attributes.find(
      (attrStats) => attrStats.attribute === attribute
    )?.quantiles?.[numQuantiles] ?? []
  );
}

function getColor(quantiles: number[], value: number, pallete: Color[]) {
  for (let i = 1; i < quantiles.length; i++) {
    if (value < quantiles[i]) {
      return pallete[i - 1];
    }
  }
  return [0, 0, 0];
}

export const hexColorToRGB = (color: string) =>
  hexRgb(color, { format: 'array' }).slice(0, 3);
