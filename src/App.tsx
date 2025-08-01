// React import not needed with new JSX transform
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import { store } from '@/store';
import theme from '@/theme';
import Layout from '@/components/Layout/Layout';

/**
 * Main application component that sets up the core providers and routing
 * Includes Redux store, Material-UI theme, React Router, and toast notifications
 */
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Layout />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
                borderRadius: '8px',
              },
              success: {
                style: {
                  background: theme.palette.success.main,
                },
              },
              error: {
                style: {
                  background: theme.palette.error.main,
                },
              },
            }}
          />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App; 