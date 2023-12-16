import { useState } from 'react';
import toast from 'react-hot-toast';
import { Text, TextField, Button } from '@radix-ui/themes';

export function TwitchChannelSetting() {
  const [twitchChannel, setTwitchChannel] = useState('');

  const getTwitchChannel = localStorage.getItem('twitch_channel') || '';

  const handleTwitchChannel = () => {
    localStorage.setItem('twitch_channel', twitchChannel);
    toast.success('twitch channel name saved');
  };

  return (
    <>
      <Text htmlFor="twitchChannel" as="label" size="2" weight="bold">
        Twitch Channel Name
      </Text>
      <TextField.Input
        id="twitchChannel"
        placeholder="Twitch channel name.."
        defaultValue={getTwitchChannel}
        onChange={(e) => setTwitchChannel(e.target.value)}
      />
      <Button type="submit" onClick={handleTwitchChannel}>
        Save
      </Button>
    </>
  );
}
