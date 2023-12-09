import { getAccessToken } from '../services/spotify/accessToken';

export function Token() {
  const handleAccessToken = async () => await getAccessToken();

  return (
    <button className="text-green-500" onClick={handleAccessToken}>
      GET TOKEN
    </button>
  );
}
