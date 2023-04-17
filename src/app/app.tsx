import { FullSizeLayers } from 'src/components/Layout';
import { Controls, TopLeft } from './map/controls/Controls';
import { Map } from './map/map';
import { LayersConfig } from './map/controls/LayersConfig/LayersConfig';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -75.0821796308594,
  latitude: 39.86851121867947,
  zoom: 8,
  pitch: 0,
  bearing: 0,
};

const theme = createTheme({
  spacing: 4,
  palette: {
    // mode: 'dark',
  },
});

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <FullSizeLayers>
        <Map initialViewState={INITIAL_VIEW_STATE} />
        <Controls>
          <TopLeft>
            <LayersConfig />
          </TopLeft>
        </Controls>
      </FullSizeLayers>
    </ThemeProvider>
  );
}

export default App;
