import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { LayerDefinition } from 'src/App/layer/model';
import { LayerConfig } from './LayerConfig';
import { AppProviders } from 'src/App/App';

const mockLayer: LayerDefinition = {
  dataSource: {
    id: 'test',
    type: 'table',
    data: 'airports',
  },
  style: {
    type: 'CIRCLE-STYLE',
    pointType: 'circle',
    fillColor: [1, 2, 3],
    lineColor: [1, 2, 3],
  },
  tilestats: {
    layers: [],
  },
};

describe('LayerConfig', () => {
  it('renders LayerConfig with header and details', () => {
    const onClickMock = vitest.fn();
    const { getByText } = render(
      <LayerConfig
        expanded={false}
        onHeaderClick={onClickMock}
        layer={mockLayer}
      />,
      { wrapper: AppProviders }
    );

    const header = getByText('test');
    expect(header).toBeInTheDocument();

    fireEvent.click(header);
    expect(onClickMock).toHaveBeenCalled();
  });
});
