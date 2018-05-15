module.exports = {
  base: "/website/",
  locales: {
    '/': {
      lang: 'en-US',
      title: 'SigSep',
      description: 'Open Resources for Audio Source Separation'
    }
  },
  head: [
    [
      'link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css'}
    ],
    [
      'script', { type: 'text/javascript', src: 'https://cdn.rawgit.com/larsgw/citation.js/archive/citation.js/citation-0.3.4.min.js'}
    ]
  ],
  markdown: {
    // options for markdown-it-anchor
    anchor: { permalink: true },
    // options for markdown-it-toc
    toc: { includeLevel: [1, 2] },
    config: md => {
      // use more markdown-it plugins!
      md.use(require('@iktakahiro/markdown-it-katex'))
    }
  },
  themeConfig: {
    logo: '/logo.png',
    // Assumes GitHub. Can also be a full GitLab url.
    repo: 'sigsep',
    // Defaults to "GitHub"/"GitLab"/"Bitbucket" depending on `themeConfig.repo`
    // if your docs are in a different repo from your main project:
    docsRepo: 'sigsep/sigsep.github.io',
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
      { text: 'Software', link: '/software' },
      { text: 'Methods', link: '/methods/' },
      { text: 'References', link: '/references' },
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
      ]
    }
  }
}
