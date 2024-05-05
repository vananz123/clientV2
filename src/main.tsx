import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import GlobalStyles from './conponents/GlobalStyles/index.ts';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './routes/AuthProvider.tsx';
ReactDOM.createRoot(document.getElementById('root')!).render(
    <Router>
      
            <GlobalStyles>
                <Provider store={store}>
                    <AuthProvider>
                        <App />
                    </AuthProvider>
                </Provider>
            </GlobalStyles>
    
    </Router>
);
