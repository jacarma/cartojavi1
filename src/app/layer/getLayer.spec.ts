import { MAP_TYPES } from '@deck.gl/carto/typed';
import { CartoLayerDataSource } from './dataSource';
import { getCartoLayerProps_ } from './getCartoLayerProps';
import { PolygonStyle, ColorGetterFn } from './getCartoLayerStyleProps';

function mockDataSource(): CartoLayerDataSource {
  return {
    id: 'mock_id',
    type: MAP_TYPES.TABLE,
    connection: 'carto_dw',
    data: 'table_name',
  };
}

function mockStyles(): PolygonStyle {
  return {
    type: 'POLYGON-STYLE',
    lineWidthMinPixels: 1,
    getLineColor: [0, 0, 0],
    getFillColor: [255, 255, 255],
  };
}

function mockMetadata() {
  return { tilestats: { layers: [{ name: 'test' }] } };
}

describe('getCartoLayerProps_', () => {
  test('should return an object with the correct properties', () => {
    const dataSource = mockDataSource();
    const styles = mockStyles();

    const cartoLayerProps = getCartoLayerProps_(dataSource, styles);

    // The returned object contains the dataSource properties
    Object.entries(dataSource).forEach(([key, value]) => {
      expect(cartoLayerProps[key as keyof typeof cartoLayerProps]).toEqual(
        value
      );
    });

    // The returned object contains the styles properties (except type)
    Object.entries(styles)
      .filter(([key]) => key !== 'type')
      .forEach(([key, value]) => {
        expect(cartoLayerProps[key as keyof typeof cartoLayerProps]).toEqual(
          value
        );
      });
  });

  test('Should add an onDataLoad prop', () => {
    const dataSource = mockDataSource();
    const styles = mockStyles();

    const cartoLayerProps = getCartoLayerProps_(dataSource, styles);

    expect(cartoLayerProps.onDataLoad).toBeDefined();
    expect(typeof cartoLayerProps.onDataLoad).toBe('function');
  });

  test('When getFillColor is a function, it will receive a tilestats object', () => {
    const getFillColor = vitest.fn();
    const dataSource = mockDataSource();
    const styles = { ...mockStyles(), getFillColor };
    const metadata = mockMetadata();
    const feature = { properties: {} };

    const cartoLayerProps = getCartoLayerProps_(dataSource, styles);
    cartoLayerProps.onDataLoad(metadata);
    (cartoLayerProps.getFillColor as ColorGetterFn)(feature);

    expect(getFillColor).toHaveBeenCalledWith(feature, metadata.tilestats);
  });
});
