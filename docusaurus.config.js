// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  themes: ['@docusaurus/theme-live-codeblock'],
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
          showLastUpdateAuthor: true,
          showLastUpdateTime: true
        },
        blog: {
          showReadingTime: true,
          blogSidebarTitle: "所有文章",
          blogSidebarCount: 'ALL',
          blogDescription: "星光不问赶路人"
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
      image: '/bg.jpeg',
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
          { to: '/docs/css', label: 'CSS', position: 'left' },
          { to: '/docs/treasure', label: 'Treasure', position: 'left' },
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
      algolia: {
        appId: 'GJ6H7GCAJO',

        // Public API key: it is safe to commit it
        apiKey: '108985b192b0a8bb1aa9592cabede7ce',

        indexName: 'anborong',

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        // externalUrlRegex: 'external\\.com|domain\\.com',

        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        // replaceSearchResultPathname: {
        //   from: '/docs/', // or as RegExp: /\/docs\//
        //   to: '/',
        // },

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',

        }
    }),
};

module.exports = config;
