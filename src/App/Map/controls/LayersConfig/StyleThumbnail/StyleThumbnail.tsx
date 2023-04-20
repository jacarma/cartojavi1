import { ReactNode } from 'react';
import { CartoLayerStyle } from 'src/App/layer/model';
import { PointCircleThumbnail } from './PointCircleThumbnail';
import { PolygonThumbnail } from './PolygonThumbnail';
import { IconThumbnail } from './IconThumbnail';

export function StyleThumbnail({ style }: { style: CartoLayerStyle }) {
  if (style.type === 'CIRCLE-STYLE') {
    return <PointCircleThumbnail style={style} />;
  }
  if (style.type === 'ICON-STYLE') {
    return <IconThumbnail style={style} />;
  }
  if (style.type === 'POLYGON-STYLE') {
    return <PolygonThumbnail style={style} />;
  }
  return null;
}

export const ThumbnailSvg = ({
  width,
  children,
}: {
  width: number;
  children: ReactNode;
}) => (
  <svg
    width={width}
    height="24px"
    viewBox={`0 0 ${width} 24`}
    xmlns="http://www.w3.org/2000/svg"
    data-testid="thumbnail"
  >
    {children}
  </svg>
);
