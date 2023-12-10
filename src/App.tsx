import { Routes, Route } from 'react-router-dom';

import { Login } from './components/Login';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Source } from './components/Source';
import { Settings } from './components/Settings';
import { NoMatch } from './components/NoMatch';

function App() {
  return (
    <div className="flex flex-col">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="source" element={<Source />} />
          <Route path="settings" element={<Settings />} />
          <Route path="/callback" element={<Home />} />

          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
