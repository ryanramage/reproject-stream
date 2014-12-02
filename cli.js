#!/usr/bin/env node
var reproject = require('./index.js');
var minimist = require('minimist')


var args = minimist(process.argv.slice(2))

var x_selector = args._[0]
var y_selector = args._[1];

var from_proj = args._[2];
var to_proj = args._[3];

process.stdin
  .pipe(reproject(x_selector, y_selector, from_proj, to_proj))
  .pipe(process.stdout)