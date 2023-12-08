export async function addTrackToQueue(uri: string) {
  const url = new URL(
    `/v1/playlists/0kHlhYiYw4OIi80MYekwsZ/tracks?uris=${uri}`,
    import.meta.env.VITE_SPOTIFY_API_URL,
  ).href;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + import.meta.env.SPOTIFY_ACCESS_TOKEN,
    },
  });

  return response;
}
