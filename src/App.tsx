import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import darkTheme from './themes/darkTheme';
import lightTheme from './themes/lightTheme';

// Dynamically import the App component from the micro frontend app
// const MicroFrontendComponent = React.lazy(() => import('microFrontendApp/App'));

const StaleTime = 5 * 60 * 1000; // Consider data fresh (= don't refetch) for 5 minutes

function App() {
    const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: StaleTime } } });

    // Dynamically switch themes based on system preference
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = prefersDarkMode ? darkTheme : lightTheme;
    console.log('theme: ', theme);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <QueryClientProvider client={queryClient}>Hello world</QueryClientProvider>
        </ThemeProvider>
    );
}

export default App;
