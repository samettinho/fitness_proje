import mongoose, { mongo } from 'mongoose';

const { Schema } = mongoose;

const usersSchema = new Schema({
	name: { type: String, required: true },
	surname: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	gender: { type: Number, required: true },
	age: { type: Number, required: true },
	weight: { type: Number, required: true },
	height: { type: Number, required: true }
}, { timestamps: true }, { collection: 'users' });

module.exports = usersSchema;