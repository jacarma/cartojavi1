import { MAP_TYPES } from '@deck.gl/carto/typed';

type MAP_TYPE_KEYS = keyof typeof MAP_TYPES;
type MAP_TYPE_VALUES = (typeof MAP_TYPES)[MAP_TYPE_KEYS];

export type CartoLayerDataSource = {
  type?: MAP_TYPE_VALUES;
  connection?: string;
  id: string;
  data: string;
};
