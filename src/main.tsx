import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.scss';
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router basename={import.meta.env.BASE_URL}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
