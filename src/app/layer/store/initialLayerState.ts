import { LayerDefinition, MAP_TYPES } from 'src/App/layer/model';

export const initialLayerState: LayerDefinition[] = [
  {
    dataSource: {
      id: 'sociodemographics',
      type: MAP_TYPES.TILESET,
      data: 'carto-demo-data.demo_tilesets.sociodemographics_usa_blockgroup',
    },
    style: {
      lineWidthMinPixels: 1,
      type: 'POLYGON-STYLE',
      lineColor: [0, 0, 0, 20],
      fillColor: {
        colors: 'DarkMint',
        attribute: 'median_income',
        numQuantiles: 6,
      },
    },
    tilestats: { layers: [] },
  },
  {
    dataSource: {
      id: 'stores',
      data: 'carto-demo-data.demo_tables.retail_stores',
    },
    style: {
      pointRadiusMinPixels: 3,
      lineColor: [0, 0, 0, 100],
      lineWidthMinPixels: 1,
      type: 'CIRCLE-STYLE',
      pointType: 'circle',
      fillColor: [255, 255, 0, 255],
    },
    tilestats: { layers: [] },
  },
  {
    dataSource: {
      id: 'airports',
      data: 'carto-demo-data.demo_tables.airports',
    },
    style: {
      iconSize: 15,
      iconColor: [255, 100, 0],
      url: 'airport',
      pointType: 'icon',
      type: 'ICON-STYLE',
    },
    tilestats: { layers: [] },
  },
];
