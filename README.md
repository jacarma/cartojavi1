# Cartojavi1

[https://cartojavi1.netlify.app/](https://cartojavi1.netlify.app/)

Demo application with Deck.gl and Carto Layers

[![Netlify Status](https://api.netlify.com/api/v1/badges/49dddc15-8d11-4ace-848c-e8ce501575b7/deploy-status)](https://app.netlify.com/sites/cartojavi1/deploys)

## How to start development server

Run `nx serve cartojavi1` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Technical decissions, areas of improvement, technical debt and worth of mention

### Stack

- Deck.gl: Map component
- React, redux, redux-toolkit: Layer styles configuration and layer rendering are on different branches of the react tree. While we could do it without it, redux provides us with convenient helpers.
- Carto Layers: Data from Carto, initial configuration is on [src/App/layer/store/initialLayerState.ts](https://github.com/jacarma/cartojavi1/blob/main/src/App/layer/store/initialLayerState.ts)
- Mui and Styled Components: Ready to use components and css-in-js library
- Nx standalone react template: Alternative to CRA with vite and vitest, to quickstart the project

### Icon rendering

Icons render pixelated. The reason for that is that Cartolayer is replacing loadOptions and we can't provide the options for a better upscale algorithm. [See it on GitHub](https://github.com/visgl/deck.gl/blob/2eaabdd9fa46023544993359595e4171890d1b46/modules/carto/src/layers/carto-layer.ts#L314)

I would love to create a PR to fix this but I run out of time for this technical test.

### Layer styling

There are a lot of functionalities I didn't implement:

- Change from circles/icons in point layers
- Support for non thematic styles for polygon layers
- Themes based on lineColor instead of fillColor
- Thematic rendering of point layers
- Themes for the non tileset layers (I think we would need to query the statistics separately)
- Display legend for layers with thematic rendering

### Thumbnails in layer styles

I did a custom representation of symbols to preview them in the layer configuration widget.

While it works, I feel that deck.gl should probably provide a simpler option. It would be a good idea to investigate this further and replace the thumbnails if deck.gl provides them already.

### Performance

I was happy discovering that deck.gl is diffing the layers and not recreating all the map when the layers change. While I started memoizing the layers object and it's properties, I finally refactored these out.

See [Should I be Creating New Layers on Every Render?](https://github.com/visgl/deck.gl/blob/master/docs/developer-guide/using-layers.md#should-i-be-creating-new-layers-on-every-render) for more information.

To make deck.gl aware of the changes in accessor functions (getFillColor, getLineColor, getIcon...) I had to provide [updateTriggers](https://github.com/jacarma/cartojavi1/blob/d1714065fdfbc2b159a88972bdd19542613e0d8f/src/App/layer/getCartoLayerStyleProps.ts#L70)

I was not that happy when saw the bundle size. To improve the experience I did several things:

- Added a spinner to [index.html](https://github.com/jacarma/cartojavi1/blob/main/index.html)
- Extracted the map to another chunk and load it async
  - [Made the Map lazy](https://github.com/jacarma/cartojavi1/blob/d1714065fdfbc2b159a88972bdd19542613e0d8f/src/App/App.tsx#L10) and displayed a Skeleton while it loads
  - [Copy MAP_TYPES enum to my own code](https://github.com/jacarma/cartojavi1/blob/d1714065fdfbc2b159a88972bdd19542613e0d8f/src/App/layer/model.ts#L5) to prevent other references to deck.gl
- Removed moment.js timezones from the bundle

![image](https://user-images.githubusercontent.com/1166764/233575316-ae879dff-a261-4b62-972f-690ebf3a09a9.png)

Most of the weight of the application is removed from the main bundle. And the UX improves because parts of the application load faster.

![image](https://user-images.githubusercontent.com/1166764/233575377-da07dbd4-9c51-4712-bbe0-ea24fa6af54f.png)

The size of the map chunk is still very high. There are parts of deck.gl and its dependencies we are not using and there may be a way not to load them. It's worth investigating it in the future.

### Testing

The most important cases are unit tested. More tests would be helpful, please see coverage result to identify the less tested spots with `npm run coverage`.

![image](https://user-images.githubusercontent.com/1166764/233575445-a3160cd6-94ce-406c-97ae-dcaad1cf81a8.png)
