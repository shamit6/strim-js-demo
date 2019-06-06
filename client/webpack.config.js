// let rucksack = require('rucksack-css')
let webpack = require('webpack')
let path = require('path')
let NODE_ENV = JSON.stringify(process.env.NODE_ENV || 'development')

let publicPath
let devtool
let hotloaderEntries = []
let plugins = [
  new webpack.DefinePlugin({
    'process.env': {NODE_ENV},
  }),
]

if (NODE_ENV === '"development"') {
  publicPath = 'http://localhost:3000/'
  plugins.push(new webpack.NamedModulesPlugin())
  plugins.push(new webpack.HotModuleReplacementPlugin())
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
  )
  devtool = 'eval-source-map'
  hotloaderEntries = [`webpack-hot-middleware/client?path=${publicPath}__webpack_hmr&name=desktop`]
} else {
  // TODO set publicPath
  // publicPath='http://localhost:3000/'
  plugins.push(new webpack.optimize.AggressiveMergingPlugin())
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  )
}

const config = {
  target: 'web',
  mode: NODE_ENV === '"development"' ? 'development' : 'production',
  context: path.resolve(__dirname, './client'),
  entry: {
    bundle: [...hotloaderEntries, './index.js'],
    html: './index.html',
    vendor: [...hotloaderEntries, 'react', 'react-dom'],
  },
  output: {
    path: path.resolve(__dirname, './static'),
    publicPath,
    filename: '[name].js',
    chunkFilename: '[id].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'file-loader?name=[name].[ext]',
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'client'),
        use: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
          'postcss-loader',
        ],
      },
      {
        test: /\.css$/,
        exclude: path.resolve(__dirname, 'client'),
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader?cacheDirectory=true'],
      },
      {
        test: /\.svg(\?.*)?$/,
        include: path.resolve(__dirname, 'client', 'assets'),
        loader: 'url-loader?limit=1024h&context=images&outputPath=images&name=[name].[ext]',
        // loader: 'svg-url-loader?limit=1024&noquotes&context=images&outputPath=images&name=[name].[ext]',
      },
      {
        test: /\.png$/,
        loader: 'url-loader?limit=8192&mimetype=image/png&context=images&outputPath=images&name=[name].[ext]',
        // include: path.resolve(__dirname, 'client', 'assets'),
      },
      {
        test: /\.gif$/,
        loader: 'url-loader?limit=8192&mimetype=image/gif&context=images&outputPath=images&name=[name].[ext]',
        include: path.resolve(__dirname, 'client', 'assets'),
      },
      {
        test: /\.jpg$/,
        loader: 'url-loader?limit=8192&mimetype=image/jpg&context=images&outputPath=images&name=[name].[ext]',
        include: path.resolve(__dirname, 'client', 'assets'),
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=1024&mimetype=application/font-woff',
      },
      {
        test: /\.(svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        exclude: path.resolve(__dirname, 'client', 'assets'),
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  plugins,
  devtool,
  devServer: {
    contentBase: './client',
    hot: true,
    // publicPath: '/',
    publicPath,
  },
}

module.exports = config
