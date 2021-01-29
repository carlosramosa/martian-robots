'use strict';

const redis = require('promise-redis')();

class Redis {
	constructor() {
		this.host = process.env.REDIS_URL || 'redis://localhost:6379';
		this.connected = false;
		this.client = null;
	}

	getConnection() {
		if(this.connected) return this.client;
		else {
			this.client =  redis.createClient(this.host);
			this.connected = true;
			console.log('--- REDIS connected ---');
			return this.client;
		}
	}
}

module.exports = new Redis();
