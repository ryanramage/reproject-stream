#!/usr/bin/env node
var reproject = require('./index.js');
var minimist = require('minimist')


var args = minimist(process.argv.slice(2))

var lat_selector = args._[0]
var lon_selector = args._[1];

var from_proj = args._[2];

process.stdin
  .pipe(reproject(lat_selector, lon_selector, from_proj))
  .pipe(process.stdout)