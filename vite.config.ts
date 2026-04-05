import * as process from 'process';
import { defineConfig, loadEnv } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [dts({ include: 'src/*.ts' })],
    build: {
      minify: false,
      lib: {
        entry: 'src/index.ts',
        formats: ['cjs', 'es'],
      },
      sourcemap: false,
    },
    server: {
      proxy: {
        '^/api/forex/v1/(.+)': {
          target: env.NRB_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace('/api/forex/v1', ''),
        },
      },
    },
  };
});
