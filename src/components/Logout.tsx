import { Button } from '@radix-ui/themes';
import { useNavigate, useSearchParams } from 'react-router-dom';

export function Logout() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const accessToken = localStorage.getItem('access_token');
  const navigate = useNavigate();

  const handleLogout = () => {
    if (code || accessToken) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_profile');
      localStorage.removeItem('token_expiry_time');
      navigate('/');
    }
  };

  return (
    <Button onClick={handleLogout} variant="classic">
      Logout
    </Button>
  );
}
