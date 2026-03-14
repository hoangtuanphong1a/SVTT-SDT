import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import autoprefixer from 'autoprefixer';
import path from 'path';
import tailwind from 'tailwindcss';
import { defineConfig, loadEnv, UserConfig } from 'vite';
import VueDevTools from 'vite-plugin-vue-devtools';

// https://vitejs.dev/config/
export default defineConfig(({ mode }: UserConfig) => {

  // https://vitejs.dev/config/#environment-variables
  const env = loadEnv(mode ?? 'development', process.cwd(), '');

  const BASE_PATH: string = env.APP_BASE_PATH.endsWith('/')
    ? env.APP_BASE_PATH.slice(0, -1)
    : env.APP_BASE_PATH + '/';

  const proxyApi = BASE_PATH + '/api';
  const serverConfig: Record<string, unknown> = { host: true };
  if (env.BASE_API_URL) {
    serverConfig.proxy = {
      [proxyApi]: {
        target: env.BASE_API_URL,
        changeOrigin: true,
        rewrite: (p: string) => p.replace(BASE_PATH, '')
      }
    };
  }

  return {
    base: BASE_PATH,
    plugins: [vue(), vueJsx(), VueDevTools()],
    define: {
      'process.env.APP_BASE_PATH': JSON.stringify(env.APP_BASE_PATH),
      'process.env.BASE_API_URL': JSON.stringify(env.BASE_API_URL ?? ''),
      'process.env.MOCK_API': JSON.stringify(env.MOCK_API ?? '')
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    css: {
      postcss: {
        plugins: [tailwind(), autoprefixer()]
      }
    },
    server: serverConfig
  };
});
