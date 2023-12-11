import { Button, Text, TextField } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { CopyIcon } from '@radix-ui/react-icons';
import toast, { Toaster } from 'react-hot-toast';

export function GenerateUrl() {
  const [userUrl, setUserUrl] = useState('');

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const generated_id = localStorage.getItem('generated_id');

    if (!generated_id) {
      localStorage.setItem('generated_id', nanoid());
    } else {
      setUserUrl(`${BASE_URL}/source/?id=${generated_id}`);
    }
  }, [BASE_URL]);

  const copyUserUrl = async () => {
    navigator.clipboard
      .writeText(userUrl)
      .then(() => {
        toast.success('URL copied');
      })
      .catch((err) => {
        toast.error(`${err}`);
      });
  };

  return (
    <>
      <Toaster />
      <Text htmlFor="sourceUrl" as="label" size="2" weight="bold">
        OBS Source URL:
      </Text>

      <TextField.Root>
        <TextField.Input
          id="sourceUrl"
          type="text"
          defaultValue={userUrl ?? ''}
        />
        <TextField.Slot pr="0">
          <Button disabled={userUrl === ''} type="button" onClick={copyUserUrl}>
            <CopyIcon height="16" width="16" /> Copy
          </Button>
        </TextField.Slot>
      </TextField.Root>
    </>
  );
}
