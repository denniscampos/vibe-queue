export async function addTrackToQueue(uri: string) {
  const url = new URL(
    `/v1/playlists/0kHlhYiYw4OIi80MYekwsZ/tracks?uris=${uri}`,
    import.meta.env.VITE_SPOTIFY_API_URL,
  ).href;

  const retrieveAccessToken = localStorage.getItem('access_token');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + retrieveAccessToken,
    },
  });

  return response;
}
