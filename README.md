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

The tool will produce RDF triples in [`N-Triples`](https://www.w3.org/TR/n-triples/) format following this [OSM ontology](https://w3id.org/openstreetmap/terms#). This ontology is chosen given that it is able to describe the hierarchy and topological aspects of OSM data (i.e., `osm:Relation` → [`osm:Way` → [`osm:Node`, `osm:Node`, ...], `osm:Way`...]), in contrast to existing alternatives such as [Sophox](https://github.com/Sophox/sophox/tree/main/osm2rdf) or [Qlever](https://osm2rdf.cs.uni-freiburg.de/) data models.
