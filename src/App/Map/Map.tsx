import { BASEMAP, CartoLayer } from '@deck.gl/carto/typed';
import DeckGL from '@deck.gl/react/typed';
import { StaticMap, ViewState } from 'react-map-gl';
import { useSelector } from 'react-redux';
import { useLayerDispatchers } from 'src/App/layer/store/layersSlice';
import { CartoJavi1State } from 'src/store/store';
import { getCartoLayerProps } from '../layer/getCartoLayerProps';
import { CartoLayerDataSource, TileStats } from '../layer/model';
import { initCarto } from '../layer/initCarto';
import { GeneratedCartoStyleProps } from '../layer/getCartoLayerStyleProps';

initCarto();

export default function Map({
  initialViewState,
}: {
  initialViewState: ViewState;
}) {
  const layersConfig = useSelector((state: CartoJavi1State) => state.layers);
  const { updateTileStats } = useLayerDispatchers();

  // We don't need to useMemo here because deck.gl is already diffing
  // https://github.com/visgl/deck.gl/blob/master/docs/developer-guide/using-layers.md#should-i-be-creating-new-layers-on-every-render
  const layers = layersConfig.map((layer) => {
    const onDataLoad = (tilestats: TileStats) => {
      updateTileStats(layer.dataSource.id, tilestats);
    };
    return new CartoLayer(
      getCartoLayerProps(layer, onDataLoad) as CartoLayerDataSource &
        GeneratedCartoStyleProps & {
          onDataLoad: (layerdata: unknown) => void;
        }
    );
  });

  return (
    <DeckGL
      initialViewState={initialViewState}
      layers={layers}
      controller={true}
    >
      <StaticMap mapStyle={BASEMAP.POSITRON} attributionControl={true} />
    </DeckGL>
  );
}
