const { react } = require("@nuuji/config");

const config = react.rollup({ name: "reactsan" });

config.preserveModules = true;

delete config.output[0].file;
delete config.output[1];
config.output[0].dir = "lib";
config.input = ["src/index.js", "src/combine/index.js"];

console.log(config);

// TODO: investigate this
// config.output[0].sourcemap = true;

module.exports = config;
