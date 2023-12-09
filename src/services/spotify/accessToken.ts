import { Buffer } from 'buffer';

export const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
export const SPOTIFY_CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
  throw new Error('Missing Spotify Client ID or Client Secret');
}

export async function getAccessToken() {
  const url = 'https://accounts.spotify.com/api/token';
  const currentUrl = window.location.href;
  const redirectUrl = `${import.meta.env.VITE_BASE_URL}/callback`;
  const grantType = 'authorization_code';
  const code = new URL(currentUrl).searchParams.get('code');

  const params = new URLSearchParams();
  params.append('code', String(code));
  params.append('redirect_uri', redirectUrl);
  params.append('grant_type', grantType);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString(
          'base64',
        ),
    },
    body: params,
  });

  const data = await response.json();

  const accessToken = localStorage.getItem('access_token');

  if (!accessToken) {
    localStorage.setItem('access_token', data.access_token);
  }

  return accessToken;
}
