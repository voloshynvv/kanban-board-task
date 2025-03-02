import { memo } from 'react';
import { useAppSelector } from '@/redux/with-types';

import { Box, Card, HStack, Link, Separator, Text } from '@chakra-ui/react';
import { Avatar } from '@/components/ui/avatar';

import { selectIssueById } from '../issues-slice';

interface IssueCardProps {
  issueId: number;
}

export const IssueCard = memo(({ issueId }: IssueCardProps) => {
  const issue = useAppSelector((state) => selectIssueById(state, issueId));

  if (!issue) return null;

  return (
    <Card.Root shadow="sm" border="none" data-testid="dnd-cart">
      <Card.Body py="2" px="3" rounded="lg">
        <Card.Title textStyle="md" lineClamp="2" wordBreak="break-word" fontWeight="500">
          {issue.title}
        </Card.Title>

        <Box fontSize="sm" color="fg.muted">
          <HStack gapX="2" mb="1">
            <Text>#{issue.number}</Text>
            <Text>opened 3 days ago</Text>
          </HStack>

          <HStack gapX="2">
            <Link href={issue.user.homeUrl} target="_blank" color="current">
              <Avatar src={issue.user.avatarUrl} fallback={issue.user.login} size="sm" />
              {issue.user.login}
            </Link>

            <Separator orientation="vertical" height="4" borderColor="gray.400" />

            <Text>Comments: {issue.comments}</Text>
          </HStack>
        </Box>
      </Card.Body>
    </Card.Root>
  );
});
