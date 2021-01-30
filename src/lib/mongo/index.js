'use strict';

const MongoClient = require('mongodb').MongoClient;
class Connection {
	static connectToMongo() {
		if ( this.db ) return Promise.resolve(this.db);
		return MongoClient.connect(this.url, this.options)
			.then(db => {
				console.log('--- MONGO connected ---');
				this.db = db;
			});
	}

	static async connectToMongo() {
		if (this.db) return this.db;
		this.db = await MongoClient.connect(this.url, this.options);
		console.log('--- MONGO connected ---');
		return this.db;
	}

	static close () {
		this.db.close();
	}
}

Connection.db = null;
Connection.url = process.env.MONGODB_ADDON_URI || process.env.MONGO_URL || 'mongodb://localhost:27017';
Connection.options = {
	bufferMaxEntries:   0,
	reconnectTries:     5000,
};

module.exports = { Connection };
