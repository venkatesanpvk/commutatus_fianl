const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// replace localhost with 0.0.0.0 if you want to access
// your app from wifi or a virtual machine
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;
const sourcePath = path.join(__dirname, './app');
const buildDirectory = path.join(__dirname, './build');

const apiURLPrefix = {
  production: JSON.stringify('api_host'),
  development: JSON.stringify('https://devapi.ninocity.com')
};

const redirectURL = {
  production: JSON.stringify('redirect_url'),
  development: JSON.stringify('https://dev.ninocity.com')
  //development: JSON.stringify('http://0.0.0.0:3000')
};

const redirectMarketingURL = {
  production: JSON.stringify('redirect_marketing_url'),
  development: JSON.stringify('https://ninocity.com')
  //development: JSON.stringify('http://0.0.0.0:3000')
};

const cognitoConfigProd = {
  apiGateway: {
    REGION: 'cognito_region',
    URL: 'cognito_host',
  },
  cognito: {
    REGION: 'cognito_region',
    USER_POOL_ID: 'cognito_user_pool_id',
    APP_CLIENT_ID: 'cognito_app_client_id'
  },
}

const cognitoConfigDev = {
  apiGateway: {
    REGION: 'eu-west-2',
    URL: 'https://ninocitydev.auth.eu-west-2.amazoncognito.com',
  },
  cognito: {
    REGION: 'eu-west-2',
    USER_POOL_ID: 'eu-west-2_Y67UfvIpq',
    APP_CLIENT_ID: '377v1cvi5vt0vg5pj13i34hpi3'
  }
}

const apiURLCognitoPrefix = {
  production: JSON.stringify(cognitoConfigProd),
  development: JSON.stringify(cognitoConfigDev)
};

// Stripe auth
const stripeAuthKey = {  
  production:JSON.stringify('payment_key'),
  development:JSON.stringify('pk_test_eQwSG3Ku29Z8hvbzhyhTfSw0')
};

// getAddress.io auth
const getAddressAuthKey = {  
  production:JSON.stringify('getAddress_key'),
  development:JSON.stringify('JYzXscrhGkSggebh-w2TGg14797')
};

const stats = {
  hash: false,
  version: false,
  timings: false,
  assets: false,
  chunks: false,
  modules: false,
  reasons: false,
  children: false,
  source: false,
  errors: true,
  errorDetails: false,
  warnings: false,
  publicPath: false,
  colors: {
    green: '\u001b[32m',
  },
};

module.exports = function(env) {
  const nodeEnv = env && env.prod ? 'production' : 'development';
  const isProd = nodeEnv === 'production';

  const serviceWorkerBuild = env && env.sw;

  var cssLoader;

  const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      async: true,
      children: true,
      minChunks: 2,
    }),

    // setting production environment will strip out
    // some of the development code from the app
    // and libraries
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) },
      'apiURLPrefix': apiURLPrefix[nodeEnv],
      'redirectURL': redirectURL[nodeEnv],
      'redirectMarketingURL': redirectMarketingURL[nodeEnv],
      'apiURLCognitoPrefix': apiURLCognitoPrefix[nodeEnv],
      'stripeAuthKey': stripeAuthKey[nodeEnv],
      'getAddressAuthKey': getAddressAuthKey[nodeEnv]
    }),

    // create css bundle
    new ExtractTextPlugin('style-[contenthash:8].css'),

    // create index.html
    new HtmlWebpackPlugin({
      template: './index.ejs',
      inject: true,
      production: isProd,
      minify: isProd && {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),

    // make sure script tags are async to avoid blocking html render
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async',
    }),
    new CopyWebpackPlugin([
      { from: 'assets/css', to: 'assets/css' },
      { from: 'assets/images', to: 'assets/images' },
      //{ from: 'assets/fonts/fontawesome', to: 'assets/fonts/fontawesome' }
    ]),
    // preload chunks
    new PreloadWebpackPlugin()
  ];

  if (isProd) {
    plugins.push(
      // minify remove some of the dead code
      new UglifyJSPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
        },
      })
    );

    cssLoader = ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            module: true, // css-loader 0.14.5 compatible
            modules: true,
            minimize: true,
            localIdentName: '[hash:base64:5]',
          },
        },
        {
          loader: 'sass-loader',
          options: {
            outputStyle: 'collapsed',
            sourceMap: true,
            includePaths: [sourcePath],
          },
        },
      ],
    });
  } else {
    plugins.push(
      // make hot reloading work
      new webpack.HotModuleReplacementPlugin(),
      // show module names instead of numbers in webpack stats
      new webpack.NamedModulesPlugin(),
      // don't spit out any errors in compiled assets
      new webpack.NoEmitOnErrorsPlugin()
    );

    cssLoader = [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          module: true,
          localIdentName: '[path][name]-[local]',
        },
      },
      {
        loader: 'sass-loader',
        options: {
          outputStyle: 'expanded',
          sourceMap: false,
          includePaths: [sourcePath],
        },
      },
    ];
  }

  if (serviceWorkerBuild) {
    plugins.push(
      new SWPrecacheWebpackPlugin({
        cacheId: 'mbfapp',
        filename: 'sw.js',
        maximumFileSizeToCacheInBytes: 800000,
        mergeStaticsConfig: true,
        minify: true,
        runtimeCaching: [
          {
            handler: 'cacheFirst',
            urlPattern: /(.*?)/,
          },
        ],
      })
    );
  }

  const entryPoint = isProd
    ? './index.js'
    : [
        // activate HMR for React
        'react-hot-loader/patch',

        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        `webpack-dev-server/client?http://${host}:${port}`,

        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        'webpack/hot/only-dev-server',

        // the entry point of our app
        './index.js',
      ];

  return {
    devtool: isProd ? 'source-map' : 'cheap-module-source-map',
    context: sourcePath,
    entry: {
      main: entryPoint,
    },
    output: {
      path: buildDirectory,
      publicPath: '/',
      filename: '[name]-[hash:8].js',
      chunkFilename: '[name]-[chunkhash:8].js',
    },
    module: {
      rules: [
        {
          test: /\.(html|svg|jpe?g|png|eot|ttf|woff|woff2?)$/,
          exclude: /node_modules/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'static/[name]-[hash:8].[ext]',
            },
          },
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: cssLoader,
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
      modules: [path.resolve(__dirname, 'node_modules'), sourcePath],
    },

    plugins,

    performance: isProd && {
      maxAssetSize: 600000,
      maxEntrypointSize: 600000,
      hints: 'warning',
    },

    stats: stats,

    devServer: {
      contentBase: './app',
      publicPath: '/',
      historyApiFallback: true,
      port: port,
      host: host,
      hot: !isProd,
      compress: isProd,
      disableHostCheck: false,
      stats: stats,
    },
  };
};