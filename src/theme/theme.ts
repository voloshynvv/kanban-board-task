import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const customConfig = defineConfig({
  theme: {},
});

export const system = createSystem(defaultConfig, customConfig);
