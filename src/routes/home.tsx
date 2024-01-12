import { generateAccessToken } from '@/services/spotify/token';
// import { SearchSong } from './SearchSong';
import { Flex, Heading } from '@radix-ui/themes';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { Twitch } from '../components/Twitch';

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const code = searchParams.get('code');
  const accessToken = localStorage.getItem('access_token');

  const shouldFetchToken = code && !accessToken;

  if (shouldFetchToken) {
    await generateAccessToken();
  }

  return { accessToken };
}

export function Home() {
  const { accessToken } = useLoaderData() as { accessToken: string };

  return (
    <Flex direction="column">
      <Heading as="h2">Home</Heading>
      {accessToken !== null ? <Twitch /> : null}
    </Flex>
  );
}
