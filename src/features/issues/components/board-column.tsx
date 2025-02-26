import { Box, Center, Heading, HStack, Stack } from '@chakra-ui/react';

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

      <Stack bg="bg.muted" p="5" gap="4">
        {children}
      </Stack>
    </Box>
  );
};
