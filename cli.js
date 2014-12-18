#!/usr/bin/env node
var reproject = require('./index.js');
var minimist = require('minimist')


var args = minimist(process.argv.slice(2))

var opts = {}
if (!args.geojson) {
  opts.point = true;
  opts.x_selector = args._[0]
  opts.y_selector = args._[1];
  opts.from_projection = args._[2];
  opts.to_projection   = args._[3];

} else {
  opts.geojson = true;

  opts.from_projection = args._[0];
  opts.to_projection   = args._[1];
}


process.stdin
  .pipe(reproject(opts))
  .pipe(process.stdout)