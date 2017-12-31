const webpack = require('webpack');

module.exports = config => {
  config.set({
    browsers: ['Chrome'],
    files: ['./node_modules/es6-shim/es6-shim.min.js', 'karma.entry.js'],
    frameworks: ['jasmine'],
    mime: { 'text/x-typescript': ['ts'] },
    preprocessors: {
      'karma.entry.js': ['webpack', 'sourcemap'],
      '*.js': ['sourcemap'],
      '**/*.spec.ts': ['sourcemap', 'webpack'],
    },
    reporters: ['spec'],
    webpack: {
      context: __dirname,
      devtool: 'sourcemap',
      module: {
        rules: [
          {
            test: /\.html$/,
            loaders: ['raw-loader'],
          },
          {
            test: /\.scss$/,
            loaders: ['raw-loader', 'sass-loader'],
          },
          {
            test: /\.ts$/,
            loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
          },
        ],
      },
      plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.SourceMapDevToolPlugin({
          filename: null,
          test: /\.(ts|js)($|\?)/i,
        }),
        new webpack.ContextReplacementPlugin(
          /\@angular(\\|\/)core(\\|\/)esm5/,
          path.join(__dirname, './client'),
        ),
      ],
      resolve: {
        extensions: ['.ts', '.js'],
      },
    },
  });
};
