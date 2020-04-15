"use strict";

const fs = require("fs-extra");

class Database {

    static async get(name) {
        let db = {};
        try {
            db = await fs.readJson(`./databases/${name}.json`);
        } catch (error) {
            switch (error.errno) {
                case -4058: // File not found
                    await fs.writeJSON(`./databases/${name}.json`, {});
                    break;
                default:
                    break;
            }
        }
        return db;
    }

    static set(name, value) {
        return fs.writeJSON(`./databases/${name}.json`, value);
    }

    static async update(name, value) {
        let db = await this.get(name);
        await this.set(name, { ...db, ...value });
    }

}

module.exports = Database;
