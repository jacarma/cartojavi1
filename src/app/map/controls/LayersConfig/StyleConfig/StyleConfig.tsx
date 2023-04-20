import { PolygonStyle } from 'src/App/layer/model';
import { IconConfig } from './IconConfig';
import { PointCircleConfig } from './PointCircleConfig';
import { LayerDefinition } from 'src/App/layer/model';
import { ChoroplethConfig } from './ChoroplethConfig';

export function StyleConfig({ layer }: { layer: LayerDefinition }) {
  if (layer.style.type === 'CIRCLE-STYLE') {
    return <PointCircleConfig layer={layer} />;
  }

  if (layer.style.type === 'ICON-STYLE') {
    return <IconConfig layer={layer} />;
  }

  if (layer.style.type === 'POLYGON-STYLE') {
    const style = layer.style as PolygonStyle;
    if (!Array.isArray(style.fillColor) || !Array.isArray(style.fillColor)) {
      return <ChoroplethConfig layer={layer} />;
    }
    // TODO: Implement polygon style config
    console.error('Polygon style config not implemented yet');
    return <div>Polygon style config</div>;
  }

  throw new Error('Invalid style type ' + layer);
}
