// import { Buffer } from 'buffer';

// TODO: probably can eliminate if I'm doing passport route.
export async function getAccessToken() {
  const url = 'https://accounts.spotify.com/api/token';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      //   Authorization:
      //     'Basic ' +
      //     Buffer.from(
      //       import.meta.env.VITE_SPOTIFY_CLIENT_ID +
      //         ':' +
      //         import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
      //     ).toString('base64'),
    },
    body: 'grant_type=client_credentials',
  });

  return response;
}
