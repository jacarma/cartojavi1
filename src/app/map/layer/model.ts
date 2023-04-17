export type Feature = { properties: { [propertyName: string]: number } };

export type TileStats = {
  layers: {
    attributes: {
      attribute: string;
      quantiles?: number[][];
    }[];
  }[];
};

export type Color = number[];
