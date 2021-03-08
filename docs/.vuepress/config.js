module.exports = {
  title: "Amber代码屋",
  description: "Amber代码屋 | 分享程序员知识与生活的平台",
  head: [
    ["meta", { name: "baidu-site-verification", content: "code-BIOahWpBKG" }],
    [
      "script",
      {
        type: "text/javascript",
        src: "https://v1.cnzz.com/z_stat.php?id=1279738583&web_id=1279738583",
      },
    ],
  ],
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "食谱", link: "/menu/" },
      { text: "代码", link: "/code/" },
      { text: "杂文", link: "/note/" },
    ],
    sidebar: ["/menu/", "/note/", "/code/"],
    // 假定 GitHub。也可以是一个完整的 GitLab 网址
    repo: "amberaaa/blog",
    docsDir: "docs",
    docsBranch: "master",
    editLinks: true,
  },
};
