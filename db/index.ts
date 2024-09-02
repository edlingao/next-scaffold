import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

console.log("Creating database...");

const migrationURL = path.join(process.cwd(), "db/migrations.sql");
const migration = fs.readFileSync(migrationURL, "utf-8");

const db = new Database("./db/survey.sqlite", {
  verbose: console.log,
});

db.exec(migration);

export default db;
