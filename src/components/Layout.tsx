import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { VibeContextProvider } from './Context';

export function Layout() {
  return (
    <VibeContextProvider>
      <div>
        <Navbar />
        <Outlet />
      </div>
    </VibeContextProvider>
  );
}
