import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { checker } from 'vite-plugin-checker';
import eslint from 'vite-plugin-eslint';
import reactSvgPlugin from 'vite-plugin-react-svg';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import federation from '@originjs/vite-plugin-federation';

const eslintPlugin = [
    {
        // default settings on build (i.e. fail on error)
        ...eslint(),
        apply: 'build',
    },
    {
        // do not fail on serve (i.e. local development)
        ...eslint({
            failOnWarning: false,
            failOnError: true,
        }),
        apply: 'serve',
        enforce: 'post',
    },
];

export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
    const plugins = [
        react({ jsxRuntime: 'automatic' }),
        ...eslintPlugin,
        checker({
            typescript: true,
        }),
        viteTsconfigPaths(),
        svgrPlugin(),
        reactSvgPlugin(),
        // *** Federation plugin to enable Micro Frontend integration ***
        federation({
            name: 'hostApp', // Name of the host app
            remotes: {
                microFrontendApp: 'microFrontendApp@http://localhost:5174/remoteEntry.js', // URL to the micro frontend's remote entry
            },
            shared: ['react', 'react-dom'],
        }),
    ];

    return defineConfig({
        plugins,
        server: {
            open: true,
        },
        build: {
            outDir: 'build',
            rollupOptions: {
                onwarn(warning, defaultHandler) {
                    // this is skipping known warnings thrown becuase of vite version >= 5
                    // see these:
                    // https://github.com/vitejs/vite/issues/15012 (official vite open issue on original location)
                    // https://github.com/damianstasik/vite-svg/issues/37 (same error as our react-svg issue)
                    if (
                        warning.message.includes(`Can't resolve original location of error`) ||
                        warning.message.includes(
                            `Sourcemap is likely to be incorrect: a plugin (react-svg) was used to transform files, but didn't generate a sourcemap for the transformation`
                        )
                    ) {
                        return;
                    }

                    defaultHandler(warning);
                },
            },
            assetsInlineLimit: 0, // Default is 4096 (4kb), set to 0 to avoid inlining small fonts
        },
        optimizeDeps: {
            esbuildOptions: {
                define: {
                    global: 'globalThis',
                },
            },
        },
        assetsInclude: ['**/*.ttf', '**/*.woff', '**/*.woff2'], // Ensure Vite recognizes these as assets
    });
};
