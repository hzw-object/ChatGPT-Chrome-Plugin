const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');
// const { ProgressPlugin } = require("webpack");
const AutoImportPlugin = require('unplugin-auto-import/webpack');
//  分析打包后的依赖包大小
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// 打包进度美化
const WebpackBar = require('webpackbar');
const path = require('path');

module.exports = [
  {
    stats: 'minimal',
    mode: 'production',
    entry: {
      popup: './src/popup/main.ts',
      options: './src/options/main.ts',
      tabs: './src/tabs/main.ts',
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'js/[name].js',
    },
    // 编译缓存
    cache: {
      type: 'filesystem',
      allowCollectingMemory: true,
    },
    resolve: {
      alias: {
        '@/': path.resolve(__dirname, './src'),
      },
      extensions: ['.ts', '.tsx', '.js', '.vue', '.json'],
    },
    plugins: [
      AutoImportPlugin({
        imports: ['vue'],
        resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
        dts: './src/types/auto-imports.d.ts',
      }),
      Components({
        // relative paths to the directory to search for components.
        dirs: ['src/components'],

        // valid file extensions for components.
        extensions: ['vue'],
        // search for subdirectories
        deep: true,
        // resolvers for custom components
        resolvers: [ElementPlusResolver({ importStyle: 'sass' })],

        // generate `components.d.ts` global declarations,
        // also accepts a path for custom filename
        // dts: false,
        dts: './src/types/components.d.ts',

        // Allow subdirectories as namespace prefix for components.
        directoryAsNamespace: false,
        // Subdirectory paths for ignoring namespace prefixes
        // works when `directoryAsNamespace: true`
        globalNamespaces: [],

        // auto import for directives
        // default: `true` for Vue 3, `false` for Vue 2
        // Babel is needed to do the transformation for Vue 2, it's disabled by default for performance concerns.
        // To install Babel, run: `npm install -D @babel/parser @babel/traverse`
        directives: true,

        // filters for transforming targets
        include: [/\.vue$/, /\.vue\?vue/],
        exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
      }),
      new HtmlWebpackPlugin({
        template: './src/options/index.html',
        filename: 'options.html',
        chunks: ['options'],
      }),
      new HtmlWebpackPlugin({
        template: './src/popup/index.html',
        filename: 'popup.html',
        chunks: ['popup'],
      }),
      new HtmlWebpackPlugin({
        template: './src/tabs/index.html',
        filename: 'tabs.html',
        chunks: ['tabs'],
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: './src/public/manifest.json', to: '../dist' },
          { from: './src/assets/images', to: '../dist/assets' },
        ],
      }),
      new VueLoaderPlugin(),
      // new BundleAnalyzerPlugin(),
      new WebpackBar({
        name: 'vue3-webpack-demo',
        color: '#85d', // 默认green，进度条颜色支持HEX
        profile: true,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]',
            },
          },
        },
        {
          test: /\.(sass|css|scss)$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.tsx?$/,
          use: {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        },
      ],
    },
  },
  {
    stats: 'none',
    mode: 'production',
    entry: {
      content: './src/content/index.ts',
      background: './src/background/index.ts',
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].js',
    },
  },
];
