// mostly take from https://github.com/perliedman/reproject
// it had some issues with detecting crs, so I stripped those.

"use strict";

module.exports = reproject;

var proj4 = require('proj4');

// Checks if `list` looks like a `[x, y]`.
function isXY(list) {
  return list.length === 2 &&
    typeof list[0] === 'number' &&
    typeof list[1] === 'number';
}

function traverseCoords(coordinates, callback) {
  if (isXY(coordinates)) return callback(coordinates);
  return coordinates.map(function(coord){return traverseCoords(coord, callback);});
}

// Simplistic shallow clone that will work for a normal GeoJSON object.
function clone(obj) {
  if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

function traverseGeoJson(geojson, callback) {
  var r = clone(geojson);
  if (geojson.type == 'Feature') {
    r.geometry = traverseGeoJson(geojson.geometry, callback);
  } else if (geojson.type == 'FeatureCollection') {
    r.features = r.features.map(function(gj) { return traverseGeoJson(gj, callback); });
  } else if (geojson.type == 'GeometryCollection') {
    r.geometries = r.geometries.map(function(gj) { return traverseGeoJson(gj, callback); });
  } else {
    callback(r);
  }

  return r;
}


function reproject(geojson, from, to) {

  var transform = proj4(from, to);

  return traverseGeoJson(geojson, function(gj) {
    // No easy way to put correct CRS info into the GeoJSON,
    // and definitely wrong to keep the old, so delete it.
    if (gj.crs) {
      delete gj.crs;
    }
    gj.coordinates = traverseCoords(gj.coordinates, function(xy) {
      return transform.forward(xy);
    });
  });
}


