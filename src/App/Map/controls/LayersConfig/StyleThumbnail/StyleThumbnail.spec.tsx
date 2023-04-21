import { render, screen } from '@testing-library/react';
import { CartoLayerStyle } from 'src/App/layer/model';
import { StyleThumbnail, ThumbnailSvg } from './StyleThumbnail';

describe('StyleThumbnail component', () => {
  const style = { fillColor: [1, 2, 3], lineColor: [1, 2, 3] };
  const circleStyle: CartoLayerStyle = {
    ...style,
    type: 'CIRCLE-STYLE',
    pointType: 'circle',
  };
  const iconStyle: CartoLayerStyle = {
    ...style,
    type: 'ICON-STYLE',
    pointType: 'icon',
    iconSize: 10,
    iconColor: [1, 2, 3],
    url: '',
  };
  const polygonStyle: CartoLayerStyle = { ...style, type: 'POLYGON-STYLE' };

  it('renders PointCircleThumbnail when the style is of type CIRCLE-STYLE', () => {
    render(<StyleThumbnail style={circleStyle} />);
    expect(screen.getByTestId('circle')).toBeInTheDocument();
  });

  it('renders IconThumbnail when the style is of type ICON-STYLE', () => {
    render(<StyleThumbnail style={iconStyle} />);
    expect(screen.getByTestId('colored-icon')).toBeInTheDocument();
  });

  it('renders PolygonThumbnail when the style is of type POLYGON-STYLE', () => {
    render(<StyleThumbnail style={polygonStyle} />);
    expect(screen.getByTestId('rect')).toBeInTheDocument();
  });

  it('renders a ThumbnailSvg with the provided width and children', () => {
    const { container } = render(
      <ThumbnailSvg width={100}>
        <rect x="0" y="0" width="100" height="24" />
      </ThumbnailSvg>
    );
    expect(container.firstChild).toHaveAttribute('width', '100');
    expect(container.firstChild).toHaveAttribute('height', '24px');
    expect(container.querySelector('rect')).toBeInTheDocument();
  });
});
