import { Box, Button, HStack, Input, Tag, Text, VisuallyHidden } from '@chakra-ui/react';
import { useState } from 'react';
import { suggestions } from '../config';
import { useAppDispatch, useAppSelector } from '@/redux/with-types';
import { urlCleared, urlSet } from '../search-slice';
import { initialState } from '../search-slice';
import { localStorageService } from '@/services/local-storage';

export const SearchForm = () => {
  const repoUrl = useAppSelector((state) => state.search.url);

  return <Form key={repoUrl} initialValue={repoUrl} />;
};

interface SearchFormProps {
  initialValue: string;
}

export const Form = ({ initialValue }: SearchFormProps) => {
  const dispatch = useAppDispatch();

  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(false);

  const regex = /^https:\/\/github\.com\/([^/]+)\/([a-zA-Z0-9-_]+)$/;

  const isValid = (value: string) => {
    if (!value) return true;

    return regex.test(value);
  };

  const handleBlur = () => {
    setError(!isValid(value));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setValue(value);
    setError(!isValid(value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value) {
      localStorageService.removeItem('search');
      dispatch(urlCleared());
      return;
    }

    const match = value.match(regex);

    if (!match) {
      setError(true);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, owner, repo] = match;

    const payload = {
      url: value,
      owner,
      repo,
    };

    localStorageService.setItem('search', payload);

    dispatch(urlSet(payload));
  };

  return (
    <Box asChild pb="9">
      <form onSubmit={handleSubmit}>
        <HStack justifyContent="space-between">
          <Box flex="1" position="relative">
            <Box as="label">
              <VisuallyHidden>Enter repo URL</VisuallyHidden>
              <Input
                value={value}
                onBlur={handleBlur}
                onChange={handleChange}
                borderColor={error ? 'border.error' : ''}
                placeholder="Enter repo URL"
              />
            </Box>

            <HStack position="absolute" justifyContent="space-between" w="100%" top="100%" mt="2">
              <HStack>
                {suggestions.map((suggestion) => (
                  <Tag.Root asChild key={suggestion.id}>
                    <button
                      type="button"
                      onClick={() => {
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        const { id, ...rest } = suggestion;
                        localStorageService.setItem('search', rest);
                        dispatch(urlSet(suggestion));
                      }}
                    >
                      <Tag.Label>
                        {suggestion.owner}/{suggestion.repo}
                      </Tag.Label>
                    </button>
                  </Tag.Root>
                ))}
              </HStack>

              {error && (
                <Text textStyle="xs" color="fg.error">
                  Repo URL is not valid
                </Text>
              )}
            </HStack>
          </Box>

          <Button disabled={error} type="submit">
            Load Issues
          </Button>
        </HStack>
      </form>
    </Box>
  );
};
