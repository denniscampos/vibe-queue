import { addTrackToQueue } from '@/services/spotify/queue';
import { currentlyPlaying } from '@/services/spotify/track';
import { TrackPayload } from '@/types';
import { useEffect, useState } from 'react';
import tmi from 'tmi.js';

const client = new tmi.Client({
  options: { debug: true },
  channels: ['dnbull'],
});

client.connect();

export function Twitch() {
  const [songName] = useState('');
  const [, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState<Array<string>>([]);
  const [trackInformation, setTrackInformation] = useState<TrackPayload>();

  const twitchChannel = localStorage.getItem('twitch_channel') || '';
  const retrieveAccessToken = localStorage.getItem('access_token');

  useEffect(() => {
    if (!twitchChannel) return;

    client.on('message', (_channel, tags, message, self) => {
      if (self) return;
      setUsername(tags['display-name'] as string);

      if (message) {
        setMessages((prevMsg) => [...prevMsg, message]);
      }

      const args = message.slice(1).split(' ');
      const command = args?.shift()?.toLowerCase();

      if (command === 'queue') {
        const getSongName = async () => {
          setIsLoading(true);

          const songName = args.join(' ');
          const encodedSongName = encodeURIComponent(songName);
          const url = new URL(
            `/v1/search?type=track&limit=1&q=${encodedSongName}`,
            import.meta.env.VITE_SPOTIFY_API_URL,
          ).href;

          const response = await fetch(url, {
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + retrieveAccessToken,
            },
          });

          const data = await response.json();

          if (data && data.error) {
            setIsLoading(false);

            return;
          }

          const songUri = data.tracks.items[0].uri;

          const res = await addTrackToQueue(songUri);
          if (res.ok) {
            console.log('added song to queue');
          }

          setIsLoading(false);
        };

        getSongName();
      }
    });

    return () => {
      client.disconnect();
    };
  }, [twitchChannel, retrieveAccessToken, messages, songName]);

  useEffect(() => {
    let ignore = false;
    let checkInterval: number | undefined;

    // This is a start but a few things to consider:
    // This doesn't account for if a user pauses the song.
    // What happens if I skip a song?
    // This works when going from song A to B but if C happens, it's not accounted for.

    const getCurrentTrack = async () => {
      const data = await currentlyPlaying();
      if (!ignore) {
        setTrackInformation(data);
      }
    };

    const scheduleNextCheck = (trackDuration: number, progress: number) => {
      const timeLeft = trackDuration - progress;
      clearTimeout(checkInterval);
      checkInterval = setTimeout(() => {
        getCurrentTrack();
      }, timeLeft);
    };

    const initiateTrackCheck = async () => {
      const data = await currentlyPlaying();
      if (!ignore && data) {
        setTrackInformation(data);
        scheduleNextCheck(data.duration_ms, data.progress_ms);
      }
    };

    initiateTrackCheck();

    return () => {
      ignore = true;
      clearTimeout(checkInterval);
    };
  }, []);

  return (
    <div>
      <p>Twitch</p>
      {messages?.map((message, index) => (
        <p className="text-white" key={`chat-${index}`}>
          {username}: {message}
        </p>
      ))}
      <pre>{JSON.stringify(trackInformation, null, 4)}</pre>
    </div>
  );
}
