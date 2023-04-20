import { colorArrToCSS, hexColorToRGB } from './colorUtils';

describe('hexColorToRGB', () => {
  it('should work for 6 digit hex color codes', () => {
    expect(hexColorToRGB('#FF0000')).toEqual([255, 0, 0]);
  });

  it('should work for 3 digit hex color codes', () => {
    expect(hexColorToRGB('#F00')).toEqual([255, 0, 0]);
  });

  it('should throw an error for invalid hex color codes', () => {
    expect(() => hexColorToRGB('invalid')).toThrow();
  });
});

describe('colorArrToCSS', () => {
  it('should work for RGB arrays', () => {
    expect(colorArrToCSS([255, 0, 0])).toBe('rgb(255,0,0)');
  });

  it('should work for RGBA arrays', () => {
    expect(colorArrToCSS([255, 0, 0, 128])).toBe(
      'rgba(255, 0, 0, 0.5019607843137255)'
    );
  });

  it('should throw an error for invalid arrays', () => {
    expect(() => colorArrToCSS([255, 0, 0, 128, 255])).toThrow();
  });
});
