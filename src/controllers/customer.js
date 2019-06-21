'use strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.get = async (req, res, next) => {
	try {
		const data = await Customer.find({}, 'name user age')
		res.status(200).send(data)
	} catch (e) {
		res.status(500).send({
			message: 'Failed to process your request: ' + e
		})
	}
}

exports.save = async (req, res, next) => {
	try {
		if (!req.body.name || !req.body.user || !req.body.age)
			res.status(401).send({ message: 'Please, set all fields of Customer'})

		let customer = new Customer({
			name: req.body.name,
			user: req.body.user,
			age: req.body.age
		})
		await customer.save()
		res.status(201).send({
			message: 'Customer saved with success!'
		})
	} catch (e) {
		res.status(500).send({
			message: 'Failed to process your request: ' + e
		})
	}
}

exports.update = async (req, res, next) => {
	try {
		await Customer.findByIdAndUpdate(req.params.id, {
			$set: {
				name: req.body.name,
				user: req.body.user,
				age: req.body.age
			}
		})
		res.status(200).send({
			message: 'Customer updated with success!'
		})
	} catch (e) {
		res.status(500).send({
			message: 'Failed to process your request: ' + e
		})
	}
}

exports.delete = async (req, res, next) => {
	try {
		await Customer.findByIdAndDelete(req.body.id)
		res.status(200).send({
			message: 'Customer removed with success!'
		})
	} catch (e) {
		res.status(500).send({
			message: 'Failed to process your request: ' + e
		})
	}
}