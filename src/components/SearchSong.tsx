import { useState } from 'react';
import { addTrackToQueue } from '../services/spotify/queue';

const SPOTIFY_API_URL = import.meta.env.VITE_SPOTIFY_API_URL;

export function SearchSong() {
  const [songName, setSongName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const url = new URL(
    `/v1/search?type=track&limit=1&q=${songName}`,
    SPOTIFY_API_URL,
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
        <input
          className="p-2"
          placeholder="Search song..."
          onChange={(e) => setSongName(e.target.value)}
        />
        <button
          disabled={isLoading}
          className="p-2 rounded-sm bg-green-600 text-white"
        >
          {isLoading ? 'Loading...' : 'Search'}
        </button>
      </form>
      <span className="text-red-500">{errorMessage}</span>
      <p className="text-green-500">song name: {songName}</p>
    </>
  );
}
