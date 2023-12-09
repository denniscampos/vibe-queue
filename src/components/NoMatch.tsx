import { Link } from 'react-router-dom';
export function NoMatch() {
  return (
    <div className="flex flex-col items-center mt-5">
      <h2 className="text-3xl font-bold">Page not found</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
