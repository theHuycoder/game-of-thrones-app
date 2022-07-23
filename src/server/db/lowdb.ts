/* eslint-disable no-underscore-dangle */
import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';
import { IUser } from '@/modals/auth.modals';

const __dirname = dirname(fileURLToPath(import.meta.url));

export interface IDbModal {
  users: IUser[];
}

// Use JSON file for storage
const file = join(__dirname, 'db.json');
const adapter = new JSONFile<IDbModal>(file);
const db = new Low<IDbModal>(adapter);

export default db;
