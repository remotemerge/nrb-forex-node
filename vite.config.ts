import * as process from 'process';
import { defineConfig, loadEnv } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  return {
    plugins: [dts({ include: 'src/*.ts' })],
    build: {
      minify: false,
      lib: {
        entry: 'src/index.ts',
        formats: ['cjs', 'es'],
      },
      sourcemap: true,
    },
    server: {
      proxy: {
        '^/api/forex/v1/(.+)': {
          target: env.VITE_NRB_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace('/api/forex/v1', ''),
        },
      },
    },
  };
});
