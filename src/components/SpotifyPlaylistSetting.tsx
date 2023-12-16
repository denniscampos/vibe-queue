import { useState } from 'react';
import toast from 'react-hot-toast';
import { Text, TextField, Button } from '@radix-ui/themes';

export function SpotifyPlaylistSetting() {
  const [playlistId, setPlaylistId] = useState('');

  const getPlaylistId = localStorage.getItem('playlist_id') || '';

  const handlePlaylistId = () => {
    localStorage.setItem('playlist_id', playlistId);
    toast.success('Playlist ID saved');
  };

  return (
    <>
      <Text htmlFor="playlistId" as="label" size="2" weight="bold">
        Spotify Playlist ID
      </Text>
      <TextField.Input
        id="playlistId"
        placeholder="Playlist ID.."
        defaultValue={getPlaylistId}
        onChange={(e) => setPlaylistId(e.target.value)}
      />
      <Button type="submit" onClick={handlePlaylistId}>
        Save
      </Button>
    </>
  );
}
