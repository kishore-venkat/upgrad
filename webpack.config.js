const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const glob = require('glob')
const devConstants = require('./config/development.json')
const parts = require('./webpack/webpack.parts')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: {
    web: path.join(__dirname, 'build', 'web'),
    mobile: path.join(__dirname, 'build', 'mobile')
  }
}
const commonConfig = (type, source, target, env) => {
  return merge([
    {
      output: {
        filename: '[name]-[hash:8].js',
        chunkFilename: '[name]-[chunkhash:5].js',
        // path: PATHS.build[target]
        path: target === 'web'
          ? path.join(__dirname, 'build', `${source}-${type}-web`)
          : path.join(__dirname, 'build', `${source}-${type}-mobile`)
      }
    },
    // parts.lintJavaScript({ include: PATHS.app }),
    parts.loadConstants(env.production, env.staging),
    parts.lintCSS({include: PATHS.app}),
    parts.loadJavaScript({include: PATHS.app, exlude: /__tests__\/\.js$/}),
    parts.CopyFavicon(type, source, env.PLATFORM)
  ])
}
const productionConfig = (type, source, target, env) => {
  return merge([
    {
      externals: {
        'Config': JSON.stringify(require('./config/production.json'))
      },
      performance: {
        hints: 'warning', // 'error' or false are valid too
        maxEntrypointSize: 200000, // in bytes
        maxAssetSize: 450000 // in bytes
      },
      output: {
        chunkFilename: '[name].[chunkhash:8].js',
        filename: '[name].[chunkhash:8].js'
      },
      plugins: [new webpack.HashedModuleIdsPlugin()],
      recordsPath: path.join(__dirname, 'records.json')
    },
    parts.clean(target === 'web'
      ? path.join(__dirname, 'build', `${source}-${type}-web`)
      : path.join(__dirname, 'build', `${source}-${type}-mobile`)),
    parts.loadFonts({
      options: {
        name: '/fonts/[name].[hash:8].[ext]'
      }
    }),
    parts.minifyJavaScript(),
    parts.extractCSS(),
    parts.minifyCSS({
      options: {
        discardComments: {
          removeAll: true,
          // Run cssnano in safe mode to avoid potentially unsafe transformations.
          safe: true
        }
      }
    }),
    parts.extractBundles([
      {
        name: 'vendor',
        minChunks: ({resource}) => (resource && resource.indexOf('node_modules') >= 0 && resource.match(/\.js$/))
      }, {
        name: 'manifest',
        minChunks: Infinity
      }
    ]),
    parts.attachRevision(),
    // parts.generateSourceMaps({type: 'source-map'}), parts.purifyCSS({   paths:
    // glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }), }),
    parts.loadImages({
      options: {
        limit: 1500,
        name: '/images/[name].[hash:8].[ext]'
      }
    }),
    parts.setFreeVariable('process.env.NODE_ENV', 'production'),
    parts.bundleAnalyzer()
  ])
}
const stagingConfig = (type, source, target, env) => {
  return merge([
    {
      externals: {
        'Config': JSON.stringify(require('./config/staging.json'))
      },
      performance: {
        hints: 'warning', // 'error' or false are valid too
        maxEntrypointSize: 200000, // in bytes
        maxAssetSize: 450000 // in bytes
      },
      output: {
        chunkFilename: '[name].[chunkhash:8].js',
        filename: '[name].[chunkhash:8].js'
      },
      plugins: [new webpack.HashedModuleIdsPlugin()],
      recordsPath: path.join(__dirname, 'records.json')
    },
    parts.clean(target === 'web'
      ? path.join(__dirname, 'build', `${source}-${type}-web`)
      : path.join(__dirname, 'build', `${source}-${type}-mobile`)),
    parts.loadFonts({
      options: {
        name: '/fonts/[name].[hash:8].[ext]'
      }
    }),
    parts.minifyJavaScript(),
    parts.extractCSS(),
    parts.minifyCSS({
      options: {
        discardComments: {
          removeAll: true,
          // Run cssnano in safe mode to avoid potentially unsafe transformations.
          safe: true
        }
      }
    }),
    parts.extractBundles([
      {
        name: 'vendor',
        minChunks: ({resource}) => (resource && resource.indexOf('node_modules') >= 0 && resource.match(/\.js$/))
      }, {
        name: 'manifest',
        minChunks: Infinity
      }
    ]),
    parts.attachRevision(),
    // parts.generateSourceMaps({type: 'source-map'}), parts.purifyCSS({   paths:
    // glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }), }),
    parts.loadImages({
      options: {
        limit: 1500,
        name: '/images/[name].[hash:8].[ext]'
      }
    }),
    parts.setFreeVariable('process.env.NODE_ENV', 'staging'),
    parts.bundleAnalyzer()
  ])
}
const qaConfig = (type, source, target, env) => {
  return merge([
    {
      externals: {
        'Config': JSON.stringify(require('./config/qa.json'))
      },
      performance: {
        hints: 'warning', // 'error' or false are valid too
        maxEntrypointSize: 200000, // in bytes
        maxAssetSize: 450000 // in bytes
      },
      output: {
        chunkFilename: '[name].[chunkhash:8].js',
        filename: '[name].[chunkhash:8].js',
        publicPath: '/'
      },
      plugins: [new webpack.HashedModuleIdsPlugin()],
      recordsPath: path.join(__dirname, 'records.json')
    },
    parts.clean(target === 'web'
      ? path.join(__dirname, 'build', `${source}-${type}-web`)
      : path.join(__dirname, 'build', `${source}-${type}-mobile`)),
    parts.loadFonts({
      options: {
        name: '/fonts/[name].[hash:8].[ext]'
      }
    }),
    parts.minifyJavaScript(),
    parts.extractCSS(),
    parts.minifyCSS({
      options: {
        discardComments: {
          removeAll: true,
          // Run cssnano in safe mode to avoid potentially unsafe transformations.
          safe: true
        }
      }
    }),
    parts.extractBundles([
      {
        name: 'vendor',
        minChunks: ({resource}) => (resource && resource.indexOf('node_modules') >= 0 && resource.match(/\.js$/))
      }, {
        name: 'manifest',
        minChunks: Infinity
      }
    ]),
    parts.attachRevision(),
    // parts.generateSourceMaps({type: 'source-map'}), parts.purifyCSS({   paths:
    // glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }), }),
    parts.loadImages({
      options: {
        limit: 1500,
        name: '/images/[name].[hash:8].[ext]'
      }
    }),
    parts.setFreeVariable('process.env.NODE_ENV', 'qa'),
    parts.bundleAnalyzer()
  ])
}
const developmentConfig = (type, source, target, env) => {
  return merge([
    {
      externals: {
        'Config': JSON.stringify(require('./config/development.json'))
      },
      output: {
        devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
        publicPath: '/'
      }
    },
    parts.HMR(),
    parts.extractBundles([
      {
        name: 'vendor',
        minChunks: ({resource}) => (resource && resource.indexOf('node_modules') >= 0 && resource.match(/\.js$/))
      }, {
        name: 'manifest',
        minChunks: Infinity
      }
    ]),
    parts.generateSourceMaps({type: 'cheap-module-source-map'}),
    parts.devServer({
      // Customize host/port here if needed
      host: devConstants[target].host || process.env.HOST,
      port: devConstants[target][source]
    }),
    parts.loadCSS(),
    parts.loadImages(),
    parts.loadFonts({
      options: {
        name: '[name].[ext]',
        publicPath: '/',
        outputPath: 'fonts/'
      }
    }),
    parts.Dashboard()
    // <parts className="bundleAnalyzer"></parts>
  ])
}
const pages = (type, source, target, env) => {
  const isProd = env.production || false
  const isStaging = env.staging || false
  const isQA = env.qa || false
  const platforms = {
    web: parts.page({
      title: 'upGrad',
      path: 'web',
      template: path.join(PATHS.app, 'src', `${source}`, 'index.web.ejs'),
      entry: {
        web: path.join(PATHS.app, `src/${source}/index.web.js`)
      },
      chunks: [
        'web', 'manifest', 'vendor'
      ],
      isProd,
      isStaging,
      isQA
    }),
    mobile: parts.page({
      title: 'upGrad',
      template: path.join(PATHS.app, 'src', `${source}`, 'index.mobile.ejs'),
      path: 'mobile',
      entry: {
        mobile: path.join(PATHS.app, `src/${source}/index.mobile.js`)
      },
      chunks: [
        'mobile', 'manifest', 'vendor'
      ],
      isProd,
      isStaging,
      isQA
    })
  }
  // console.log(platforms[target])
  return platforms[target]
}
module.exports = (env = {}) => {
  const SOURCE = env.SOURCE
  const TYPE = env.TYPE
  const TARGETS = env.PLATFORM
    ? [env.PLATFORM]
    : ['mobile', 'web']
  return TARGETS.map((target) => {
    const base = commonConfig(TYPE, SOURCE, target, env)
    const config = env.production === true
      ? productionConfig(TYPE, SOURCE, target, env)
      : env.staging === true
        ? stagingConfig(TYPE, SOURCE, target, env)
        : env.qa === true
          ? qaConfig(TYPE, SOURCE, target, env)
          : developmentConfig(TYPE, SOURCE, target, env)

    return merge(base, config, pages(TYPE, SOURCE, target, env))
  })
}
