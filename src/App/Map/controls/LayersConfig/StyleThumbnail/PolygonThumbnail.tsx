import { colorArrToCSS, hexColorToRGB } from 'src/App/layer/colorUtils';
import {
  Choropleth,
  ColorOrChoroplet,
  PolygonStyle,
} from 'src/App/layer/model';
import { ThumbnailSvg } from './StyleThumbnail';
import { cartocolor } from 'cartocolor';

const CHOROPLETH_THUMBNAIL_WIDTH = 48;
const THUMBNAIL_WIDTH = 24;
const THUMBNAIL_HEIGHT = 24;

export function PolygonThumbnail({
  style: { fillColor, lineColor, lineWidthMinPixels },
}: {
  style: PolygonStyle;
}) {
  if (Array.isArray(fillColor) && Array.isArray(lineColor)) {
    const fill = fillColor;
    const strokeColor = lineColor;
    const strokeWidth = lineWidthMinPixels ?? 0;
    return (
      <ThumbnailSvg width={THUMBNAIL_WIDTH}>
        <rect
          x="0"
          y="0"
          width={THUMBNAIL_WIDTH}
          height={THUMBNAIL_HEIGHT}
          fill={`${colorArrToCSS(fill)}`}
          stroke={`${colorArrToCSS(strokeColor)}`}
          strokeWidth={strokeWidth}
          data-testid="rect"
        />
      </ThumbnailSvg>
    );
  } else {
    // We need to assume that the number of quantiles is the same for both or one is fixed
    const nQuantiles =
      (fillColor as Choropleth).numQuantiles ||
      (lineColor as Choropleth).numQuantiles;

    if (!nQuantiles || nQuantiles < 2 || nQuantiles > 7)
      throw new Error('Incorrect number of quantiles');

    const bands = [];
    const strokeWidth = lineWidthMinPixels ?? 0;

    for (let i = 0; i < nQuantiles; i++) {
      const fill = getColor(fillColor, nQuantiles, i);
      const strokeColor = getColor(lineColor, nQuantiles, i);
      bands.push({ fill, strokeColor });
    }
    // We are going to overlap bands by the stroke width to prevent double borders
    const spaceSavedByOverlappingBorders = strokeWidth * (nQuantiles - 1);
    const bandWidth =
      (CHOROPLETH_THUMBNAIL_WIDTH + spaceSavedByOverlappingBorders) /
      nQuantiles;
    return (
      <ThumbnailSvg width={CHOROPLETH_THUMBNAIL_WIDTH}>
        {bands.map(({ fill, strokeColor }, i) => (
          <rect
            x={i * (bandWidth - strokeWidth)}
            y="0"
            width={bandWidth}
            height={THUMBNAIL_HEIGHT}
            fill={`${colorArrToCSS(fill)}`}
            stroke={`${colorArrToCSS(strokeColor)}`}
            strokeWidth={strokeWidth}
            key={i}
            data-testid="band"
          />
        ))}
      </ThumbnailSvg>
    );
  }
}

const getColor = (
  colorProperty: ColorOrChoroplet,
  nQuantiles: Choropleth['numQuantiles'],
  quantil: number
) => {
  if (Array.isArray(colorProperty)) {
    return colorProperty;
  }
  const colorTheme = cartocolor[(colorProperty as Choropleth).colors];
  const color = hexColorToRGB(colorTheme?.[nQuantiles]?.[quantil]);
  if (!color) {
    console.error(
      `Could not find color for ${nQuantiles} quantiles and quantil ${quantil}`
    );
  }
  return color ?? [0, 0, 0];
};
