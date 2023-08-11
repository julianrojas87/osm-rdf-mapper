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

which are fundamental for route planning purposes, in contrast to existing alternatives such as [Sophox](https://github.com/Sophox/sophox/tree/main/osm2rdf) or [Qlever](https://osm2rdf.cs.uni-freiburg.de/) data models.

## Source data

OSM dumps can be downloaded from [Geofabrik](https://download.geofabrik.de/). The road network can be extracted using a tool like [`osmium`](https://osmcode.org/osmium-tool/) as follows:

```bash
osmium tags-filter source.osm.pbf w/highway w/public_transport=platform w/railway=platform w/park_ride=yes r/type=restriction r/type=route -o filtered.osm.pbf -f pbf,add_metadata=false
```
