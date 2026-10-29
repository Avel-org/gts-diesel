import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { App } from './App';
import './design/app.css';

const root = document.getElementById('root');
if (!root) throw new Error('#root is missing from index.html');

// The markup is pre-rendered (hard rule 6), so hydrate rather than render.
hydrateRoot(
  root,
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
