import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// ~ Import Store
import { store } from './redux/store.js';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
