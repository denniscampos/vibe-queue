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
import { checkTokenValidity } from '../services/spotify/token';
import toast from 'react-hot-toast';

import { GenerateUrl } from './GenerateUrl';

export function Settings() {
  const [isLoading, setIsLoading] = useState(false);
  const [showEye, setShowEye] = useState(false);

  const accessToken = localStorage.getItem('access_token');

  const handleShowEye = () => {
    setShowEye(!showEye);
  };

  const handleRefreshToken = async () => {
    setIsLoading(true);
    const checkExpiredToken = await checkTokenValidity();

    if (!checkExpiredToken) {
      toast.error('Token is valid, no need to refresh');
    } else {
      toast.success('Token refreshed');
    }

    setIsLoading(false);
  };

  return (
    <Flex justify="center" mt="9">
      <Card size="3" style={{ width: 500 }}>
        <Flex gap="3" direction="column">
          <Box mb="5">
            <Heading as="h2">Settings</Heading>
            <Text as="p" color="gray">
              Manage your URL and token.
            </Text>
          </Box>

          <GenerateUrl />

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
