import styled from 'styled-components';
import { LayersConfig } from './LayersConfig/LayersConfig';
import { Typography } from '@mui/material';

export const ControlsWrap = styled.div`
  pointer-events: none;
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
  align-content: space-between;
  grid-template-areas:
    'top-left top-right'
    'bottom-left bottom-right';

  > * {
    pointer-events: auto;
    margin: 10px;
  }
`;

export const TopLeft = styled.div`
  grid-area: top-left;
`;
export const TopRight = styled.div`
  grid-area: top-right;
`;
export const BottomLeft = styled.div`
  grid-area: bottom-left;
`;
export const BottomRight = styled.div`
  grid-area: bottom-right;
`;

export default function Controls() {
  return (
    <ControlsWrap>
      <TopLeft>
        <LayersConfig />
      </TopLeft>
      <BottomLeft>
        <Typography data-testid="by-javi">
          With{' '}
          <span role="img" aria-label="heart emoji">
            ❤️
          </span>{' '}
          by Javi Carrasco
        </Typography>
      </BottomLeft>
    </ControlsWrap>
  );
}
