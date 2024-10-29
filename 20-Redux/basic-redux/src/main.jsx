import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider} from 'react-redux'
import './index.css'
import App from './App.jsx'
import store from"./store.jsx";

store.dispatch({type: "account/deposit", payload: 500});
console.log(store.getState());

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
