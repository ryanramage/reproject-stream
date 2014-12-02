var ndj = require('ndjson');
var proj4 = require('proj4');

var through = require('through2');
var pumpify = require('pumpify')
var get = require('set-from-path').get;
var set = require('set-from-path').set;

module.exports =  function(x_selector, y_selector, from_projection, to_projection) {

  if (!to_projection) to_projection = "WGS84";

  return pumpify.obj(ndj.parse(), through.obj(function(obj, enc, next){

    var coordinates = [
      get(x_selector, obj),
      get(y_selector, obj)
    ]
    var new_coords = proj4(from_projection, to_projection, coordinates);
    set(x_selector, new_coords[0], obj),
    set(y_selector, new_coords[1], obj)
    next(null, JSON.stringify(obj) + '\n')
  }))

}