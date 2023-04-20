import { fireEvent, render, screen } from '@testing-library/react';
import { Slider } from './Slider';

describe('Slider component', () => {
  test('renders label', () => {
    const label = 'Test Label';
    const props = {
      value: 50,
      onChange: vitest.fn(),
      min: 0,
      max: 100,
      label: label,
    };
    render(<Slider {...props} />);
    const labelElement = screen.getByText(label);
    expect(labelElement).toBeInTheDocument();
  });

  test('calls onChange function when user changes slider value', () => {
    const handleChange = vitest.fn();
    const props = {
      value: 50,
      onChange: handleChange,
      min: 0,
      max: 100,
      label: 'Test Label',
    };
    render(<Slider {...props} />);
    const sliderElement = screen.getByRole('slider');
    fireEvent.mouseDown(sliderElement, {
      clientX: sliderElement.getBoundingClientRect().right,
    });
    expect(handleChange).toHaveBeenCalled();
  });

  test('displays correct value on slider', () => {
    const props = {
      value: 50,
      onChange: vitest.fn(),
      min: 0,
      max: 100,
      label: 'Test Label',
    };
    render(<Slider {...props} />);
    const sliderElement = screen.getByRole('slider');
    expect(sliderElement).toHaveAttribute('aria-valuenow', '50');
  });
});
