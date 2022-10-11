import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'Amber',
  mode: 'site',
  logo: '/images/logo.png',
  favicon: '/images/favicon.ico',
  scripts: ['//at.alicdn.com/t/c/font_3661169_u0588zjwy7.js'],
  styles: [
    `.icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
 }`,
  ],
  // more config: https://d.umijs.org/config
});
