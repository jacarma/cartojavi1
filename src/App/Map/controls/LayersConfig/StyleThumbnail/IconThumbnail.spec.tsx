import React from 'react';
import { render, screen } from '@testing-library/react';
import { IconThumbnail, ColoredIcon } from './IconThumbnail';
import { IconStyle } from 'src/App/layer/model';

const pointType = 'icon';
const type = 'ICON-STYLE';

const iconStyleMock: IconStyle = {
  iconSize: 12,
  iconColor: [1, 2, 3],
  url: 'parking',
  pointType,
  type,
};
const cssColor = 'rgb(1, 2, 3)';

describe('IconThumbnail component', () => {
  it('renders the ColoredIcon', () => {
    render(<IconThumbnail style={iconStyleMock} />);
    expect(screen.getByTestId('colored-icon')).toBeInTheDocument();
  });
});

describe('ColoredIcon component', () => {
  it('renders with the right props', () => {
    render(
      <ColoredIcon
        color={cssColor}
        url={`https://clausa.app.carto.com/markers/maki/${iconStyleMock.url}.svg`}
        iconSize={iconStyleMock.iconSize}
      />
    );
    const icon = screen.getByTestId('colored-icon');

    expect(icon).toHaveStyle(`background-color: ${cssColor};`);
    expect(icon).toHaveStyle(
      `mask: url('https://clausa.app.carto.com/markers/maki/${iconStyleMock.url}.svg') no-repeat center`
    );
  });
});
