const path = require('path');

module.exports = {
  entry: './src/App.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'ParticleRipple.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath:'/dist/',
    library: 'ParticleRipple',
    libraryTarget:'umd', 
    umdNamedDefine: true,
    libraryExport: 'default' 
    
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 4000,
  },
};