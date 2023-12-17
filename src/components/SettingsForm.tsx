import { useState } from 'react';
import toast from 'react-hot-toast';
import { SpotifyPlaylistSetting } from './SpotifyPlaylistSetting';
import { TwitchChannelSetting } from './TwitchChannelSetting';
import { Button, Flex } from '@radix-ui/themes';

export function SettingsForm() {
  const [settings, setSettings] = useState({
    playlistId: localStorage.getItem('playlist_id') || '',
    twitchChannel: localStorage.getItem('twitch_channel') || '',
  });

  const onSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Settings:', settings);

    localStorage.setItem('twitch_channel', settings.twitchChannel);
    localStorage.setItem('playlist_id', settings.playlistId);
    toast.success('Settings saved!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <SpotifyPlaylistSetting
        playlistId={settings.playlistId}
        onSettingsChange={onSettingsChange}
      />
      <TwitchChannelSetting
        twitchChannel={settings.twitchChannel}
        onSettingsChange={onSettingsChange}
      />
      <Flex justify="end">
        <Button mt="3" type="submit">
          Save
        </Button>
      </Flex>
    </form>
  );
}
