import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'widget_mfe',
  exposes: {
    './Module': './src/remote-entry.ts',
    './SimpleText': './src/app/SimpleText.tsx',
    './WidgetDashboard': './src/app/WidgetDashboard.tsx',
  },
  shared: (libraryName, sharedConfig) => {
    if (libraryName === 'react' || libraryName === 'react-dom') {
      return {
        ...sharedConfig,
        singleton: true,
        strictVersion: false,
        requiredVersion: false,
      };
    }
    return sharedConfig;
  },
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
