import * as process from 'process';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(() => {
  const env = loadEnv('nrb', process.cwd(), 'VITE_');
  return {
    build: {
      minify: false,
      lib: {
        entry: 'src/index.ts',
        formats: ['cjs', 'es'],
        fileName: (format) => `forex.${format === 'es' ? 'esm' : format}.js`,
      },
      rollupOptions: {
        external: ['axios'],
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
