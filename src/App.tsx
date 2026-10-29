import { Route, Routes } from 'react-router';
import { GtsPage } from './routes/gts';
import { CowboysPage } from './routes/cowboys';
import { NotFound } from './routes/not-found';

export const routePaths = ['/', '/cowboys-radiator'] as const;

export function App() {
  return (
    <Routes>
      <Route path="/" element={<GtsPage />} />
      <Route path="/cowboys-radiator" element={<CowboysPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
