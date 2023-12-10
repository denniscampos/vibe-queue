import { Link } from 'react-router-dom';
import { Flex } from '@radix-ui/themes';
import { Link as RadixLink } from '@radix-ui/themes';

export function Navbar() {
  const accessToken = localStorage.getItem('access_token');

  return (
    <Flex justify="between" asChild>
      <header>
        <RadixLink asChild>
          <Link to="/">
            <span className="text-2xl font-bold">Vibe Queue</span>
          </Link>
        </RadixLink>
        <Flex gap="5" asChild>
          <nav>
            {!accessToken ? (
              <RadixLink asChild>
                <Link to="/login">Login</Link>
              </RadixLink>
            ) : null}
            <RadixLink asChild>
              <Link to="/source">Source</Link>
            </RadixLink>
            <RadixLink asChild>
              <Link to="/settings">Settings</Link>
            </RadixLink>
          </nav>
        </Flex>
      </header>
    </Flex>
  );
}
