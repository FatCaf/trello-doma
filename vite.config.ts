/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import react from '@vitejs/plugin-react';

function removeCrossorigin(): any {
  return {
    name: 'remove-module',
    transformIndexHtml(html: string): any {
      return html.replace('crossorigin', '').replace('type="module"', 'defer');
    },
  };
}

dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), removeCrossorigin()],
  define: {
    'process.env': {},
    __VALUE__: `${process.env.VITE__VALUE}`,
  },
  base: './',
});
