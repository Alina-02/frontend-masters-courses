import fs from "node:fs/promises";
import path from "path";

const DB_PATH = path.resolve(process.cwd(), "db.json");

export const getDB = async () => {
  const db = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(db);
};

export const saveDB = async (db) => {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
  return db;
};

export const insertDB = async (data) => {
  const db = await getDB();
  db.notes.push(data);
  await saveDB(db);
  return db;
};
