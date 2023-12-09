import { useEffect, useState } from 'react';
import { Login } from './components/Login';
import { getAccessToken } from './services/spotify/accessToken';
import { SearchSong } from './components/SearchSong';

function App() {
  const [loading, setIsLoading] = useState(false);

  const currentUrl = window.location.href;
  const urlParams = new URLSearchParams(new URL(currentUrl).search);
  const accessToken = localStorage.getItem('access_token');

  const code = urlParams.get('code');

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
      <Login />
      {accessToken !== null ? <SearchSong /> : null}

      <canvas id="canvas" width="1920" height="1080"></canvas>
    </div>
  );
}

export default App;
