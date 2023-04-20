import { colorArrToCSS } from 'src/App/layer/colorUtils';
import { IconStyle } from 'src/App/layer/model';
import styled from 'styled-components';

export function IconThumbnail({
  style: { iconSize, iconColor, url },
}: {
  style: IconStyle;
}) {
  // TODO: Implement logic for Choropleth
  if (!Array.isArray(iconColor))
    throw new Error('Choropleth not implemented for Icon style');
  const size = Math.min(iconSize || 999, 24);
  return (
    <ColoredIcon
      color={`${colorArrToCSS(iconColor)}`}
      url={`https://clausa.app.carto.com/markers/maki/${url}.svg`}
      iconSize={size}
    />
  );
}

// Hack to recolor an SVG loaded with url
export const ColoredIcon = styled.div<{
  color: string;
  url: string;
  iconSize: number;
}>`
  width: ${(props) => props.iconSize}px;
  height: ${(props) => props.iconSize}px;
  background-color: ${(props) => props.color};
  -webkit-mask: url(${(props) => props.url}) no-repeat center;
  mask: url('${(props) => props.url}') no-repeat center;
`;
