import { IDBPDatabase, openDB } from 'idb';

const DB_NAME = 'djk-yahtzee-svelte';
const DB_VERSION = 1;

const DB_STORE = 'Leaderboard';
const DB_LEADERBOARD_SCORE_IDX = 'Leaderboard-Score-Index';

class YahtzeeDB {
    db: IDBPDatabase;
    initialized: boolean;

    constructor() {
        this.initialized = false;
    }

    async init() {
        this.db = await openDB(DB_NAME, DB_VERSION, {
            upgrade(db, oldVer, newVer, transaction) {
                const store = db.createObjectStore(DB_STORE, { keyPath: 'date' });
                store.createIndex(DB_LEADERBOARD_SCORE_IDX, 'score');
            }
        });
        this.initialized = true;
    }

    async getLeaderboard() {
        if (this.initialized === false) {
            await this.init();
        }

        const tx = this.db.transaction(DB_STORE, 'readonly');
        const tstore = tx.objectStore(DB_STORE);
        const tsidx = tstore.index(DB_LEADERBOARD_SCORE_IDX);
        return await tsidx.getAll();
    }

    async addNewScore(name: string, score: number) {
        let newScore = {
            name: name,
            score: score,
            date: new Date()
        };

        if (this.initialized === false) {
            await this.init();
        }

        const tx = this.db.transaction(DB_STORE, 'readwrite');
        const tstore = tx.objectStore(DB_STORE);
        await tstore.add(newScore);
    }
}

export let yahtzeeDB = new YahtzeeDB();
