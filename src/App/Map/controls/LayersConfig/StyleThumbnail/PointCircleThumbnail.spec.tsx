import React from 'react';
import { PointCircleThumbnail } from './PointCircleThumbnail';
import { render, screen } from '@testing-library/react';
import { CircleStyle } from 'src/App/layer/model';

describe('PointCircleThumbnail', () => {
  test('renders a circle with the correct style', () => {
    const style: CircleStyle = {
      pointRadiusMinPixels: 6,
      lineWidthMinPixels: 2,
      fillColor: [255, 0, 0],
      lineColor: [0, 255, 0],
      pointType: 'circle',
      type: 'CIRCLE-STYLE',
    };
    render(<PointCircleThumbnail style={style} />);
    const circle = screen.getByTestId('circle');
    expect(circle).toHaveAttribute('cx', '12');
    expect(circle).toHaveAttribute('cy', '12');
    expect(circle).toHaveAttribute('r', '6');
    expect(circle).toHaveAttribute('fill', 'rgb(255,0,0)');
    expect(circle).toHaveAttribute('stroke', 'rgb(0,255,0)');
    expect(circle).toHaveAttribute('stroke-width', '2');
  });
});
