import react from '@vitejs/plugin-react';
import reactSvgPlugin from 'vite-plugin-react-svg';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [react({ jsxRuntime: 'automatic' }), viteTsconfigPaths(), svgrPlugin(), reactSvgPlugin()],
    test: {
        // eslint-disable-next-line no-console
        onConsoleLog: (log) => console.log(log),
        clearMocks: true,
        dangerouslyIgnoreUnhandledErrors: true,
        globals: true,
        environment: 'jsdom',
        setupFiles: './tests/setupTests.ts',
        coverage: {
            reporter: ['text', 'html'],
            exclude: ['node_modules/', 'tests/setupTests.ts'],
        },
    },
});
