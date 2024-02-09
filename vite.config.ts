import * as process from 'process';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  return {
    build: {
      minify: true,
      lib: {
        entry: 'src/index.ts',
        formats: ['cjs', 'es'],
        fileName: (format) => `forex.${format === 'es' ? 'esm' : format}.js`,
      },
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
