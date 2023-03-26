import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import AutoImport from "unplugin-auto-import/vite";
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      // 自动导入vue相关的Api
      imports: ["vue"],  // 也支持vue-router、axios等
      // 声明文件的存放位置
      dts: 'src/auto-imports.d.ts',
    }),
    vueSetupExtend(),
    dts({
      // logLevel: 'warn',
      copyDtsFiles: true,
      outputDir: ['dist'],
      include: ['src/types/index.d.ts'],
      // exclude: ['src/ignore'],
      // aliasesExclude: [/^@components/],
      staticImport: true,
      skipDiagnostics: false,
      // rollupTypes: true,
      insertTypesEntry: true
    }),
  ],
  build: {
    outDir: "dist", //输出文件名称,
    chunkSizeWarningLimit: 1500, // chunk 大小警告的限制 以 kbs 为单位
		lib: {
			entry: path.resolve(__dirname, "./src/components/count-to/index.ts"), //指定组件编译入口文件
			name: "count-to-v3",
			fileName: "count-to-v3",
      formats: ['cjs', 'es', 'umd', 'iife']
		}, //库编译模式配置
		rollupOptions: {
			// 确保外部化处理那些你不想打包进库的依赖
			external: ["vue"],
			output: {
				// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        // chunkFileNames: 'static/js/[name]-[hash].js',
        // entryFileNames: 'static/js/[name]-[hash].js',
        // assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
				globals: {
					vue: "Vue",
				},
        extend: true
			},
		},
  },
  server: {
    host: '0.0.0.0',
    port: 9000,
    open: true,
    hmr: true,
  },
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
    extensions: ['.js','.ts','.jsx','.tsx','.vue', '.scss']
  }
})
