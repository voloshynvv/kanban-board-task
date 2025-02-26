import { Box, Center, Heading, HStack } from '@chakra-ui/react';

interface BoardColumnProps {
  name: string;
  total: number;
  children: React.ReactNode;
}

export const BoardColumn = ({ name, total, children }: BoardColumnProps) => {
  return (
    <Box>
      <HStack mb="2" justifyContent="center">
        <Heading>{name}</Heading>
        <Center as="span" p="2px" minW="6" rounded="full" fontSize="sm" aspectRatio="1">
          {total}
        </Center>
      </HStack>

      <Box bg="bg.muted" height="100vh" maxH="900px" overflow="auto" p="5">
        {children}
      </Box>
    </Box>
  );
};
