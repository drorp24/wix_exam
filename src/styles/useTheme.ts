import { Theme } from '@mui/material';
import { useMediaQuery } from '@mui/system';

import darkTheme from '@root/themes/darkTheme';
import lightTheme from '@root/themes/lightTheme';

interface UseThemeProps {
    mode?: 'light' | 'dark';
}

interface UseThemeResponse {
    theme: Theme;
}

export const useTheme = ({ mode = 'dark' }: UseThemeProps = {}): UseThemeResponse => {
    // Dynamically switch themes based on system preference
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = mode === 'dark' || prefersDarkMode ? darkTheme : lightTheme;

    return { theme };
};
