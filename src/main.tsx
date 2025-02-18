import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { GameProvider } from './store/gameContext.tsx';

createRoot(document.getElementById('root')!).render(
  <GameProvider>
    <App />
  </GameProvider>,
);
