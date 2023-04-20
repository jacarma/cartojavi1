import { Skeleton } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import { FullSizeLayers } from 'src/components/Layout';
import { createGlobalStyle } from 'styled-components';
import { store } from '../store/store';
import Controls from './Map/controls/Controls';

const Map = lazy(() => import('./Map/Map'));

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

export function App() {
  return (
    <AppProviders>
      <HtmlStyle />
      <FullSizeLayers>
        <Suspense
          fallback={
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              animation="wave"
            />
          }
        >
          <Map initialViewState={INITIAL_VIEW_STATE} />
        </Suspense>
        <Controls />
      </FullSizeLayers>
    </AppProviders>
  );
}

export default App;

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
}
