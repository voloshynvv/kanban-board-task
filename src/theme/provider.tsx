import { ChakraProvider } from '@chakra-ui/react';
import { system } from './theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return <ChakraProvider value={system}>{children}</ChakraProvider>;
};
