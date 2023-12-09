const baseUrl = import.meta.env.VITE_BASE_URL;
const spotifyClientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

export function Login() {
  const url = 'https://accounts.spotify.com/authorize?';
  const redirect_uri = `${baseUrl}/callback`;
  const scopes = [
    'user-read-currently-playing',
    'user-read-playback-state',
    'user-read-recently-played',
    'user-top-read',
    'user-modify-playback-state',
    'playlist-modify-public',
    'playlist-modify-private',
  ];

  // TODO: Generate a random string for the state parameter
  const state = '34fFs29kd09';

  const loginUrl = `${url}response_type=code&client_id=${spotifyClientId}&scope=${scopes}&redirect_uri=${redirect_uri}&state=${state}`;

  return (
    <div>
      <a className="text-green-500" href={loginUrl}>
        Login
      </a>
    </div>
  );
}
