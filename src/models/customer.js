'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	name: {
		type: String,
		required: [true, 'name is required'],
		trim: true
	},
	user: { 
		type: String,
		required: [true, 'user is required'],
		unique: true
	},
	age: { 
		type: Number,
		required: [true, 'age is required']
	}
})

module.exports = mongoose.model('Customer', schema, 'customers')




