import './App.css';
import { BrowserRouter } from 'react-router';
import { AppRouter } from './router.tsx';

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
