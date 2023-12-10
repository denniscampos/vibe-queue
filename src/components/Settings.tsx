import {
  Card,
  Flex,
  Text,
  TextField,
  Heading,
  Box,
  Button,
} from '@radix-ui/themes';
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { getRefreshToken } from '../services/spotify/token';

export function Settings() {
  const [isLoading, setIsLoading] = useState(false);
  const [showEye, setShowEye] = useState(false);

  const accessToken = localStorage.getItem('access_token');

  const handleShowEye = () => {
    setShowEye(!showEye);
  };

  // TODO: Find a way to prevent refreshing tokens back to back, use the `expire_in` from the payload.
  const handleRefreshToken = async () => {
    setIsLoading(true);
    await getRefreshToken();
    setIsLoading(false);
  };

  return (
    <Flex justify="center" mt="9">
      <Card size="3" style={{ width: 500 }}>
        <Flex gap="3" direction="column">
          <Box mb="5">
            <Heading as="h2">Manage Your Token</Heading>
            <Text as="p" color="gray">
              Here you can refresh your token or access your existing token.
            </Text>
          </Box>
          <Text htmlFor="currentToken" as="label" size="2" weight="bold">
            Current Token
          </Text>
          <TextField.Root>
            <TextField.Input
              id="currentToken"
              placeholder="Token.."
              value={String(accessToken)}
              type={showEye ? 'text' : 'password'}
              readOnly
            />
            <TextField.Slot>
              {showEye ? (
                <EyeOpenIcon
                  style={{ cursor: 'pointer' }}
                  onClick={handleShowEye}
                />
              ) : (
                <EyeClosedIcon
                  style={{ cursor: 'pointer' }}
                  onClick={handleShowEye}
                />
              )}
            </TextField.Slot>
          </TextField.Root>
          <Button
            disabled={isLoading}
            type="button"
            onClick={handleRefreshToken}
          >
            {isLoading ? 'Loading..' : 'Refresh Token'}
          </Button>
        </Flex>
      </Card>
    </Flex>
  );
}
