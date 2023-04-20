import { render } from '@testing-library/react';
import { Map } from './Map';
import { AppProviders } from '../App';

describe('Map', () => {
  it('should render successfully', () => {
    const INITIAL_VIEW_STATE = {
      longitude: -75.0821796308594,
      latitude: 39.86851121867947,
      zoom: 8,
      pitch: 0,
      bearing: 0,
    };

    const { baseElement } = render(
      <Map initialViewState={INITIAL_VIEW_STATE} />,
      { wrapper: AppProviders }
    );

    expect(baseElement).toBeTruthy();
  });
});
