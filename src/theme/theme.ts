import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const customConfig = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'Ubuntu', serif` },
        body: { value: `'Ubuntu', serif` },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
