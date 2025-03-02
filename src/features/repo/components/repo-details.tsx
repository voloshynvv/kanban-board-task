import { Box, Flex, HStack, Link, Text } from '@chakra-ui/react';
import { Repo } from '../types';

interface RepoDetailsProps {
  repo: Repo;
}

export const RepoDetails = ({ repo }: RepoDetailsProps) => {
  return (
    <HStack flexWrap="wrap" data-testid="repo">
      <Link href={repo.owner.url} target="_blank" color="blue.700">
        {repo.owner.login}
      </Link>
      <Box color="blue.700">&gt;</Box>
      <Link href={repo.url} target="_blank" color="blue.700">
        {repo.name}
      </Link>

      <Flex>
        <Box as="span" role="img">
          ⭐️
        </Box>

        <Text>
          <span>{repo.stars}</span>K Stars
        </Text>
      </Flex>
    </HStack>
  );
};
