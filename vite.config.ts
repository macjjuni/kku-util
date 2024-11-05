import {defineConfig} from 'vite';
import path from 'path';
import {fileURLToPath} from 'url';
import compression from 'vite-plugin-compression2';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [
        compression({
            include: /\.(js|scss)$/,
            threshold: 1400,
        }),
    ],
    resolve: {
        extensions: ['.js', '.ts'],
        alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },

    build: {
        outDir: './lib',
        lib: {
            name: 'kku-util',
            entry: path.resolve(__dirname, 'src/index.ts'), // Init
            formats: ['es', 'cjs'],
            fileName: (format) => `index.${format}.js`,
        },
    },
});
