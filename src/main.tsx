import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import GlobalStyles from './conponents/GlobalStyles/index.ts';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './routes/AuthProvider.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
const queryClient = new QueryClient();
const clientId = import.meta.env.VITE_PUBLIC_GOOGLE_CLIENT_ID;
ReactDOM.createRoot(document.getElementById('root')!).render(
    <Router>
        <GlobalStyles>
            <Provider store={store}>
                <GoogleOAuthProvider clientId={clientId}>
                    <AuthProvider>
                        <QueryClientProvider client={queryClient}>
                            <App />
                        </QueryClientProvider>
                    </AuthProvider>
                </GoogleOAuthProvider>
            </Provider>
        </GlobalStyles>
    </Router>,
);
