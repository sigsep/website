module.exports = {
  base: "/",
  locales: {
    '/': {
      lang: 'en-US',
      title: 'SigSep',
      description: 'Open Resources for Music Source Separation'
    }
  },
  plugins: [
    ['@vuepress/google-analytics', { ga: 'UA-120462573-1' }],
    [
      'mathjax', {
        macros: {
          '*': '\\times',
        },
      }
    ],
  ],
  ad: [
    [
      'script', { type: 'text/javascript', src: 'https://cdn.rawgit.com/larsgw/citation.js/archive/citation.js/citation-0.3.4.min.js'}
    ]
  ],
  markdown: {
    // options for markdown-it-anchor
    anchor: { permalink: true },
    // options for markdown-it-toc
    toc: { includeLevel: [1, 2] },
  },
  themeConfig: {
    logo: '/logo.png',
    // Assumes GitHub. Can also be a full GitLab url.
    repo: 'sigsep/website',
    // Defaults to "GitHub"/"GitLab"/"Bitbucket" depending on `themeConfig.repo`
    // if your docs are in a different repo from your main project:
    docsRepo: 'sigsep/website',
    // if your docs are not at the root of the repo:
    docsDir: 'content',
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: 'master',
    // defaults to false, set to true to enable
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: 'Edit this page on github',
    lastUpdated: 'Last Updated', // string | boolean
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Datasets', link: '/datasets/' },
      { text: 'Open-Unmix', link: '/open-unmix/' },
      {
        text: 'Learning Material',
        items: [
          { text: 'Tutorials', link: '/tutorials/' },
          { text: 'Literature Overview', link: '/literature/' }
        ]
      },
    ],
    sidebar: {
      '/datasets/': [
        {
          // sidebar for pages under /foo/
          title: 'SigSep Datasets',
          collapsable: false,
          children: [
            '/datasets/musdb',
            '/datasets/dsd100'
          ],
        }
      ],
      '/open-unmix/': [
        {
          // sidebar for pages under /foo/
          title: "Open-Unmix",
          collapsable: false,
          children: [
            '/open-unmix/',
            '/open-unmix/details',
            '/open-unmix/results',
            '/open-unmix/js',
            '/open-unmix/share',
            '/open-unmix/norbert',
            '/open-unmix/museval',
          ],
        },
        {
          // sidebar for pages under /foo/
          title: 'Other Tools',
          collapsable: false,
          children: [
            '/open-unmix/other',
          ],
        }
      ]
    }
  }
}
