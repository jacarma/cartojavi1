import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { FullSizeLayers } from 'src/components/Layout';
import { store } from '../store/store';
import Controls from './Map/controls/Controls';
import { Map } from './Map/Map';
import { initCarto } from './layer/initCarto';
import { createGlobalStyle } from 'styled-components';

const HtmlStyle = createGlobalStyle`
  html {
    font-size: 12px;
  }

  /* Fix mapbox warning */
  .mapboxgl-canary {
    background-color: rgb(250, 128, 114)
  }
`;

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

initCarto();

export function App() {
  return (
    <Provider store={store}>
      <HtmlStyle />
      <ThemeProvider theme={theme}>
        <FullSizeLayers>
          <Map initialViewState={INITIAL_VIEW_STATE} />
          <Controls />
        </FullSizeLayers>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
