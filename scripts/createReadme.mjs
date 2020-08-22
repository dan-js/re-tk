import { readFileSync, writeFileSync, write } from "fs";
import { join } from "path";

import glob from "glob";

const execEach = (regexp, str, cb) => {
    let match;

    while ((match = regexp.exec(str)) !== null) {
        cb(match);
    }
};

const jsxCodeblock = (code) => "```jsx\n" + code + "\n```\n";

const generateModuleReadme = (readmePath) => {
    const readmeText = readFileSync(readmePath).toString();

    const readmeModuleDir = readmePath.replace(/\/README(\.tpl)?\.md/, "/");

    const EXAMPLE_REPLACE_REGEXP = /-example- (.+) -example-\n/gim;

    let finalReadmeText = readmeText;

    execEach(EXAMPLE_REPLACE_REGEXP, readmeText, ([fullMatch, innerMatch]) => {
        const exampleText = readFileSync(
            join(readmeModuleDir, "__examples__", `${innerMatch}.js`)
        ).toString();

        const cleanedExampleText = exampleText
            // Remove non relative imports and exports
            .replace(/(^|\n)(import React from|export).+\n/gm, "")
            // Replace relative imports with package imports
            .replace(
                /(^|\n)import (.+) from (('|")\..+)\n/gm,
                "$1import $2 from 're-tk'\n"
            );

        finalReadmeText = finalReadmeText.replace(
            fullMatch,
            `\n### ${innerMatch}\n\n${jsxCodeblock(cleanedExampleText)}\n`
        );
    });

    writeFileSync(join(readmeModuleDir, "README.md"), finalReadmeText);

    return {
        readmePath,
        finalReadmeText,
    };
};

const generateRootReadme = (moduleReadmes) => {
    const rootReadmeText = readFileSync("README.tpl.md").toString();

    const finalReadmeText = `${rootReadmeText}\n${moduleReadmes}`;

    writeFileSync("README.md", finalReadmeText);
};

glob("src/**/README.tpl.md", (err, readmePaths) => {
    if (err) {
        throw err;
    }

    const moduleReadmes = readmePaths
        .map((path) => generateModuleReadme(path).finalReadmeText)
        .join("\n");

    generateRootReadme(moduleReadmes);
});
