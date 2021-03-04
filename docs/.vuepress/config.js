module.exports = {
  title: "Amber代码屋",
  description: "Amber代码屋 | 分享程序员知识与生活的平台",
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "食谱", link: "/menu/" },
      { text: "代码", link: "/" },
      { text: "杂文", link: "/note/" },
      { text: "年终总结", link: "/" },
    ],
    sidebar: ["/", "/menu/", "/note/"],
    // 假定 GitHub。也可以是一个完整的 GitLab 网址
    repo: "amberaaa/blog",
    docsDir: "docs",
    docsBranch: "master",
    editLinks: true,
  },
};
