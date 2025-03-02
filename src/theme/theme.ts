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
  globalCss: {
    body: {
      bg: 'gray.50',
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
