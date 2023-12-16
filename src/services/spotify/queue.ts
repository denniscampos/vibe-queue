export async function addTrackToQueue(uri: string) {
  const playlistId = localStorage.getItem('playlist_id') || '';

  if (!playlistId) {
    // Probably needs better handling since you can't use this function without it
    throw new Error('Missing playlist id');
  }

  const url = new URL(
    `/v1/playlists/${playlistId}/tracks?uris=${uri}`,
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
