import Dexie from 'dexie';

export const db = new Dexie('dataAPI');
db.version(1).stores({
    friends: '++id, name, age' // Primary key and indexed props
});
