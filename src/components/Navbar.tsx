import { Link, useSearchParams } from 'react-router-dom';
import { Flex } from '@radix-ui/themes';
import { Link as RadixLink } from '@radix-ui/themes';
import { Logout } from './Logout';

export function Navbar() {
  const [searchParams] = useSearchParams();
  const accessToken = localStorage.getItem('access_token');
  const code = searchParams.get('code');

  return (
    <Flex justify="between" asChild>
      <header>
        <RadixLink asChild>
          <Link to="/">
            <span className="text-2xl font-bold">Vibe Queue</span>
          </Link>
        </RadixLink>
        <Flex gap="5" align="center" asChild>
          <nav>
            {!code && !accessToken ? (
              <RadixLink asChild>
                <Link to="/login">Login</Link>
              </RadixLink>
            ) : (
              <>
                <RadixLink asChild>
                  <Link to="/source" reloadDocument>
                    Source
                  </Link>
                </RadixLink>
                <RadixLink asChild>
                  <Link to="/settings">Settings</Link>
                </RadixLink>

                <Logout />
              </>
            )}
          </nav>
        </Flex>
      </header>
    </Flex>
  );
}
