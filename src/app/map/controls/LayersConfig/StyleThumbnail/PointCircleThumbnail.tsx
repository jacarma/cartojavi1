import { CircleStyle } from 'src/App/layer/model';
import { ThumbnailSvg } from './StyleThumbnail';
import { colorArrToCSS } from 'src/App/layer/colorUtils';

export function PointCircleThumbnail({ style }: { style: CircleStyle }) {
  const r = Math.min(style.pointRadiusMinPixels || 999, 12);
  const strokeWidth = style.lineWidthMinPixels || 0;
  const fillColor = style.fillColor || [0, 0, 0];
  const strokeColor = style.lineColor || [0, 0, 0];
  // TODO: Implement logic for Choropleth
  if (!Array.isArray(fillColor))
    throw new Error('Choropleth not implemented for Icon style');
  if (!Array.isArray(strokeColor))
    throw new Error('Choropleth not implemented for Icon style');
  return (
    <ThumbnailSvg width={24}>
      <circle
        cx="12"
        cy="12"
        r={r}
        fill={`${colorArrToCSS(fillColor)}`}
        stroke={`${colorArrToCSS(strokeColor)}`}
        strokeWidth={strokeWidth}
      />
    </ThumbnailSvg>
  );
}
