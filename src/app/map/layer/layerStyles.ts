import { Color, Feature } from './model';

export type PolygonStyle = {
  lineWidthMinPixels?: number;
  getLineColor?: ColorGetter;
  getFillColor?: ColorGetter;
  type: 'POLYGON-STYLE';
};

export type IconStyle = {
  getIconSize?: number | (() => number);
  getIconColor?: ColorGetter;
  getIcon: () => {
    url: string;
    width: number;
    height: number;
    anchorY?: number;
    anchorX?: number;
    mask: boolean;
  };
  pointType: 'icon';
  type: 'ICON-STYLE';
};

export type CircleStyle = Omit<PolygonStyle, 'type'> & {
  pointRadiusMinPixels?: number;
  pointType: 'circle';
  type: 'CIRCLE-STYLE';
};

export type GeometryStyles = PolygonStyle | CircleStyle;
export type CartoLayerStyles = GeometryStyles | IconStyle;
export type ColorGetterFn = (feature: Feature, tilestats?: any) => Color;
export type ColorGetter = Color | ColorGetterFn;
