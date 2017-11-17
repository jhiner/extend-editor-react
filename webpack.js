const path = require('path')

module.exports = {
  entry: './src/index.js',
  // entry: './dist/extend-editor-react.min.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		libraryTarget: 'commonjs2'
	},
	module: {
		loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
		]
	},
	externals: {
		react: 'commonjs react'
	}
}
