import path from "path";
import { access, constants } from "fs/promises";
import { Command } from "commander";
import { osm2rdf } from "../lib/index.js";

async function run() {
    const program = new Command()
        .requiredOption("-s, --source <source>", "Path to source OSM file in PBF format")
        .requiredOption("-o, --output <output>", "Path to output file containing the RDF triples")
        .option("-c, --compressed", "GZipped compressed output", false)
        .parse(process.argv);
    
    const source = path.resolve(program.opts().source);
    try {
        await access(source, constants.R_OK);
    } catch {
        throw new Error(`Source file ${program.opts().source} does not exist or is not accessible`);
    }

    await osm2rdf({ 
        source,
        output: program.opts().output,
        compressed: program.opts().compressed
    });
}

run();