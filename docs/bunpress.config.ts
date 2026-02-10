import type { BunPressConfig } from 'bunpress'

export default {
  name: 'action-releaser',
  description: 'A GitHub Action to easily attach files to a GitHub release with Homebrew formula support',
  themeConfig: {
    nav: [
    { text: 'Guide', link: '/guide/getting-started' },
    { text: 'API', link: '/api/reference' },
    { text: 'GitHub', link: 'https://github.com/stacksjs/action-releaser' }
    ],
    sidebar: {
      '/': [
      {
        text: 'Introduction',
        items: [
        { text: 'Overview', link: '/' },
        { text: 'Getting Started', link: '/guide/getting-started' }
        ]
      },
      {
        text: 'Configuration',
        items: [
        { text: 'Workflow Setup', link: '/guide/workflow' }
        ]
      },
      {
        text: 'Features',
        items: [
        { text: 'File Attachments', link: '/features/attachments' },
        { text: 'Homebrew Formulas', link: '/features/homebrew' },
        { text: 'Release Notes', link: '/features/release-notes' },
        { text: 'Asset Checksums', link: '/features/checksums' }
        ]
      },
      {
        text: 'Advanced',
        items: [
        { text: 'Matrix Builds', link: '/advanced/matrix' },
        { text: 'Custom Scripts', link: '/advanced/scripts' },
        { text: 'Multi-Platform', link: '/advanced/multi-platform' },
        { text: 'Automation Patterns', link: '/advanced/automation' }
        ]
      },
      {
        text: 'API Reference',
        items: [
        { text: 'API Reference', link: '/api/reference' }
        ]
      }
      ]
    },
    socialLinks: [
    { icon: 'github', link: 'https://github.com/stacksjs/action-releaser' },
    { icon: 'discord', link: 'https://discord.gg/stacksjs' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright 2024-present Stacks.js'
    }
  }
} satisfies BunPressConfig
