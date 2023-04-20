import { Typography, rgbToHex } from '@mui/material';
import { colorArrToCSS, hexColorToRGB } from 'src/App/layer/colorUtils';
import { Color } from 'src/App/layer/model';
import styled from 'styled-components';

export function ColorPicker({
  color,
  onChange,
  label,
}: {
  color: Color;
  onChange: (color: Color) => void;
  label: string;
}) {
  return (
    <>
      <Typography gutterBottom>{label}</Typography>
      <HtmlColorPicker
        type="color"
        value={colorArrayToHexWithoutAlpha(color)}
        onChange={(e) => {
          const colorArray = hexColorToRGB(e.target.value);
          onChange(colorArray);
        }}
        data-testid="color-picker"
      />
    </>
  );
}

export function colorArrayToHexWithoutAlpha(color: Color) {
  return rgbToHex(colorArrToCSS(color.slice(0, 3)));
}

const HtmlColorPicker = styled.input`
  -webkit-appearance: none;
  width: 100%;
  border: none;
  margin-bottom: 10px;
  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  &::-webkit-color-swatch {
    border: none;
  }
`;
