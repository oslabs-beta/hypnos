import Dexie from 'dexie';

const db = new Dexie('historyDb');
db.version(1).stores({
  history: '++id, query',
});

export default db;
