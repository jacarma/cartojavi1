import { getChoroplethColorizer } from './choroplethColorizer';
import { TileStats } from './model';
const feature = { properties: { population: 150 } };

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

describe('getChoroplethColorizer', () => {
  it('returns a function', () => {
    const colorizer = getChoroplethColorizer(
      'Burg',
      'population',
      3,
      tilestats
    );

    expect(typeof colorizer).toEqual('function');
  });

  it('returns expected color for known value', () => {
    const colorizer = getChoroplethColorizer(
      'Burg',
      'population',
      3,
      tilestats
    );

    expect(colorizer(feature)).toEqual([204, 96, 125]);
  });

  it("when it doesn't work it returns black", () => {
    const colorizer = getChoroplethColorizer(
      'Burg',
      'unexisting attribute',
      3,
      tilestats
    );

    expect(colorizer(feature)).toEqual([0, 0, 0]);
  });
});
