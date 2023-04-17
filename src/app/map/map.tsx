import { BASEMAP, CartoLayer, MAP_TYPES } from '@deck.gl/carto/typed';
import DeckGL from '@deck.gl/react/typed';
import { cartocolor } from 'cartocolor';
import { StaticMap, ViewState } from 'react-map-gl';
import { getCartoLayerProps } from './layer/getLayer';
import './fix-mapbox-warning.css';
import { IconStyle } from './layer/layerStyles';
import { CartoLayerDataSource } from './layer/dataSource';
import { getChoroplethColorizer } from './layer/choropletColorizer';

const s1: IconStyle = {
  getIconSize: () => 15,
  getIconColor: () => [255, 100, 0],
  getIcon: () => ({
    url: 'https://clausa.app.carto.com/markers/maki/airport.svg',
    width: 15,
    height: 15,
    mask: true,
  }),
  pointType: 'icon',
  type: 'ICON-STYLE',
};
const d1: CartoLayerDataSource = {
  id: 'airports',
  data: 'carto-demo-data.demo_tables.airports',
};
const layer = new CartoLayer(getCartoLayerProps(d1, s1));

const l2 = new CartoLayer(
  getCartoLayerProps(
    {
      id: 'stores',
      data: 'carto-demo-data.demo_tables.retail_stores',
    },
    {
      pointRadiusMinPixels: 3,
      getLineColor: [0, 0, 0, 100],
      lineWidthMinPixels: 1,
      type: 'CIRCLE-STYLE',
      pointType: 'circle',
      getFillColor: [255, 255, 0, 255],
    }
  )
);

const l3 = new CartoLayer(
  getCartoLayerProps(
    {
      id: 'sociodemographics',
      type: MAP_TYPES.TILESET,
      data: 'carto-demo-data.demo_tilesets.sociodemographics_usa_blockgroup',
    },
    {
      lineWidthMinPixels: 1,
      type: 'POLYGON-STYLE',
      getFillColor: getChoroplethColorizer(
        cartocolor.DarkMint,
        'median_income',
        6
      ),
    }
  )
);

const layers = [l3, l2, layer];

export function Map({ initialViewState }: { initialViewState: ViewState }) {
  return (
    <DeckGL
      initialViewState={initialViewState}
      layers={layers}
      controller={true}
    >
      <StaticMap
        mapStyle={BASEMAP.POSITRON}
        attributionControl={true}
        style={{ zIndex: 100 }}
      />
    </DeckGL>
  );
}
