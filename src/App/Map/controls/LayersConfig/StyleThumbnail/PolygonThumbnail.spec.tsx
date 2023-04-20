import { render, screen } from '@testing-library/react';
import { PolygonThumbnail } from './PolygonThumbnail';
import { PolygonStyle } from 'src/App/layer/model';

describe('PolygonThumbnail', () => {
  const style: PolygonStyle = {
    fillColor: [255, 0, 0],
    lineColor: [0, 0, 255],
    lineWidthMinPixels: 1,
    type: 'POLYGON-STYLE',
  };

  it('renders a choropleth thumbnail when fillColor is choropleth', async () => {
    render(
      <PolygonThumbnail
        style={{
          ...style,
          fillColor: {
            colors: 'Burg',
            numQuantiles: 3,
            attribute: 'population',
          },
          lineColor: [1, 2, 3],
          lineWidthMinPixels: 1,
        }}
      />
    );
    const rect = await screen.findAllByTestId('band');
    expect(rect).toHaveLength(3);
  });
});
