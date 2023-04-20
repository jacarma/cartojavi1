import { render, screen } from '@testing-library/react';
import { AppProviders } from 'src/App/App';
import { LayerDefinition } from 'src/App/layer/model';
import { PointCircleConfig } from './PointCircleConfig';

describe('PointCircleConfig Component', () => {
  const mockLayer: LayerDefinition = {
    style: {
      fillColor: [1, 2, 3],
      lineColor: [1, 2, 3],
      type: 'CIRCLE-STYLE',
      pointType: 'circle',
    },
    dataSource: {
      id: 'layer1',
      data: 'sociodemographics_usa_blockgroup',
    },
    tilestats: {
      layers: [],
    },
  };

  it('should include 2 color picker, and 2 slider', async () => {
    render(<PointCircleConfig layer={mockLayer} />, {
      wrapper: AppProviders,
    });
    expect(await screen.findAllByTestId('color-picker')).toHaveLength(2);
    expect(await screen.findAllByTestId('slider')).toHaveLength(2);
  });
});
