import { Box, Card, HStack, Link, Separator, Text } from '@chakra-ui/react';
import { Avatar } from '@/components/ui/avatar';

export const IssueCard = () => {
  return (
    <Card.Root shadow="sm" border="none">
      <Card.Body py="2" px="3" rounded="lg">
        <Card.Title fontWeight="500">Some issue title</Card.Title>

        <Box fontSize="sm" color="fg.muted">
          <HStack gapX="2" mb="1">
            <Text>#315</Text>
            <Text>opened 3 days ago</Text>
          </HStack>

          <HStack gapX="2">
            <Link href="#" color="current">
              <Avatar src="https://assvatars.githubusercontent.com/u/1390709?v=4" fallback="Admin" size="sm" />
              Admin
            </Link>

            <Separator orientation="vertical" height="4" borderColor="gray.400" />

            <Text>Comments: 3</Text>
          </HStack>
        </Box>
      </Card.Body>
    </Card.Root>
  );
};
//
