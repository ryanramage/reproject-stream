reproject-stream
================

geographic coordinate reproject of LDSON streams

install
-------

    npm install reproject-stream -g

Usage
-----

    cat something.json | reproject-stream "geometry.x" "geometry.y" "EPSG:3857"

where args are

  - the property holding the lat value
  - the property holding the lon value
  - the projection the lat,lon are in

