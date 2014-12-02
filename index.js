var ndj = require('ndjson');
var proj4 = require('proj4');

var through = require('through2');
var pumpify = require('pumpify')
var get = require('set-from-path').get;
var set = require('set-from-path').set;

module.exports =  function(lat_selector, lon_selector, from_projection, opts) {

  return pumpify.obj(ndj.parse(), through.obj(function(obj, enc, next){

    var coordinates = [
      get(lat_selector, obj),
      get(lon_selector, obj)
    ]
    var new_coords = proj4(from_projection, "WGS84", coordinates);
    set(lat_selector, new_coords[0], obj),
    set(lon_selector, new_coords[1], obj)
    next(null, JSON.stringify(obj) + '\n')
  }))

}