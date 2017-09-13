'use strict';

const path = require('path');
const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const babel = require('gulp-babel');
const del = require('del');

const DzhyunPlugin = require('./plugin');

const lib = 'lib';
const dist = 'dist';
const src = './src/**/*.js';

gulp.task('clean-lib', function() {
  return del([lib]);
});

gulp.task('clean-dist', function() {
  return del([dist]);
});

gulp.task('node-lib', ['clean-lib'], function () {
  return gulp.src(src)
    .pipe(babel())
    .pipe(gulp.dest(lib));
});

gulp.task('browser-dist', ['clean-dist', 'node-lib'], function() {
  return Promise.all([
    {name: 'dzhyun', plugins: [new DzhyunPlugin()]},
    {name: 'dzhyun-json', plugins: [new DzhyunPlugin({ pb: false })]},
    {name: 'dzhyun-pb', plugins: [new DzhyunPlugin({ json: false })]}].map((config) => {
    return new Promise((resolve) => {
      gulp.src([])
        .pipe(webpackStream({
          entry: {
            [config.name]: './src/Dzhyun.js',
            [`${config.name}.min`]: './src/Dzhyun.js',
          },
          output: {
            filename: '[name].js',
            library: 'Dzhyun',
            libraryTarget: 'umd',
          },
          module: {
            rules: [{
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'babel-loader',
            }]
          },
          plugins: [
            new webpack.optimize.UglifyJsPlugin({
              include: /\.min\.js$/,
              minimize: true
            }),
          ].concat(config.plugins || []),
          devtool: 'source-map',
        }, webpack))
        .pipe(gulp.dest(dist)).on('finish', resolve);
    });
  }));
});

gulp.task('default', ['node-lib', 'browser-dist']);
