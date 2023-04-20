import { layouts } from '@mapbox/maki';
import { Typography } from '@mui/material';
import { LayerDefinition } from 'src/App/layer/model';
import { IconStyle } from 'src/App/layer/model';
import styled from 'styled-components';
export function IconPicker({
  layer,
  onClick,
}: {
  layer: LayerDefinition;
  onClick: (url: string) => void;
}) {
  const style = layer.style as IconStyle;
  return (
    <div>
      <Typography gutterBottom>Icon</Typography>

      {layouts.map((layout) => (
        <Icon
          src={`https://clausa.app.carto.com/markers/maki/${layout}.svg`}
          selected={layout === style.url}
          key={layout}
          onClick={() => {
            if (layout !== style.url) {
              onClick(layout);
            }
          }}
        />
      ))}
    </div>
  );
}

export const Icon = styled.img<{
  selected: boolean;
}>`
  display: inline-block;
  width: 15px;
  height: 15px;
  margin: 2px;
  box-sizing: content-box;
  border-radius: 3px;
  cursor: pointer;
  background-color: ${(props) =>
    props.selected ? 'lightblue' : 'transparent'};
  &:hover {
    background-color: lightblue;
  }
`;
