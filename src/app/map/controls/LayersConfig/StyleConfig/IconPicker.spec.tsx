import { render, fireEvent } from '@testing-library/react';

import { IconPicker } from './IconPicker';
import { LayerDefinition } from 'src/App/layer/model';
import { MAP_TYPES } from '@deck.gl/carto/typed';

const layer: LayerDefinition = {
  style: {
    type: 'ICON-STYLE',
    url: 'airport',
    iconSize: 1,
    iconColor: [0, 0, 0],
    pointType: 'icon',
  },
  dataSource: {
    id: 'layerId',
    type: MAP_TYPES.TILESET,
    data: 'carto-demo-data.demo_tilesets.sociodemographics_usa_blockgroup',
  },
  tilestats: {
    layers: [],
  },
};

describe('<IconPicker />', () => {
  it('should render a list of icons', () => {
    const { queryAllByRole } = render(
      <IconPicker layer={layer} onClick={vitest.fn()} />
    );
    const icons = queryAllByRole('img');
    expect(icons.length).toBeGreaterThanOrEqual(100);
  });

  it('should select the current icon', () => {
    const { getByAltText } = render(
      <IconPicker layer={layer} onClick={vitest.fn()} />
    );
    const airportIcon = getByAltText('airport');
    expect(airportIcon).toHaveStyle('background-color: lightblue');
    const otherIcon = getByAltText('heart');
    expect(otherIcon).toHaveStyle('background-color: transparent');
  });

  it('should call onClick when an icon is clicked', () => {
    const onClick = vitest.fn();
    const { getByAltText } = render(
      <IconPicker layer={layer} onClick={onClick} />
    );
    const heartIcon = getByAltText('heart');
    fireEvent.click(heartIcon);
    expect(onClick).toHaveBeenCalledWith('heart');
  });
});
