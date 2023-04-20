import * as React from 'react';
import { render, screen, within } from '@testing-library/react';
import { LayersConfig } from './LayersConfig';
import { AppProviders } from 'src/App/App';
import { initialLayerState } from 'src/App/layer/store/initialLayerState';

describe('LayersConfig', () => {
  test('renders layers config', () => {
    render(<LayersConfig />, { wrapper: AppProviders });

    const layersConfigElement = screen.getByTestId('layers-config');
    expect(layersConfigElement).toBeInTheDocument();

    const layerConfigElements = screen.getAllByTestId('layer-config');
    expect(layerConfigElements.length).toEqual(initialLayerState.length);

    layerConfigElements.forEach((element, index) => {
      const layer = initialLayerState[index];
      const { getByText } = within(element);
      expect(getByText(layer.dataSource.id)).toBeInTheDocument();
    });
  });
});
