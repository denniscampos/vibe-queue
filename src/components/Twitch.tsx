import { addTrackToQueue } from '@/services/spotify/queue';
import { useEffect, useState } from 'react';
import tmi from 'tmi.js';

export function Twitch() {
  const [songName] = useState('');
  const [, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState<Array<string>>([]);

  const twitchChannel = localStorage.getItem('twitch_channel') || '';
  const retrieveAccessToken = localStorage.getItem('access_token');

  useEffect(() => {
    if (!twitchChannel) return;

    const client = new tmi.Client({
      options: { debug: true },
      channels: [twitchChannel],
    });

    client.connect();

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

          addTrackToQueue(songUri);
          setIsLoading(false);
        };

        getSongName();
      }
    });

    return () => {
      client.disconnect();
    };
  }, [twitchChannel, retrieveAccessToken, messages, songName]);

  return (
    <div>
      <p>Twitch</p>
      {messages?.map((message, index) => (
        <p className="text-white" key={`chat-${index}`}>
          {username}: {message}
        </p>
      ))}
    </div>
  );
}

// user types in !queue song_name...
// add the song to the playlist.
// eventually use a bot or channel user to confirm the song was added to the playlist.
