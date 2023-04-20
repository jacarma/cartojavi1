import { render } from '@testing-library/react';
import { AppProviders } from 'src/App/App';
import { LayerDefinition } from 'src/App/layer/model';
import { IconConfig } from './IconConfig';

describe('IconConfig Component', () => {
  const mockLayer: LayerDefinition = {
    style: {
      iconColor: [1, 2, 3],
      iconSize: 20,
      url: 'airport',
      pointType: 'icon',
      type: 'ICON-STYLE',
    },
    dataSource: {
      id: 'layer1',
      data: 'sociodemographics_usa_blockgroup',
    },
    tilestats: {
      layers: [],
    },
  };

  it('should include a color picker, an icon picker and a size slider', () => {
    const { getByTestId } = render(<IconConfig layer={mockLayer} />, {
      wrapper: AppProviders,
    });
    expect(getByTestId('color-picker')).toBeInTheDocument();
    expect(getByTestId('icon-picker')).toBeInTheDocument();
    expect(getByTestId('slider')).toBeInTheDocument();
  });
});
