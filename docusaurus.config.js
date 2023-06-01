// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Amber',
  // tagline: '',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'http://blog.anborong.top',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'amberaaa', // Usually your GitHub org/user name.
  projectName: 'blog', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/AmberAAA/blog/edit/master',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          // 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Amber',
        logo: {
          alt: '',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'linux',
            position: 'left',
            label: 'Linux',
          },
          {
            type: 'docSidebar',
            sidebarId: 'react',
            position: 'left',
            label: 'React',
          },
          {
            type: 'docSidebar',
            sidebarId: 'typescript',
            position: 'left',
            label: 'TypeScript',
          },
          {
            type: 'docSidebar',
            sidebarId: 'treasure',
            position: 'left',
            label: 'Treasure',
          },
          { to: '/blog', label: 'Blogs', position: 'left' },
          {
            href: 'https://github.com/amberaaa/blog',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} MIT.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
