import { Slider as MuiSlider, Typography } from '@mui/material';
import styled from 'styled-components';

export function Slider({
  value,
  onChange,
  min,
  max,
  label,
}: {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  label: string;
}) {
  return (
    <>
      <Typography gutterBottom>{label}</Typography>
      <SliderWrap>
        <MuiSlider
          aria-label={label}
          value={value}
          step={1}
          marks
          min={min}
          max={max}
          onChange={(_, value) => {
            onChange(value as number);
          }}
          valueLabelDisplay="auto"
          data-testid="slider"
        />
      </SliderWrap>
    </>
  );
}

const SliderWrap = styled('div')`
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 10px;
`;
