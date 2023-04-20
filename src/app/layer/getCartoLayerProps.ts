import { MAP_TYPES } from '@deck.gl/carto/typed';
import { getCartoLayerStyleProps } from './getCartoLayerStyleProps';
import { LayerDefinition, TileStats } from './model';

const defaultOptions = {
  type: MAP_TYPES.TABLE,
  connection: 'carto_dw',
};

// No need to memoize because deck.gl is already diffing
// https://github.com/visgl/deck.gl/blob/master/docs/developer-guide/using-layers.md#should-i-be-creating-new-layers-on-every-render
export function getCartoLayerProps(
  { dataSource, style, tilestats }: LayerDefinition,
  onDataLoad: (tilestats: TileStats) => void
) {
  return {
    ...defaultOptions,
    ...dataSource,
    ...getCartoLayerStyleProps(style, tilestats),
    // TODO: didn't find a way to use a right type here, maybe deck.gl didn't expect tilestats here
    onDataLoad: (layerData: any) => {
      // console.log(layerData);
      if (layerData.tilestats) {
        onDataLoad(layerData.tilestats as TileStats);
      }
    },
    // loadOptions: {
    //   imagebitmap: {
    //     resizeWidth: 256,
    //     resizeHeight: 256,
    //     resizeQuality: 'high',
    //   },
    // },
  };
}
