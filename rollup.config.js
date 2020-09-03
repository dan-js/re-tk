/* eslint-env node */
const { react } = require("@nuuji/config");
const { sync: globSync } = require("glob");

const config = react.rollup({ name: "reactsan" });

config.preserveModules = true;

console.log(globSync("src/*/index.js"));

delete config.output[0].file;
delete config.output[1];
config.output[0].dir = "lib";
config.input = ["src/index.js", ...globSync("src/*/index.js")];

// TODO: investigate this
// config.output[0].sourcemap = true;

module.exports = config;
