import hexRgb from 'hex-rgb';

export const hexColorToRGB = (color: string) =>
  hexRgb(color, { format: 'array' }).slice(0, 3);

export const colorArrToCSS = (rgb: number[]) => {
  if (rgb.length === 3) {
    return `rgb(${rgb})`;
  }
  if (rgb.length === 4) {
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${rgb[3] / 255})`;
  }
  throw new Error('Invalid color array');
};
