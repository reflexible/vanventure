import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { scryptSync, randomBytes, timingSafeEqual } from 'node:crypto';
export function passwordHash(password, salt = randomBytes(16).toString('hex')) {
  return `${salt}:${scryptSync(password, salt, 64).toString('hex')}`;
}
export function checkPassword(password, hash) {
  const [salt, expected] = hash.split(':');
  return timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(passwordHash(password, salt).split(':')[1], 'hex'));
}
export function openStore(dir) {
  mkdirSync(dir, { recursive: true });
  const db = new DatabaseSync(`${dir}/editor.sqlite`);
  db.exec(`PRAGMA journal_mode=WAL; CREATE TABLE IF NOT EXISTS users (name TEXT PRIMARY KEY, hash TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS drafts (slug TEXT PRIMARY KEY, data TEXT NOT NULL, revision INTEGER NOT NULL DEFAULT 0);
    CREATE TABLE IF NOT EXISTS history (id INTEGER PRIMARY KEY, slug TEXT, author TEXT, saved TEXT DEFAULT CURRENT_TIMESTAMP, data TEXT);`);
  return db;
}
export function saveDraft(db, slug, data, revision, author) {
  db.exec('BEGIN IMMEDIATE');
  try {
    const result = db.prepare('UPDATE drafts SET data=?,revision=revision+1 WHERE slug=? AND revision=?').run(JSON.stringify(data), slug, revision);
    if (!result.changes) throw new Error('CONFLICT');
    db.prepare('INSERT INTO history(slug,author,data) VALUES(?,?,?)').run(slug, author, JSON.stringify(data));
    db.exec('COMMIT');
    return revision + 1;
  } catch (e) { db.exec('ROLLBACK'); throw e; }
}
