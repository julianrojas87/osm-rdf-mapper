# osm-rdf-mapper

RDF generation script for OSM (pbf) data following the https://w3id.org/openstreetmap/terms# ontology.

## How to use?

Clone this repo and install:

```bash
cd osm-rdf-mapper
npm install
```

This is a command line tool and can be used as follows:

```bash
node bin/osm2rdf.js -s path/to/osm/file.pbf --compressed -o path/to/output/file.nt.gz
```

The tool will produce RDF triples in [`N-Triples`](https://www.w3.org/TR/n-triples/) format following this [OSM ontology](https://w3id.org/openstreetmap/terms#). This ontology is chosen given that it is able to describe the hierarchy and topological aspects of OSM data:

```text
osm:Relation → [
    osm:Way → [osm:Node, osm:Node, ...], 
    osm:Way → [...],
    ...
]
```

which are fundamental for route planning purposes, in contrast to existing alternatives such as [Sophox](https://github.com/Sophox/sophox/tree/main/osm2rdf) or [Qlever](https://osm2rdf.cs.uni-freiburg.de/) data models. Although the [LInkedGeoData](http://linkedgeodata.org/) model defines a [mapping strategy](https://github.com/GeoKnow/LinkedGeoData/blob/6cf408341bc71d9201f551b2811e7fe3b2070a25/linkedgeodata-core/src/main/resources/org/aksw/linkedgeodata/sml/LinkedGeoData-Triplify-IndividualViews.sml#L606) based on `rdf:Seq` and the `ldgo:hasNodes` predicate, their live SPARQL endpoint [does not contain any triples](http://linkedgeodata.org/sparql?default-graph-uri=&qtxt=PREFIX%20geom%3A%20%3Chttp%3A%2F%2Fgeovocab.org%2Fgeometry%23%3E%0APREFIX%20meta%3A%20%3Chttp%3A%2F%2Flinkedgeodata.org%2Fmeta%2F%3E%0APREFIX%20lgdo%3A%20%3Chttp%3A%2F%2Flinkedgeodata.org%2Fontology%2F%3E%0ASELECT%20*%20WHERE%20%7B%0A%20%20%20%3Fs%20lgdo%3AhasNodes%20%3Fo.%0A%7D%20LIMIT%20100&format=text%2Fhtml&timeout=0) that follow such strategy.

## Source data

OSM dumps can be downloaded from [Geofabrik](https://download.geofabrik.de/). The road network can be extracted using a tool like [`osmium`](https://osmcode.org/osmium-tool/) as follows:

```bash
osmium tags-filter source.osm.pbf w/highway w/public_transport=platform w/railway=platform w/park_ride=yes r/type=restriction r/type=route -o filtered.osm.pbf -f pbf,add_metadata=false
```
