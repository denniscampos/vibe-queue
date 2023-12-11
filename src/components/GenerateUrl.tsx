import { Button, Text, TextField } from '@radix-ui/themes';
import { useContext } from 'react';

import { CopyIcon } from '@radix-ui/react-icons';
import toast, { Toaster } from 'react-hot-toast';
import { GeneratedIdContext } from '../App';

type GeneratedContextType = {
  generatedId: string;
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

export function GenerateUrl() {
  const { generatedId } = useContext(
    GeneratedIdContext,
  ) as GeneratedContextType;

  const sourceUrl = `${BASE_URL}/source/?=${generatedId}`;

  const copyUserUrl = async () => {
    navigator.clipboard
      .writeText(sourceUrl)
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
        <TextField.Input id="sourceUrl" type="text" defaultValue={sourceUrl} />
        <TextField.Slot pr="0">
          <Button type="button" onClick={copyUserUrl}>
            <CopyIcon height="16" width="16" /> Copy
          </Button>
        </TextField.Slot>
      </TextField.Root>
    </>
  );
}
