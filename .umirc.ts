import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'Amber',
  mode: 'site',
  logo: '/images/logo.png',
  favicon: '/images/favicon.ico',
  styles: [`@font-face {
    font-family: 'iconfont';  /* Project id 3661169 */
    src: url('//at.alicdn.com/t/c/font_3661169_dhbun8x6y6w.woff2?t=1663720978492') format('woff2'),
         url('//at.alicdn.com/t/c/font_3661169_dhbun8x6y6w.woff?t=1663720978492') format('woff'),
         url('//at.alicdn.com/t/c/font_3661169_dhbun8x6y6w.ttf?t=1663720978492') format('truetype');
  }`, `.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}`],
  // more config: https://d.umijs.org/config
});
