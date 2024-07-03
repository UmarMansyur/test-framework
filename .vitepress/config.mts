import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Pemrograman Framework",
  description: "Learn how to build desktop application using web technologies",
  themeConfig: {
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    search: {
      provider: 'local',
    },
    logo: 'https://unira.ac.id/img/logo.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Beranda', link: '/' },
    ],

    sidebar: [
      {
        text: 'Soal Framework',
        items: [
          { text: 'Soal', link: '/soal' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/UmarMansyur/desktop-programming' }
    ]
  }
});
