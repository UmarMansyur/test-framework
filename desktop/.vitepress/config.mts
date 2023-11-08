import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Desktop Programming",
  description: "Learn how to build desktop application using web technologies",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
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
          { text: 'ComBobox', link: '/combobox' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/UmarMansyur/desktop-programming' }
    ]
  }
})
