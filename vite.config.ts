import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const BASE_PATH = '/wuzhen/'

/** 开发环境下将根路径重定向到 base，避免 Vite 提示访问错误 URL */
function redirectBasePlugin(base: string): Plugin {
  return {
    name: 'redirect-base',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0] ?? ''
        const query = req.url?.includes('?') ? req.url.slice(req.url.indexOf('?')) : ''

        if (url === '/' || url === '') {
          res.writeHead(302, { Location: base + query })
          res.end()
          return
        }

        if (url === '/wuzhen') {
          res.writeHead(301, { Location: base + query })
          res.end()
          return
        }

        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), redirectBasePlugin(BASE_PATH)],
  base: BASE_PATH,
})
