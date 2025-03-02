import { Avatar as ChakraAvatar, AvatarRootProps } from '@chakra-ui/react';

interface AvatarProps extends AvatarRootProps {
  fallback: string;
  src: string;
}

export const Avatar = ({ src, fallback, ...props }: AvatarProps) => {
  return (
    <ChakraAvatar.Root {...props}>
      <ChakraAvatar.Fallback name={fallback} />
      <ChakraAvatar.Image src={src} alt={`${fallback}'s avatar`} />
    </ChakraAvatar.Root>
  );
};
