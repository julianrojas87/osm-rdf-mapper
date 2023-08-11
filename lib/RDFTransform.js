import { Transform } from "stream";
import { DataFactory } from "n3";
import * as Vocs from "./NameSpaces.js";

const { quad, namedNode, blankNode, literal } = DataFactory;

const SPECIAL_TAGS = [
    "bollard", "bus_stop", "construction", "cycle_barrier", "cycleway", "delivery", "destination",
    "door", "entrance", "emergency", "fee", "foot", "gate", "kerb", "kissing_gate", "military",
    "motor_vehicle", "oneway", "passing_place", "relation", "service", "sidewalk", "stile", "stop",
    "traffic_signals", "turning_circle", "turnstile"
];

export class RDFTransform extends Transform {

    constructor() {
        super({ objectMode: true });
        this._osmKeys = new Map(Object.keys(Vocs.OSM).map(k => [k.replace(/_/g, "").replace(/-/g, "").toLowerCase(), k]));
    }

    _transform(item, encoding, done) {
        if (item.type === "node") {
            const node = namedNode(`https://www.openstreetmap.org/node/${item.id}`);
            this.push(quad(
                node,
                namedNode(Vocs.RDF.type),
                namedNode(Vocs.OSM.Node)
            ));
            this.push(quad(
                node,
                namedNode(Vocs.GSP.asWKT),
                literal(`POINT(${item.lon} ${item.lat})`)
            ));
            // Handle tags
            if (item.tags) {
                this.handleTags(node, item.tags);
            }
        } else if (item.type === "way") {
            const way = namedNode(`https://www.openstreetmap.org/way/${item.id}`);
            this.push(quad(
                way,
                namedNode(Vocs.RDF.type),
                namedNode(Vocs.OSM.Way)
            ));
            // Handle refs
            this.handleRefs(way, item.refs);
            // Handle tags
            if (item.tags) {
                this.handleTags(way, item.tags);
            }
        } else if (item.type === "relation") {
            const relation = namedNode(`https://www.openstreetmap.org/relation/${item.id}`);
            this.push(quad(
                relation,
                namedNode(Vocs.RDF.type),
                namedNode(Vocs.OSM.Relation)
            ));
            // Handle members
            this.handleMembers(relation, item.members)
            // Handle tags
            if (item.tags) {
                this.handleTags(relation, item.tags);
            }
        }
        done();
    }

    handleTags(subject, tags) {
        for (const tag of Object.keys(tags)) {
            // Normalize tag key
            const cleanTagKey = tag.replace(/_/g, "").replace(/-/g, "").toLowerCase();
            // Check if this is a known predicate
            if (this.osmKeys.has(cleanTagKey)) {
                // Handle multiple values in tag
                for (const val of tags[tag].split(";")) {
                    // Normalize tag value
                    const cleanTagValue = val.replace(/_/g, "").replace(/-/g, "").toLowerCase();
                    // Check if the value is a known named node
                    if (this.osmKeys.has(cleanTagValue)) {
                        // Make sure predicate starts with lowercase when name is also used as tag value 
                        const pred = /^\p{Lu}/u.test(this.osmKeys.get(cleanTagKey))
                            ? this.osmKeys.get(cleanTagKey).toLowerCase() : this.osmKeys.get(cleanTagKey);
                        this.push(quad(
                            subject,
                            namedNode(Vocs.OSM[pred]),
                            namedNode(Vocs.OSM[this.osmKeys.get(cleanTagValue)])
                        ));
                    } else if (["name", "maxspeed"].includes(tag)) {
                        // Known datatype predicates
                        this.push(quad(
                            subject,
                            namedNode(Vocs.OSM[this.osmKeys.get(cleanTagKey)]),
                            literal(tags[tag])
                        ));
                    } else if (SPECIAL_TAGS.includes(tag)) {
                        // These tag keys that are also used as values in other properties 
                        // -> handle them with osm:hasTag
                        this.push(quad(
                            subject,
                            namedNode(Vocs.OSM.hasTag),
                            literal(`${tag}=${tags[tag]}`)
                        ));
                    } else {
                        // These are most likely data pollution/errors -> skip
                    }
                }
            } else {
                // In all other cases add tag using osm:hasTag predicate
                this.push(quad(
                    subject,
                    namedNode(Vocs.OSM.hasTag),
                    literal(`${tag}=${tags[tag]}`)
                ));
            }
        }
    }

    handleRefs(subject, refs) {
        let currBn = blankNode();
        let nextBn = currBn;

        // Link osm:Way to rdf:List
        this.push(quad(
            subject,
            namedNode(Vocs.OSM.hasNodes),
            currBn
        ));

        // Rest of rdf:List
        for (let i = 0; i < refs.length; i++) {
            // Move onto the next node
            currBn = nextBn;
            // Ref osm:Node
            this.push(quad(
                currBn,
                namedNode(Vocs.RDF.first),
                namedNode(`https://www.openstreetmap.org/node/${refs[i]}`)
            ));
            // Define next part of the list
            if (i < refs.length - 1) {
                nextBn = blankNode();
                this.push(quad(
                    currBn,
                    namedNode(Vocs.RDF.rest),
                    nextBn
                ));
            }
        }
        // Close the rdf:List
        this.push(quad(
            currBn,
            namedNode(Vocs.RDF.rest),
            namedNode(Vocs.RDF.nil)
        ));
    }

    handleMembers(subject, members) {
        let currBn = blankNode();
        let nextBn = currBn;

        // Link osm:Relation to rdf:List
        this.push(quad(
            subject,
            namedNode(Vocs.OSM.hasMembers),
            currBn
        ));

        // Rest of rdf:List
        for (let i = 0; i < members.length; i++) {
            // Move onto the next node
            currBn = nextBn;
            // Member definition
            const member = blankNode();
            // Ref OSM element
            this.push(quad(
                currBn,
                namedNode(Vocs.RDF.first),
                member
            ));
            // Member properties
            this.push(quad(
                member,
                namedNode(Vocs.OSM.hasReference),
                namedNode(`https://www.openstreetmap.org/${members[i].type}/${members[i].ref}`)
            ));
            const cleanRole = members[i].role.replace(/_/g, "").replace(/-/g, "").toLowerCase();
            this.push(quad(
                member,
                namedNode(Vocs.OSM.hasRole),
                namedNode(Vocs.OSM[this.osmKeys.get(cleanRole)])
            ));
            // Define next part of the list
            if (i < members.length - 1) {
                nextBn = blankNode();
                this.push(quad(
                    currBn,
                    namedNode(Vocs.RDF.rest),
                    nextBn
                ));
            }
        }
        // Close the rdf:List
        this.push(quad(
            currBn,
            namedNode(Vocs.RDF.rest),
            namedNode(Vocs.RDF.nil)
        ));
    }

    get osmKeys() {
        return this._osmKeys;
    }
}