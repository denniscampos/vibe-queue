import { useState } from 'react';
import { addTrackToQueue } from '../services/spotify/queue';
import { TextField, Button, Text } from '@radix-ui/themes';

export function SearchSong() {
  const [songName, setSongName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const encodedSongName = encodeURIComponent(songName);

  const url = new URL(
    `/v1/search?type=track&limit=1&q=${encodedSongName}`,
    import.meta.env.VITE_SPOTIFY_API_URL,
  ).href;

  const retrieveAccessToken = localStorage.getItem('access_token');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + retrieveAccessToken,
        },
      });

      const data = await response.json();

      if (data && data.error) {
        setErrorMessage(data.error.message);
        setIsLoading(false);

        return;
      }

      console.log({ data });
      setSongName(data.tracks.items[0].name);

      addTrackToQueue(data.tracks.items[0].uri);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField.Input
          mb="2"
          placeholder="Search song..."
          onChange={(e) => setSongName(e.target.value)}
        />
        <Button disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Search'}
        </Button>
      </form>
      <Text as="p" color="red">
        {errorMessage}
      </Text>
      <Text as="p">song name: {songName}</Text>
    </>
  );
}
