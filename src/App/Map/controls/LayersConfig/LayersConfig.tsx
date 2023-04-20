import { styled } from '@mui/material/styles';
import * as React from 'react';

import { useSelector } from 'react-redux';
import { CartoJavi1State } from 'src/store/store';
import { LayerConfig } from './LayerConfig';

const AccordionWrapper = styled('div')`
  width: 40em;
  font-size: 0.6rem;
`;

export function LayersConfig() {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const layersConfig = useSelector((state: CartoJavi1State) => state.layers);

  const toggleOpen = (panel: string, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <AccordionWrapper data-testid="layers-config">
      {layersConfig.map((layer) => {
        return (
          <LayerConfig
            expanded={expanded === layer.dataSource.id}
            onHeaderClick={(newExpanded: boolean) =>
              toggleOpen(layer.dataSource.id, newExpanded)
            }
            layer={layer}
            key={layer.dataSource.id}
          />
        );
      })}
    </AccordionWrapper>
  );
}
