import { Route, Routes } from 'react-router';
import { GtsPage } from './routes/gts';
import { CowboysPage } from './routes/cowboys';
import { NotFound } from './routes/not-found';

export const routePaths = ['/', '/cowboys-radiator'] as const;

export function App() {
  return (
    <Routes>
      <Route path="/" element={<GtsPage />} />
      {/* A direct hit on the file must not hydrate into the 404. */}
      <Route path="/index.html" element={<GtsPage />} />
      <Route path="/cowboys-radiator/index.html" element={<CowboysPage />} />
      <Route path="/cowboys-radiator" element={<CowboysPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
