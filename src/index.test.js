/* eslint-env node */
import { readdirSync } from "fs";

import * as root from ".";

const allModules = readdirSync(__dirname, {
    withFileTypes: true,
}).flatMap((ent) => {
    if (!ent.isDirectory()) {
        return [];
    }

    return ent.name;
});

describe("root index file", () => {
    it.each(allModules)("exports named module %s correctly", (module) => {
        expect(root[module]).toBeTruthy();
        expect(root[module]).toBeInstanceOf(Function);
    });
});
