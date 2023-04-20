import { render, screen } from '@testing-library/react';
import Controls from './Controls';
import { AppProviders } from 'src/App/App';

describe('Controls Component', () => {
  it('should render layers configuration component', () => {
    render(<Controls />, { wrapper: AppProviders });
    expect(screen.getByTestId('layers-config')).toBeInTheDocument();
  });

  it('should render author credit with heart emoji', () => {
    render(<Controls />, { wrapper: AppProviders });
    expect(screen.getByTestId('by-javi')).toHaveTextContent(
      'With ❤️ by Javi Carrasco'
    );
  });
});
