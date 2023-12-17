import { Text, TextField } from '@radix-ui/themes';

type TwitchChannelSettingProps = {
  twitchChannel: string;
  onSettingsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function TwitchChannelSetting({
  twitchChannel,
  onSettingsChange,
}: TwitchChannelSettingProps) {
  return (
    <>
      <Text htmlFor="twitchChannel" as="label" size="2" weight="bold">
        Twitch Channel Name
      </Text>
      <TextField.Input
        id="twitchChannel"
        name="twitchChannel"
        placeholder="Twitch channel name.."
        defaultValue={twitchChannel}
        onChange={onSettingsChange}
      />
    </>
  );
}
