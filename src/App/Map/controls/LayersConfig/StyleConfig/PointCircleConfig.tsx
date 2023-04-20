import { LayerDefinition } from 'src/App/layer/model';
import { CircleStyle } from 'src/App/layer/model';
import { Color } from 'src/App/layer/model';
import { useLayerDispatchers } from 'src/App/layer/store/layersSlice';
import { ColorPicker } from './ColorPicker';
import { Slider } from './Slider';

export function PointCircleConfig({ layer }: { layer: LayerDefinition }) {
  const style = layer.style as CircleStyle;
  const { updateStyle } = useLayerDispatchers();

  return (
    <div>
      <ColorPicker
        color={style.fillColor as Color}
        label="Fill Color"
        onChange={(color) => {
          updateStyle(layer.dataSource.id, { ...style, fillColor: color });
        }}
      />
      <ColorPicker
        color={style.lineColor as Color}
        label="Line Color"
        onChange={(color) => {
          updateStyle(layer.dataSource.id, { ...style, lineColor: color });
        }}
      />

      <Slider
        label="Radius"
        value={style.pointRadiusMinPixels ?? 0}
        min={1}
        max={10}
        onChange={(value) => {
          updateStyle(layer.dataSource.id, {
            ...style,
            pointRadiusMinPixels: value,
          });
        }}
      />

      <Slider
        label="Line Width"
        value={style.lineWidthMinPixels ?? 0}
        min={1}
        max={10}
        onChange={(value) => {
          updateStyle(layer.dataSource.id, {
            ...style,
            lineWidthMinPixels: value,
          });
        }}
      />
    </div>
  );
}
