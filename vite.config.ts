import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: './src/index.ts',  // 你的库的入口文件
      name: 'ReactUI',          // 库的全局名称
      fileName: (format) => `reactui.${format}.js`,  // 输出文件的命名规则 来自 package.json
    },
    rollupOptions: {
      external: ['react', 'react-dom'], // 外部化 React 和 React DOM，避免重复打包
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  server: {
    port: 3000,  // 开发服务器的端口
  },
  resolve: {
    alias: {
      '@': '/src',  // 设置路径别名，便于引入模块
    },
  },
})
