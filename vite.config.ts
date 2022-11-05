import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import SvgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    Vue(),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      dirs: ['src/components', 'src/modules', 'src/icons'],
      extensions: ['vue', 'svg'],
      include: [/\.vue$/, /\.vue\?vue/, /\.svg$/],
      dts: 'src/types/components.d.ts',
    }),
    // https://github.com/jpkleemans/vite-svg-loader
    SvgLoader(),
  ],
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://host.docker.internal:3000',
        changeOrigin: true,
      },
    },
  },
  build: {
    sourcemap: true,
    minify: true,
  },
});
