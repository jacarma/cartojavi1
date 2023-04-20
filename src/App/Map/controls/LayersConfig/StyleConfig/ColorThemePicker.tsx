import { Typography } from '@mui/material';
import { ColorThemeName, NumQuantiles, colorThemes } from 'src/App/layer/model';
import styled from 'styled-components';
import { PolygonThumbnail } from '../StyleThumbnail/PolygonThumbnail';

export function ColorThemePicker({
  value,
  onClick,
  numQuantiles,
}: {
  value: string;
  onClick: (colorThemeName: ColorThemeName) => void;
  numQuantiles: NumQuantiles;
}) {
  return (
    <div>
      <Typography gutterBottom>ColorTheme</Typography>

      {colorThemes.map((theme) => (
        <ThemeRepresentation
          key={theme}
          selected={value === theme}
          onClick={() => onClick(theme)}
        >
          <PolygonThumbnail
            style={{
              fillColor: {
                attribute: '',
                colors: theme,
                numQuantiles,
              },
              lineColor: [0, 0, 0, 20],
              type: 'POLYGON-STYLE',
            }}
          />
        </ThemeRepresentation>
      ))}
    </div>
  );
}

export const ThemeRepresentation = styled.div<{ selected: boolean }>`
  display: inline-block;
  border: 2px solid ${(props) => (props.selected ? 'blue' : 'transparent')};
  height: 24px;
  cursor: pointer;
`;

// export const ColorTheme = styled.img<{
//   selected: boolean;
// }>`
//   display: inline-block;
//   width: 15px;
//   height: 15px;
//   margin: 2px;
//   box-sizing: content-box;
//   border-radius: 3px;
//   cursor: pointer;
//   background-color: ${(props) =>
//     props.selected ? 'lightblue' : 'transparent'};
//   &:hover {
//     background-color: lightblue;
//   }
// `;
