import { Color, IconStyle, LayerDefinition } from 'src/App/layer/model';
import { useLayerDispatchers } from 'src/App/layer/store/layersSlice';
import { ColorPicker } from './ColorPicker';
import { IconPicker } from './IconPicker';
import { Slider } from './Slider';

export function IconConfig({ layer }: { layer: LayerDefinition }) {
  const style = layer.style as IconStyle;
  const { updateStyle } = useLayerDispatchers();
  return (
    <>
      <ColorPicker
        color={style.iconColor as Color}
        label="Color"
        onChange={(color) => {
          updateStyle(layer.dataSource.id, { ...style, iconColor: color });
        }}
      />

      <Slider
        label="Size"
        value={style.iconSize ?? 0}
        min={8}
        max={60}
        onChange={(value) => {
          updateStyle(layer.dataSource.id, {
            ...style,
            iconSize: value as number,
          });
        }}
      />

      <IconPicker
        layer={layer}
        onClick={(url: string) => {
          updateStyle(layer.dataSource.id, { ...style, url });
        }}
      />
    </>
  );
}
