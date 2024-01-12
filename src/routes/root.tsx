import { VibeContextProvider } from '@/components/Context';
import { Navbar } from '@/components/Navbar';
import { Outlet } from 'react-router-dom';

export function Root() {
  return (
    <VibeContextProvider>
      <Navbar />
      <Outlet />
    </VibeContextProvider>
  );
}
