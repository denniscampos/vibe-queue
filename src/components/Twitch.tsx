import { useEffect, useState } from 'react';
import tmi from 'tmi.js';

export function Twitch() {
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState<Array<string>>([]);

  useEffect(() => {
    const client = new tmi.Client({
      options: { debug: true },
      channels: ['dnbull'],
    });

    client.connect();

    client.on('message', (_channel, tags, message) => {
      setUsername(tags['display-name'] as string);
      if (message) {
        setMessages((prevMsg) => [...prevMsg, message]);
      }
    });

    return () => {
      client.disconnect();
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
    </div>
  );
}
