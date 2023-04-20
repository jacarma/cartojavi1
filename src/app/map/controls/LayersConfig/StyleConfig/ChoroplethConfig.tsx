import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import {
  Choropleth,
  LayerDefinition,
  NumQuantiles,
  PolygonStyle,
} from 'src/App/layer/model';
import { useLayerDispatchers } from 'src/App/layer/store/layersSlice';
import { Slider } from './Slider';
import { ColorThemePicker } from './ColorThemePicker';

export function ChoroplethConfig({ layer }: { layer: LayerDefinition }) {
  const style = layer.style as PolygonStyle;
  const { updateStyle } = useLayerDispatchers();
  // TODO: I simplified this a lot to allow only fill color classification
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Attribute</InputLabel>
        {layer.tilestats.layers[0] && (
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={(style.fillColor as Choropleth).attribute}
            label="Attribute"
            onChange={({ target: { value } }) => {
              updateStyle(layer.dataSource.id, {
                ...style,
                fillColor: { ...style.fillColor, attribute: value },
              });
            }}
          >
            {layer.tilestats.layers?.[0]?.attributes
              ?.filter((a) => a.quantiles)
              ?.map((attribute) => {
                return (
                  <MenuItem
                    value={attribute.attribute}
                    key={attribute.attribute}
                  >
                    {attribute.attribute}
                  </MenuItem>
                );
              })}
          </Select>
        )}
      </FormControl>

      <Slider
        label="Number of quantiles"
        value={(style.fillColor as Choropleth).numQuantiles}
        min={3}
        max={7}
        onChange={(value) => {
          updateStyle(layer.dataSource.id, {
            ...style,
            fillColor: {
              ...style.fillColor,
              numQuantiles: value as NumQuantiles,
            },
          });
        }}
      />

      <ColorThemePicker
        value={(style.fillColor as Choropleth).colors}
        numQuantiles={(style.fillColor as Choropleth).numQuantiles}
        onClick={(colorThemeName) => {
          updateStyle(layer.dataSource.id, {
            ...style,
            fillColor: {
              ...style.fillColor,
              colors: colorThemeName,
            },
          });
        }}
      />
    </>
  );
}
