import { useEffect, useState } from 'react';
import { getAccessToken } from '../services/spotify/accessToken';
import { SearchSong } from './SearchSong';

export function Home() {
  const [loading, setIsLoading] = useState(false);

  const currentUrl = window.location.href;
  const accessToken = localStorage.getItem('access_token');
  const code = new URL(currentUrl).searchParams.get('code');

  useEffect(() => {
    if (!code) return;

    if (
      (accessToken === 'undefined' && code) ||
      (accessToken === null && code)
    ) {
      setIsLoading(true);
      const generateAccessToken = async () => {
        await getAccessToken();
        setIsLoading(false);
      };

      generateAccessToken();
    }
  }, [accessToken, code]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>Home</h2>
      {accessToken !== null ? <SearchSong /> : null}

      <canvas id="canvas" width="1920" height="1080"></canvas>
    </div>
  );
}
