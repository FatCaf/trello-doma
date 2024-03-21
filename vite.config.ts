/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import react from '@vitejs/plugin-react';

dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {},
    __VALUE__: `${process.env.VITE__VALUE}`,
  },
  base: './',
});
