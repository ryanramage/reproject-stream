reproject-stream
================

geographic coordinate reproject of LDSON streams


CLI Usage
---------

    npm install reproject-stream -g

Lets assume there is a json file, `something.json` with geo data, in EPSG:3857 projection.


    [
     {"x":-12696407.9691,"y":6644490.815599999", "OBJECTID":16960,"Name":"West Nose Creek Confluence Park","Type":35,"Address_1":"North side of Beddington Tr.","Address_2":"","Geographic_Location":"","Postal_Code":"","Website":"","Status":1,"Reasons":"","Programs_and_Services":"Various pathways","Comment":"","created_user":"cgync","created_date":null,"last_edited_user":"cgync","last_edited_date":1390861153000}
    ]

We can reproject to the default 'WGS84' projection

    cat something.json | reproject-stream "x" "y" "EPSG:3857"

where args are

  - the path on the object to the x coord
  - the patj on the object to the y coord
  - the projection the current lat,lon are in


To reproject to another projection

    cat something.json | reproject-stream "x" "y" "EPSG:3857" "EPSG:4269"

To use a proj or wkt string

    cat something.json | reproject-stream "x" "y" "EPSG:3857" "+proj=gnom +lat_0=90 +lon_0=0 +x_0=6300000 +y_0=6300000 +ellps=WGS84 +datum=WGS84 +units=m +no_defs"


GEOJson objects
----------------

It can also reproject full GEOJson objects without having to specify they x and y. So Polygons and other shapes can be reprojected. Here is a long example of something like that.

    cat assessment.csv | ldjson-csv  | jsonmap "this.geometry = JSON.parse(this.GEOMETRY); delete this.GEOMETRY; this.type = 'Feature'"| reproject-stream "+proj=tmerc +lat_0=0 +lon_0=-114 +k=0.9999 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs" --geojson



Module Usage
------------

    npm install reproject-stream --save

then

    var opts = {};
    opts.x_selector = 'x';
    opts.y_selector = 'y';
    opts.from_proj = 'EPSG:3857'
    fs.createReadStream('something.json')
      .pipe(reproject(x_selector, y_selector, from_proj))
      .pipe(process.stdout)



