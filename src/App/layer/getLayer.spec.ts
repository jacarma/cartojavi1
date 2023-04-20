import { MAP_TYPES } from 'src/App/layer/model';
import {
  CartoLayerDataSource,
  Choropleth,
  PolygonStyle,
  TileStats,
} from './model';
import { getCartoLayerProps } from './getCartoLayerProps';
import { ColorGetter } from './getCartoLayerStyleProps';
import cartocolor from 'cartocolor';
import { hexColorToRGB } from './colorUtils';

const dataSource: CartoLayerDataSource = {
  id: 'mock_id',
  type: MAP_TYPES.TABLE,
  connection: 'carto_dw',
  data: 'table_name',
};

const style: PolygonStyle = {
  type: 'POLYGON-STYLE',
  lineWidthMinPixels: 1,
  lineColor: [0, 0, 0],
  fillColor: [255, 255, 255],
};

const tilestats: TileStats = {
  layers: [
    {
      attributes: [
        {
          attribute: 'population',
          quantiles: [[], [0, 300], [0, 150, 300], [0, 100, 200, 300]],
        },
      ],
    },
  ],
};

const onDataLoad = vitest.fn();
const layerProps = {
  dataSource,
  style,
  tilestats,
};

const cartoLayerProps = getCartoLayerProps(layerProps, onDataLoad);

describe('getCartoLayerProps_', () => {
  test('should return an object with the correct properties', () => {
    // The returned object contains the dataSource properties
    Object.entries(dataSource).forEach(([key, value]) => {
      expect(cartoLayerProps[key as keyof typeof cartoLayerProps]).toEqual(
        value
      );
    });

    // The returned object contains the styles properties (except type)
    expect(cartoLayerProps).toMatchObject({
      connection: 'carto_dw',
      data: 'table_name',
      getFillColor: [255, 255, 255],
      getLineColor: [0, 0, 0],
      id: 'mock_id',
      lineWidthMinPixels: 1,
      type: 'table',
      updateTriggers: {},
      // onDataLoad is added by getCartoLayerProps
    });
  });

  test('Should add an onDataLoad prop', () => {
    expect(cartoLayerProps.onDataLoad).toBeDefined();
    expect(typeof cartoLayerProps.onDataLoad).toBe('function');
  });

  test('Styles are generated including choropleths', async () => {
    const props = {
      ...layerProps,
      style: {
        ...layerProps.style,
        fillColor: {
          colors: 'Burg',
          attribute: 'population',
          numQuantiles: 3,
        } as Choropleth,
      },
    };
    const cartoProps = getCartoLayerProps(props, onDataLoad);
    const feature = { properties: { population: 150 } };
    const color = (cartoProps.getFillColor as ColorGetter)(feature);
    expect(color).toEqual(hexColorToRGB(cartocolor.Burg[3][1]));
  });
});
