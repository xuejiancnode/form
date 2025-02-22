import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from "path";
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import DefineOptions from 'unplugin-vue-define-options/vite';
import GetSourceCode from "./plugins/vite-plugin-get-source-code.js"

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  let build = {}

  if (mode === 'docs') {
    build = {
      sourcemap: false,
    }
  } else {
    build = {
      outDir: "@xuejian/form/lib",
      lib: {
        entry: join(__dirname, './package/index.ts'),
        name: "form",
        fileName: (format) => `index.${format}.js`
      },
      rollupOptions: {
        external: ["vue"],
        output: {
          globals: {
            vue: "Vue"
          }
        }
      }
    }
  }
  
  return {
    base: mode === 'docs' ? '/form/' : '/',
    plugins: [
      GetSourceCode('./src/components', './src/sourceCode'),
      vue(),
      DefineOptions(),
      AutoImport({
        imports: ["vue"],
        resolvers: [
          ElementPlusResolver()
        ],
        dts: "./src/auto-imports.d.ts"
      }),
      Components({
        dirs: ["src/components/auto"],
        extensions: ['vue'],
        resolvers: [
          ElementPlusResolver()
        ],
        dts: "./src/components.d.ts"
      })
    ],
    build,
    server: {
      host: true,
      hmr: true,
      proxy: {
        '/api': {
          target: 'http://101.200.242.16:8009',
          ws: true,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
