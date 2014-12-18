var ndj = require('ndjson');
var proj4 = require('proj4');

var through = require('through2');
var pumpify = require('pumpify')
var get = require('set-from-path').get;
var set = require('set-from-path').set;
var reproject = require('./lib/reproject');

module.exports =  function(opts) {

  if (!opts.to_projection) opts.to_projection = "WGS84";

  return pumpify.obj(ndj.parse(), through.obj(function(obj, enc, next){

    if (opts.point) {
      var coordinates = [
        get(opts.x_selector, obj),
        get(opts.y_selector, obj)
      ]
      var new_coords = proj4(opts.from_projection, opts.to_projection, coordinates);
      set(opts.x_selector, new_coords[0], obj),
      set(opts.y_selector, new_coords[1], obj)
    }

    if(opts.geojson) {
      obj = reproject(obj, opts.from_projection, opts.to_projection)
    }

    next(null, JSON.stringify(obj) + '\n')
  }))

}