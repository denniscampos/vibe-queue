import { Button } from '@radix-ui/themes';
import { generateRandomString } from '@/utils';
import { Link } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_BASE_URL;
const spotifyClientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

export function Login() {
  const url = 'https://accounts.spotify.com/authorize?';
  const redirect_uri = `${baseUrl}/callback`;
  const scopes = [
    'user-read-private',
    'user-read-email',
    'user-read-currently-playing',
    'user-read-playback-state',
    'user-read-recently-played',
    'user-top-read',
    'user-modify-playback-state',
    'playlist-modify-public',
    'playlist-modify-private',
  ];
  const state = generateRandomString(16);

  const loginUrl = `${url}response_type=code&client_id=${spotifyClientId}&scope=${scopes}&redirect_uri=${redirect_uri}&state=${state}`;

  return (
    <div>
      <Button asChild>
        <Link className="text-white bg-green-500 p-2 rounded-sm" to={loginUrl}>
          Login
        </Link>
      </Button>
      <Link to="/" reloadDocument>
        Go home
      </Link>
    </div>
  );
}
