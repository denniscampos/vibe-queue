import { Link } from 'react-router-dom';

export function Navbar() {
  const accessToken = localStorage.getItem('access_token');

  return (
    <header className="flex flex-row items-center justify-between p-4">
      <Link to="/">
        <span className="text-2xl font-bold">Vibe Queue</span>
      </Link>
      <nav>
        <ul className="flex flex-row justify-between gap-4">
          {!accessToken ? (
            <li>
              <Link to="/login">Login</Link>
            </li>
          ) : null}
          <li>
            <Link to="/source">Source</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
