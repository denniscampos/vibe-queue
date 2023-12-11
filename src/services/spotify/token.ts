import { Buffer } from 'buffer';
import { userProfile } from './profile';

export const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
export const SPOTIFY_CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
  throw new Error('Missing Spotify Client ID or Client Secret');
}

let fetchingToken = false;

type SpotifyAccessTokenResponse = {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
};

export async function generateAccessToken(): Promise<SpotifyAccessTokenResponse | null> {
  if (fetchingToken) {
    // To prevent multiple requests.
    return null;
  }

  fetchingToken = true;
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

  const data = (await response.json()) as SpotifyAccessTokenResponse;
  await userProfile(data.access_token);

  const expiresInMilliseconds = data.expires_in * 1000;
  const expiryTime = Date.now() + expiresInMilliseconds;

  const accessToken = localStorage.getItem('access_token');

  localStorage.setItem('refresh_token', data.refresh_token);
  localStorage.setItem('token_expiry_time', expiryTime.toString());

  if (!accessToken) {
    localStorage.setItem('access_token', data.access_token);
  }

  fetchingToken = false;

  return data;
}

type SpotifyRefreshTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
};
export async function getRefreshToken(): Promise<void> {
  // refresh token that has been previously stored
  const refreshToken = localStorage.getItem('refresh_token');
  const url = 'https://accounts.spotify.com/api/token';
  const grantType = 'refresh_token';

  const params = new URLSearchParams();
  params.append('grant_type', grantType);
  params.append('refresh_token', refreshToken!);

  const body = await fetch(url, {
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

  const response = (await body.json()) as SpotifyRefreshTokenResponse;

  const expiresInMilliseconds = response.expires_in * 1000;
  const expiryTime = Date.now() + expiresInMilliseconds;

  localStorage.setItem('token_expiry_time', expiryTime.toString());
  localStorage.setItem('access_token', response.access_token);
  // I think we can use the same refresh token
  //https://community.spotify.com/t5/Spotify-for-Developers/Refreshing-access-token-does-not-reuturn-new-refresh-token/m-p/5431308#M6402

  // localStorage.setItem('refresh_token', response.refresh_token);
}

export async function checkTokenValidity(): Promise<boolean> {
  const expiryTime = parseInt(
    localStorage.getItem('token_expiry_time') || '0',
    10,
  );

  const currentTime = Date.now();

  console.log('expiryTime: ', currentTime >= expiryTime);

  if (currentTime >= expiryTime) {
    try {
      await getRefreshToken();
      return true;
    } catch (e) {
      console.error('Error refreshing token: ', e);
    }
  }

  return false;
}
