import cartocolor from 'cartocolor';
// import { MAP_TYPES } from '@deck.gl/carto/typed';
// we are copying MAP_TYPES to prevent a dependency here
// because we want all the deck.gl dependencies to be on the Map chunk
export const MAP_TYPES = {
  QUERY: 'query',
  TABLE: 'table',
  TILESET: 'tileset',
};
export type MAP_TYPE_KEYS = keyof typeof MAP_TYPES;
export type MAP_TYPE_VALUES = (typeof MAP_TYPES)[MAP_TYPE_KEYS];
export type ColorThemeName = keyof typeof cartocolor;
export type NumQuantiles = 2 | 3 | 4 | 5 | 6 | 7;

export type LayerDefinition = {
  dataSource: CartoLayerDataSource;
  style: CartoLayerStyle;
  tilestats: TileStats;
};

export type CartoLayerDataSource = {
  type: MAP_TYPE_VALUES;
  connection?: string;
  id: string;
  data: string;
};

export type CartoLayerStyle = PolygonStyle | CircleStyle | IconStyle;

export type TileStats = {
  layers: {
    attributes: {
      attribute: string;
      quantiles?: number[][];
    }[];
  }[];
};

export type Color = number[];

export type PolygonStyle = {
  lineWidthMinPixels?: number;
  lineColor: ColorOrChoroplet;
  fillColor: ColorOrChoroplet;
  type: 'POLYGON-STYLE';
};

export type IconStyle = {
  iconSize: number;
  iconColor: ColorOrChoroplet;
  pointType: 'icon';
  type: 'ICON-STYLE';
  url: string;
};

export type CircleStyle = Omit<PolygonStyle, 'type'> & {
  pointRadiusMinPixels?: number;
  pointType: 'circle';
  type: 'CIRCLE-STYLE';
};

export type ColorOrChoroplet = Color | Choropleth;
export type Choropleth = {
  colors: ColorThemeName;
  attribute: string;
  numQuantiles: NumQuantiles;
};

export type Feature = { properties: { [propertyName: string]: number } };

export const colorThemes: ColorThemeName[] = [
  'Burg',
  'BurgYl',
  'RedOr',
  'OrYel',
  'Peach',
  'PinkYl',
  'Mint',
  'BluGrn',
  'DarkMint',
  'Emrld',
  'ag_GrnYl',
  'BluYl',
  'Teal',
  'TealGrn',
  'Purp',
  'PurpOr',
  'Sunset',
  'Magenta',
  'SunsetDark',
  'ag_Sunset',
  'BrwnYl',
  'ArmyRose',
  'Fall',
  'Geyser',
  'Temps',
  'TealRose',
  'Tropic',
  'Earth',
];
