import { Text, TextField } from '@radix-ui/themes';

type SpotifyPlaylistSettingProps = {
  playlistId: string;
  onSettingsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function SpotifyPlaylistSetting({
  playlistId,
  onSettingsChange,
}: SpotifyPlaylistSettingProps) {
  return (
    <>
      <Text htmlFor="playlistId" as="label" size="2" weight="bold">
        Spotify Playlist ID
      </Text>
      <TextField.Input
        id="playlistId"
        name="playlistId"
        placeholder="Playlist ID.."
        defaultValue={playlistId}
        onChange={onSettingsChange}
      />
    </>
  );
}
