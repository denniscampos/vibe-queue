import { Navbar } from './Navbar';
import { VibeContextProvider } from './Context';

export function Layout() {
  // potential solution because I'm using local storage..
  // get rid of the navbar in login page...
  // upon success, send them home to trigger a reload.
  // something like successfully logged in, click here to get started.
  // force user to click home (to reload the document)

  return (
    <VibeContextProvider>
      <div>
        <Navbar />
      </div>
    </VibeContextProvider>
  );
}
