import { getChoroplethColorizer } from './choroplethColorizer';
import {
  CartoLayerStyle,
  Color,
  ColorOrChoroplet,
  Feature,
  TileStats,
} from './model';

export type BasicType = string | number | boolean;
export type SimpleObject = {
  [key: string]: BasicType | BasicType[] | SimpleObject | SimpleObject[];
};
export type ColorGetter = (feature: Feature) => Color;
export type NumberGetter = (feature: Feature) => number;
export type GeneratedCartoStyleProps = {
  getLineColor?: Color | ColorGetter;
  getFillColor?: Color | ColorGetter;
  getIconColor?: Color | ColorGetter;
  getIconSize?: number | NumberGetter;
  lineWidthMinPixels?: number;
  updateTriggers?: SimpleObject;
  iconAtlas?: string;
  iconMapping?: { [key: string]: SimpleObject };
  getIcon?: (feature: Feature) => string;
};

const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 15, height: 15, mask: true },
};

export function getCartoLayerStyleProps(
  styles: CartoLayerStyle,
  tilestats: TileStats
) {
  const styleProps = Object.entries(styles).reduce((acc, [key, value]) => {
    switch (key) {
      case 'lineColor':
        acc.getLineColor = deserializeColor(
          value as ColorOrChoroplet,
          tilestats
        );
        break;
      case 'fillColor':
        acc.getFillColor = deserializeColor(
          value as ColorOrChoroplet,
          tilestats
        );
        break;
      case 'iconColor':
        acc.getIconColor = deserializeColor(
          value as ColorOrChoroplet,
          tilestats
        );
        break;
      case 'iconSize':
        acc.getIconSize = value as number;
        break;
      case 'type':
      case 'url':
        break;
      default:
        // currently using lineWidthMinPixels, pointRadiusMinPixels, lineWidthMinPixels, pointType
        // but leave as default to prevent "losing" properties in the future
        acc[key as keyof GeneratedCartoStyleProps] = value as never;
    }
    return acc;
  }, {} as GeneratedCartoStyleProps);

  styleProps.updateTriggers = {};
  if (styles.type === 'ICON-STYLE') {
    styleProps.iconAtlas = `https://clausa.app.carto.com/markers/maki/${styles.url}.svg`;
    styleProps.iconMapping = ICON_MAPPING;
    styleProps.getIcon = () => 'marker';
    if (styles.iconColor && !Array.isArray(styles.iconColor)) {
      styleProps.updateTriggers.getIconColor = [styles.iconColor];
    }
  } else {
    if (styles.fillColor && !Array.isArray(styles.fillColor)) {
      styleProps.updateTriggers.getFillColor = [styles.fillColor];
    }
    if (styles.lineColor && !Array.isArray(styles.lineColor)) {
      styleProps.updateTriggers.getLineColor = [styles.lineColor];
    }
  }
  // console.log(deserializedStyle);
  return styleProps;
}

function deserializeColor(color: ColorOrChoroplet, tilestats: TileStats) {
  if (Array.isArray(color)) {
    return color;
  }
  if (color.numQuantiles) {
    return getChoroplethColorizer(
      color.colors,
      color.attribute,
      color.numQuantiles,
      tilestats
    );
  }
}
