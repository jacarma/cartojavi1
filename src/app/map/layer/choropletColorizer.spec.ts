import { cartocolor } from 'cartocolor';
import {
  addColorGetters,
  getChoroplethColorizer,
  hexColorToRGB,
} from './choropletColorizer';
import { PolygonStyle } from './layerStyles';

describe('addColorGetters', () => {
  const tilestats = {
    layers: [
      {
        attributes: [
          {
            attribute: 'population',
            quantiles: [
              [0, 1000],
              [1001, 2000],
              [2001, 3000],
            ],
          },
        ],
      },
    ],
  };
  it('returns an object with getFillColor and getLineColor properties', () => {
    const styles: PolygonStyle = {
      type: 'POLYGON-STYLE',
      getFillColor: () => [255, 0, 0],
      getLineColor: () => [0, 0, 255],
    };

    const colorGettersWithLayerStats = addColorGetters(styles, tilestats);
    expect(colorGettersWithLayerStats).toHaveProperty('getFillColor');
    expect(colorGettersWithLayerStats).toHaveProperty('getLineColor');
  });

  it('returns an object with only getFillColor property', () => {
    const styles: PolygonStyle = {
      type: 'POLYGON-STYLE',
      getFillColor: () => [255, 0, 0],
    };
    const tilestats = {
      layers: [
        {
          attributes: [
            {
              attribute: 'population',
              quantiles: [
                [0, 1000],
                [1001, 2000],
                [2001, 3000],
              ],
            },
          ],
        },
      ],
    };
    const colorGettersWithLayerStats = addColorGetters(styles, tilestats);
    expect(colorGettersWithLayerStats).toHaveProperty('getFillColor');
    expect(colorGettersWithLayerStats).not.toHaveProperty('getLineColor');
  });

  it('returns an object with only getLineColor property', () => {
    const styles: PolygonStyle = {
      type: 'POLYGON-STYLE',
      getLineColor: () => [0, 0, 255],
    };
    const tilestats = {
      layers: [
        {
          attributes: [
            {
              attribute: 'population',
              quantiles: [
                [0, 1000],
                [1001, 2000],
                [2001, 3000],
              ],
            },
          ],
        },
      ],
    };
    const colorGettersWithLayerStats = addColorGetters(styles, tilestats);
    expect(colorGettersWithLayerStats).not.toHaveProperty('getFillColor');
    expect(colorGettersWithLayerStats).toHaveProperty('getLineColor');
  });

  //   it('returns an empty object', () => {
  //     const styles = {
  //       type: 'ICON-STYLE',
  //     };
  //     const tilestats = {
  //       layers: [
  //         {
  //           attributes: [
  //             {
  //               attribute: 'population',
  //               quantiles: [
  //                 [0, 1000],
  //                 [1001, 2000],
  //                 [2001, 3000],
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     };
  //     const colorGettersWithLayerStats = addColorGetters(styles, tilestats);
  //     expect(colorGettersWithLayerStats).toEqual({});
  //   });
});

describe('getChoroplethColorizer', () => {
  const attribute = 'population';
  const tilestats = {
    layers: [
      {
        attributes: [
          {
            attribute: attribute,
            quantiles: [[], [0, 3000], [0, 1500, 3000], [0, 1000, 2000, 3000]],
          },
        ],
      },
    ],
  };

  it('returns a function', () => {
    const colors = cartocolor.Antique;
    const numQuantiles = 3;
    const choroplethColorizer = getChoroplethColorizer(
      colors,
      attribute,
      numQuantiles
    );
    expect(typeof choroplethColorizer).toBe('function');
  });

  it(`returns a color for a feature with 3 quantiles`, () => {
    const colors = cartocolor.Antique;
    const numQuantiles = 3;
    const expectedColor = hexColorToRGB(cartocolor.Antique[2][1]);

    const feature = {
      properties: {
        population: 1500,
      },
    };
    const choroplethColorizer = getChoroplethColorizer(
      colors,
      attribute,
      numQuantiles
    );
    const color = choroplethColorizer(feature, tilestats);
    expect(color).toEqual(expectedColor);
  });
});
