import { TrackPayload } from '@/types';

export async function currentlyPlaying(): Promise<TrackPayload> {
  const retrieveAccessToken = localStorage.getItem('access_token');
  const url = new URL(
    '/v1/me/player/currently-playing',
    import.meta.env.VITE_SPOTIFY_API_URL,
  ).href;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + retrieveAccessToken,
    },
  });

  const data = await response.json();

  const trackInformation = {
    name: data.item.name,
    artist: data.item.artists[0].name,
    albumCover: data.item.album.images[0].url,
    progress_ms: data.progress_ms,
    duration_ms: data.item.duration_ms,
  };

  return trackInformation;
}
