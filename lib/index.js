import { pipeline } from "stream/promises";
import { createOSMStream } from "osm-pbf-parser-node";
import { RDFTransform } from "./RDFTransform.js";
import { StreamWriter } from "n3";
import { createGzip } from "zlib";
import { createWriteStream } from "fs";

export async function osm2rdf(opts) {
    const {
        source,
        output,
        compressed
    } = opts;

    const processors = [
        createOSMStream(source),
        new RDFTransform(),
        new StreamWriter({ format: "N-Triples" })
    ];

    if (compressed) processors.push(createGzip());

    await pipeline(
        ...processors,
        createWriteStream(output, "utf8")
    );

}