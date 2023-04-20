import cartocolor from 'cartocolor';

import {
  Color,
  ColorThemeName,
  Feature,
  NumQuantiles,
  TileStats,
} from './model';
import { hexColorToRGB } from './colorUtils';

// we don't need to memoize this function because deck.gl diffing ignores functions
// https://github.com/visgl/deck.gl/blob/master/docs/developer-guide/using-layers.md#should-i-be-creating-new-layers-on-every-render
export function getChoroplethColorizer(
  colorThemeName: ColorThemeName,
  attribute: string,
  numQuantiles: NumQuantiles,
  tilestats: TileStats
) {
  const pallete = cartocolor[colorThemeName][numQuantiles].map(hexColorToRGB);
  const dataQuantiles = getQuantiles(tilestats, attribute, numQuantiles);

  return function getColor(feature: Feature) {
    try {
      const value = feature.properties[attribute];
      return getClassificationColor(dataQuantiles, value, pallete);
    } catch (e) {
      console.error(e);
      return [0, 0, 0];
    }
  };
}

function getQuantiles(
  tilestats: TileStats,
  attribute: string,
  numQuantiles: NumQuantiles
) {
  return (
    tilestats.layers?.[0]?.attributes?.find(
      (attrStats) => attrStats.attribute === attribute
    )?.quantiles?.[numQuantiles] ?? []
  );
}

function getClassificationColor(
  dataQuantiles: number[],
  value: number,
  pallete: Color[]
) {
  for (let i = 1; i < dataQuantiles.length; i++) {
    if (value < dataQuantiles[i]) {
      return pallete[i - 1];
    }
  }
  return [0, 0, 0];
}
