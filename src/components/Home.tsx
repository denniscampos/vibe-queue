import { useEffect, useState } from 'react';
import { generateAccessToken } from '../services/spotify/token';
import { SearchSong } from './SearchSong';
import { Flex, Heading } from '@radix-ui/themes';

export function Home() {
  const [loading, setIsLoading] = useState(false);

  const currentUrl = window.location.href;
  const accessToken = localStorage.getItem('access_token');
  const code = new URL(currentUrl).searchParams.get('code');

  useEffect(() => {
    const shouldFetchToken = code && !accessToken;

    if (shouldFetchToken) {
      setIsLoading(true);
      const createAccessToken = async () => {
        await generateAccessToken();
        setIsLoading(false);
      };

      createAccessToken();
    }
  }, [accessToken, code]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Flex direction="column">
      <Heading as="h2">Home</Heading>
      {accessToken !== null ? <SearchSong /> : null}
    </Flex>
  );
}
