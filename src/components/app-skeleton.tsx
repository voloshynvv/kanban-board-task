import { Box, Grid, Skeleton } from '@chakra-ui/react';

export const AppSkeleton = () => {
  return (
    <Box>
      <Skeleton height="24px" />

      <Grid overflow="auto" gridTemplateColumns="repeat(3, minmax(280px, 1fr))" mt="2" gap="5">
        <Box>
          <Skeleton mx="auto" width="50%" height="30px" mb="2" />
          <Skeleton borderRadius="0" height="72vh" />
        </Box>
        <Box>
          <Skeleton mx="auto" width="50%" height="30px" mb="2" />
          <Skeleton borderRadius="0" height="72vh" />
        </Box>
        <Box>
          <Skeleton mx="auto" width="50%" height="30px" mb="2" />
          <Skeleton borderRadius="0" height="72vh" />
        </Box>
      </Grid>
    </Box>
  );
};
