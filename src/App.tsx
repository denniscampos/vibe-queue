import { Routes, Route } from 'react-router-dom';

import { Login } from './components/Login';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Source } from './components/Source';
import { Settings } from './components/Settings';
import { NoMatch } from './components/NoMatch';
import { createContext, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

export const GeneratedIdContext = createContext<string | null | object>(null);

function App() {
  const [generatedId, setGeneratedId] = useState(
    localStorage.getItem('generated_id'),
  );

  useEffect(() => {
    const generated_id = localStorage.getItem('generated_id');

    if (!generated_id) {
      localStorage.setItem('generated_id', nanoid());
    }

    setGeneratedId(String(generated_id));
  }, [generatedId]);

  return (
    <GeneratedIdContext.Provider value={{ generatedId }}>
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
    </GeneratedIdContext.Provider>
  );
}

export default App;
