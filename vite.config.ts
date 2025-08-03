import { defineConfig } from 'vitest/config' // ✅ 여기 핵심
import path from 'path'
import { fileURLToPath } from 'url'
import compression from 'vite-plugin-compression2'
import dts from 'vite-plugin-dts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    compression({
      include: /\.(js|scss)$/,
      threshold: 1400,
    }),
    dts(),
  ],
  resolve: {
    extensions: ['.js', '.ts'],
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  build: {
    outDir: 'lib',
    emptyOutDir: false,
    lib: {
      name: 'kku-util',
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['dayjs', 'lodash-es', 'uuid'],
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
  },
})