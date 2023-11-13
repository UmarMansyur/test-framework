import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Pemrograman Visual",
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
      { text: 'Instalasi', link: '/instalasi' }
    ],

    sidebar: [
      {
        text: 'Pengenalan',
        items: [
          { text: 'Instalasi', link: '/instalasi' },
          { text: 'Membuat Project', link: '/create-project' },
          { text: 'ToolBox', link: '/toolbox' },
        ]
      },
      {
        text: 'Basic Manajemen File',
        items: [
          { text: 'Controller', link: '/controller' },
          { text: 'Model', link: '/model' },
          { text: 'View', link: '/view' },
          { text: 'Config', link: '/config' },
        ]
      },
      {
        text: 'Lebih Lanjut',
        items: [
          { text: 'ComboBox', link: '/combobox' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/UmarMansyur/desktop-programming' }
    ]
  }
});
